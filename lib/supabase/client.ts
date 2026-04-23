import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Usamos las variables de entorno que configuramos al principio en el .env.local
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
