"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { GET_USER_PROFILE_QUERY } from "@/lib/github";

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
