import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Obtiene el usuario actual del servidor
 * Útil para Server Components y Route Handlers
 */
export async function getUser() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {}
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Verifica si el usuario está autenticado
 * Lanza error si no lo está
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Usuario no autenticado");
  }
  return user;
}
