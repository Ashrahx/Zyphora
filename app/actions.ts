"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { GET_USER_PROFILE_QUERY } from "@/lib/github";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
          } catch {
            // El catch se mantiene vacío ya que es un manejo de error controlado de Next.js
          }
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
      // ESTA ES LA LÍNEA QUE FALTA: Pedimos acceso al perfil, email y repos públicos
      scopes: 'read:user user:email public_repo' 
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

export async function fetchUserRepositories() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    throw new Error("No estás autenticado. La sesión expiró o no existe.");

  const githubToken = session.provider_token;
  const username = session.user.user_metadata.preferred_username;

  if (!githubToken) {
    throw new Error(
      "No se encontró el token de GitHub. Asegúrate de configurar los scopes en Supabase.",
    );
  }

  const { GraphQLClient } = await import("graphql-request");
  const githubClientDynamic = new GraphQLClient(
    "https://api.github.com/graphql",
    { headers: { authorization: `Bearer ${githubToken}` } },
  );

  try {
    const data: any = await githubClientDynamic.request(
      GET_USER_PROFILE_QUERY,
      {
        username: username,
      },
    );
    return data.user.repositories.nodes;
  } catch (error) {
    console.error("Error extrayendo datos de GitHub API:", error);
    throw new Error("No se pudo contactar con GitHub.");
  }
}

export async function saveProfileConfig(profileData: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Acceso denegado.");

  const { error } = await supabase.from("portfolios").upsert({
    user_id: user.id,
    display_name: profileData.name,
    bio: profileData.bio,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error guardando en BD:", error.message);
    throw error;
  }

  return { success: true };
}

// NUEVA FUNCIÓN AÑADIDA: Guarda la selección de repositorios
export async function saveSelectedRepos(selectedRepos: any[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Acceso denegado.");

  // Obtenemos el username de GitHub para usarlo en la URL pública
  const username = user.user_metadata.preferred_username;

  const { error } = await supabase.from("portfolios").upsert({
    user_id: user.id,
    github_username: username, // Usaremos esto para la ruta pública
    display_name: user.user_metadata.full_name || username,
    selected_repos: selectedRepos,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' }); // onConflict asegura que si el usuario ya tiene un registro, se actualice en lugar de crear uno nuevo

  if (error) {
    console.error("Error guardando repositorios:", error.message);
    throw new Error("No se pudo guardar la selección.");
  }

  return { success: true, username };
}

export async function saveTemplateSelection(templateId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Acceso denegado.");

  const { error } = await supabase
    .from("portfolios")
    .update({ 
      template_id: templateId,
      updated_at: new Date().toISOString() 
    })
    .eq('user_id', user.id);

  if (error) {
    console.error("Error guardando el template:", error.message);
    throw new Error("No se pudo guardar la plantilla.");
  }

  return { success: true };
}

export async function getCurrentUserPortfolio() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("No autenticado");

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error obteniendo portafolio:", error.message);
  }

  return data || null;
}

export async function updatePortfolioDetails(profileData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
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

export async function updatePortfolioFromCV(cvData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
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

export async function extractCVDataWithGemini(base64Data: string, mimeType: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Falta GEMINI_API_KEY en variables de entorno");

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // MEJORA: Forzamos a Gemini a responder en formato JSON estricto
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
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
          mimeType: mimeType
        }
      }
    ]);

    const responseText = result.response.text();
    // Como forzamos el mimeType a JSON, podemos parsearlo directamente
    const parsedData = JSON.parse(responseText);
    
    return parsedData;
    
  } catch (error: any) {
    // Imprimimos el error real en la consola de tu servidor para saber exactamente qué falló
    console.error("DETALLE DEL ERROR GEMINI:", error.message || error);
    throw new Error("La inteligencia artificial no pudo analizar el documento.");
  }
}