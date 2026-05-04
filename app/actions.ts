"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Profile, CVData } from "@/lib/types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
}

export async function signInWithGithub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      scopes: "read:user user:email public_repo",
    },
  });

  if (error) {
    console.error("Error de autenticación:", error.message);
    throw new Error("Fallo al iniciar el flujo de GitHub");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function getCurrentUserPortfolio() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error obteniendo portafolio:", error.message);
  }

  return data || null;
}

export async function updatePortfolioDetails(profileData: Profile) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const { error } = await supabase
    .from("portfolios")
    .update({
      display_name: profileData.name,
      headline: profileData.headline,
      bio: profileData.bio,
      email: profileData.email,
      link: profileData.link,
      location: profileData.location,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    throw new Error("No se pudo actualizar el perfil.");
  }

  return { success: true };
}

export async function updatePortfolioFromCV(cvData: CVData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { error } = await supabase
    .from("portfolios")
    .update({
      display_name: cvData.name,
      headline: cvData.headline,
      bio: cvData.summary,
      location: cvData.location,
      email: cvData.email,
      work_experience: cvData.work,
      education: cvData.education,
      skills: cvData.skills,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw error;
  return { success: true };
}

export async function extractCVDataWithGemini(
  base64Data: string,
  mimeType: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Falta GEMINI_API_KEY en variables de entorno");

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
    Eres un sistema automatizado de extracción de datos de currículums (ATS).
    Extrae la información del documento adjunto y devuelve un objeto JSON que cumpla EXACTAMENTE con esta estructura:
    {
      "name": "Nombre completo",
      "headline": "Título profesional actual",
      "summary": "Resumen profesional",
      "location": "Ciudad, País",
      "skills": ["React", "Python", "Docker"],
      "work": [
        { "company": "Nombre de la Empresa", "title": "Puesto", "start": "Año", "end": "Año", "description": "Logros" }
      ],
      "education": [
        { "school": "Institución", "degree": "Título", "start": "Año", "end": "Año" }
      ]
    }
    
    REGLA ESTRICTA PARA HABILIDADES (SKILLS): 
    Extrae ÚNICAMENTE "Hard Skills" (lenguajes de programación, frameworks, bases de datos, librerías, herramientas cloud y software). 
    TIENES ESTRICTAMENTE PROHIBIDO incluir "Soft Skills" (ej. proactividad, liderazgo, trabajo en equipo, comunicación, resolución de problemas, adaptabilidad). Si ves una habilidad blanda, ignórala por completo.

    Si alguna información no se encuentra en el documento, utiliza un string vacío "" o un arreglo vacío [].
  `;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);

    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);

    return parsedData;
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("DETALLE DEL ERROR GEMINI:", errorMessage);
    throw new Error(
      "La inteligencia artificial no pudo analizar el documento.",
    );
  }
}

export async function logOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
