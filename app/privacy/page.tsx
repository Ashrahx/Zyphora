"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 w-full h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary font-mono font-bold text-xl tracking-tighter hover:opacity-80"
          >
            Prism
          </Link>
          <div className="flex items-center gap-4">
            <AnimatedThemeToggler />
            <Button
              variant="outline"
              size="sm"
              className="font-mono uppercase tracking-widest text-[10px]"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 overflow-y-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground">
            Última actualización: 4 de mayo de 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introducción</h2>
            <p className="text-muted-foreground leading-relaxed">
              En Prism (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la
              Aplicación&quot;), nos comprometemos a proteger tu privacidad.
              Esta Política de Privacidad explica cómo recopilamos, usamos,
              divulgamos y protegemos tu información cuando utilizas nuestra
              aplicación web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Información que Recopilamos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.1 Información de GitHub OAuth
                </h3>
                <p className="text-muted-foreground">
                  Cuando te registras usando GitHub OAuth, recopilamos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>Nombre de usuario de GitHub</li>
                  <li>Correo electrónico público</li>
                  <li>Avatar/foto de perfil</li>
                  <li>Información básica del perfil</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.2 Información del Portafolio
                </h3>
                <p className="text-muted-foreground">
                  Almacenamos la información que proporcionas voluntariamente:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>Nombre y titular de tu CV</li>
                  <li>Experiencia laboral y educativa</li>
                  <li>Habilidades técnicas</li>
                  <li>Ubicación y datos de contacto</li>
                  <li>Enlaces personalizados y redes sociales</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.3 Datos de Repositorio de GitHub
                </h3>
                <p className="text-muted-foreground">
                  Accedemos a través de GitHub GraphQL API:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>Nombres y descripciones de repositorios públicos</li>
                  <li>Lenguajes de programación utilizados</li>
                  <li>Estrellas y información de visibilidad</li>
                  <li>URLs de repositorios</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2.4 Datos de CV</h3>
                <p className="text-muted-foreground">
                  Cuando subes un PDF de CV, lo procesamos con Google Generative
                  AI para extraer:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>Información de experiencia laboral</li>
                  <li>Información educativa</li>
                  <li>Habilidades técnicas</li>
                  <li>
                    El archivo PDF se procesa pero no se almacena
                    permanentemente
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2.5 Datos de Uso</h3>
                <p className="text-muted-foreground">
                  Podemos recopilar información sobre cómo usas la aplicación:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>Página visitadas</li>
                  <li>Tiempo de uso</li>
                  <li>Interacciones con características</li>
                  <li>Información del navegador y dispositivo</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Cómo Usamos tu Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Crear y mantener tu portafolio personalizado</li>
              <li>Autenticar tu acceso a la aplicación</li>
              <li>Generar y exportar tu portafolio en HTML</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Proporcionar soporte técnico</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Servicios Terceros</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Supabase (Base de Datos)
                </h3>
                <p className="text-muted-foreground">
                  Almacenamos tus datos en Supabase (PostgreSQL) con Row-Level
                  Security. Supabase es una plataforma confiable de código
                  abierto.{" "}
                  <a
                    href="https://supabase.com/privacy"
                    className="text-primary hover:underline"
                  >
                    Política de Privacidad de Supabase
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">GitHub API</h3>
                <p className="text-muted-foreground">
                  Usamos GitHub OAuth y GraphQL API. Tu token de acceso se
                  almacena de forma segura.{" "}
                  <a
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                    className="text-primary hover:underline"
                  >
                    Política de Privacidad de GitHub
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Google Generative AI
                </h3>
                <p className="text-muted-foreground">
                  Procesamos PDFs con Gemini para extraer datos. Tus CVs no se
                  almacenan en Google.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-primary hover:underline"
                  >
                    Política de Privacidad de Google
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Seguridad de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizacionales
              para proteger tu información:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4 ml-4">
              <li>HTTPS y encriptación en tránsito</li>
              <li>Row-Level Security en Supabase</li>
              <li>Autenticación segura con OAuth</li>
              <li>Control de acceso basado en roles</li>
              <li>No almacenamos contraseñas (OAuth)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Tus Derechos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Acceder a tus datos personales</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Transferir tus datos (portabilidad)</li>
              <li>Revocar el consentimiento en cualquier momento</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Para ejercer estos derechos, contáctanos a través de los datos de
              contacto al final de esta política.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Eliminación de Datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cuando eliminas tu cuenta, se borran todos tus datos (excepto
              cuando es requerido por ley). Los PDFs procesados no se almacenan
              permanentemente. Puedes solicitar la eliminación completa en
              cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              8. Cambios a Esta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te
              notificaremos sobre cambios significativos actualizando la fecha
              de &quot;Última actualización&quot; en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre esta Política de Privacidad o nuestras
              prácticas de privacidad, contáctanos:
            </p>
            <div className="mt-4 text-muted-foreground space-y-2">
              <p>
                <strong>Email:</strong> privacy@prism.dev
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/prism"
                  className="text-primary hover:underline"
                >
                  github.com/prism
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 w-full text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <p>© 2024 PRISM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
