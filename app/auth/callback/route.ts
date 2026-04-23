import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // 1. Si GitHub o Supabase devuelven un error (como el de los permisos), lo capturamos aquí
  if (error) {
    console.error("Error en el callback de autenticación:", error, error_description);
    // Redirigimos a la página principal con el mensaje de error en la URL
    return NextResponse.redirect(`${requestUrl.origin}/?error=${encodeURIComponent(error_description || 'Error de autenticación')}`);
  }

  // 2. Si todo salió bien, GitHub nos envía un "code"
  if (code) {
    const cookieStore = await cookies();
    
    // Inicializamos el cliente de Supabase para el servidor
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
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // El catch vacío es normal aquí en Next.js App Router
            }
          },
        },
      }
    );

    // Intercambiamos el código de GitHub por una sesión válida en Supabase
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError) {
      // 3. ¡Éxito! Redirigimos al usuario a la página de repositorios
      return NextResponse.redirect(`${requestUrl.origin}/dashboard/repos`);
    } else {
      console.error("Error intercambiando el código:", exchangeError.message);
    }
  }

  // Fallback de seguridad si algo sale mal
  return NextResponse.redirect(`${requestUrl.origin}/?error=Auth_Failed`);
}