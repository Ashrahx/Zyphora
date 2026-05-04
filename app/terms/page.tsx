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
            Aviso de Privacidad
          </h1>
          <p className="text-muted-foreground">
            Última actualización: 4 de mayo de 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Identidad y Domicilio del Responsable
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En cumplimiento con la Ley Federal de Protección de Datos
              Personales en Posesión de los Particulares (LFPDPPP), Prism
              (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la
              Aplicación&quot;) funge como el Responsable del tratamiento de los
              datos personales que se recaban a través de este sitio web. Nos
              comprometemos a proteger tu privacidad y garantizar el manejo
              seguro, legítimo e informado de tu información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Datos Personales que Recabamos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para las finalidades señaladas en este aviso, podemos recabar las
              siguientes categorías de datos personales (en ningún caso
              recabamos datos patrimoniales o sensibles, como origen étnico,
              estado de salud o creencias religiosas):
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.1 Datos de Autenticación (GitHub OAuth)
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Nombre de usuario de GitHub e identificador único</li>
                  <li>Correo electrónico público asociado a la cuenta</li>
                  <li>URL de tu avatar o foto de perfil</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.2 Datos Profesionales y de Portafolio
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>
                    Información extraída de tu Curriculum Vitae (CV) subido
                    voluntariamente (experiencia laboral, educación, habilidades
                    técnicas).
                  </li>
                  <li>Ubicación geográfica general (ciudad/país).</li>
                  <li>
                    Enlaces a otras redes sociales o sitios web de contacto.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  2.3 Datos de Repositorios (API de GitHub)
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>
                    Nombres, descripciones y URLs de repositorios públicos
                  </li>
                  <li>
                    Lenguajes de programación predominantes y métricas
                    (estrellas)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Finalidades del Tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los datos personales que recabamos serán utilizados exclusivamente
              para las siguientes finalidades primarias, que son necesarias para
              el servicio que solicitas:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Verificar tu identidad y crear tu cuenta de usuario.</li>
              <li>
                Generar, estructurar y alojar tu portafolio web personalizado.
              </li>
              <li>
                Procesar y extraer mediante Inteligencia Artificial los datos
                estructurados de los documentos (CVs) que decidas subir.
              </li>
              <li>
                Mantener tu portafolio sincronizado con tu actividad pública en
                GitHub.
              </li>
              <li>Garantizar la seguridad de tu acceso y prevenir fraudes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Transferencia de Datos y Servicios de Terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No vendemos ni comercializamos tus datos personales. Sin embargo,
              para poder operar la Aplicación, compartimos estrictamente la
              información necesaria con los siguientes proveedores de servicios
              (Encargados), los cuales operan bajo sus propias normativas de
              privacidad:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Supabase (Infraestructura y Base de Datos)
                </h3>
                <p className="text-muted-foreground">
                  Tus datos se almacenan de forma cifrada en servidores
                  proporcionados por Supabase. Utilizamos políticas de seguridad
                  a nivel de fila (RLS) para asegurar que solo tú puedas editar
                  tu información.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Google Generative AI (Procesamiento de Texto)
                </h3>
                <p className="text-muted-foreground">
                  Los archivos PDF de tu CV se envían temporalmente a las APIs
                  de Google para la extracción de texto estructurado.{" "}
                  <strong>
                    Prism configura estas peticiones para que tus datos no sean
                    utilizados por Google para entrenar sus modelos de lenguaje
                    públicos.
                  </strong>{" "}
                  El PDF se descarta tras procesar la extracción y no se
                  almacena de forma permanente.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Medidas de Seguridad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hemos implementado medidas de seguridad administrativas, técnicas
              y físicas para proteger tus datos personales contra daño, pérdida,
              alteración, destrucción o el uso, acceso o tratamiento no
              autorizado. Esto incluye encriptación en tránsito (HTTPS),
              autenticación basada en tokens OAuth (no almacenamos contraseñas)
              y controles de acceso estrictos en bases de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              6. Ejercicio de Derechos ARCO y Revocación del Consentimiento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Como titular de tus datos personales, tienes derecho a conocer qué
              datos tenemos de ti (<strong>Acceso</strong>); solicitar la
              corrección de tu información si está desactualizada o incorrecta (
              <strong>Rectificación</strong>); que la eliminemos de nuestros
              registros (<strong>Cancelación</strong>); así como oponerte al uso
              de tus datos para fines específicos (<strong>Oposición</strong>).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Puedes ejercer la mayoría de estos derechos directamente desde el
              panel de configuración de la Aplicación, donde puedes editar tu
              información, desvincular tu cuenta de GitHub o eliminar tu cuenta
              por completo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Para solicitudes formales de Derechos ARCO o para revocar tu
              consentimiento, puedes enviar un correo electrónico a nuestro
              departamento de privacidad. Daremos respuesta a tu solicitud en un
              plazo máximo de 20 días hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              7. Cambios al Aviso de Privacidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de efectuar en cualquier momento
              modificaciones o actualizaciones al presente aviso de privacidad,
              para la atención de novedades legislativas o políticas internas.
              Estas modificaciones estarán disponibles al público a través de
              esta misma página web, indicando la fecha de la &quot;Última
              actualización&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para cualquier duda relacionada con la protección de tus datos
              personales, puedes contactarnos en:
            </p>
            <div className="mt-4 text-muted-foreground space-y-2">
              <p>
                <strong>Email:</strong> ashraahx@gmail.com
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
          <p>© 2026 PRISM. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
}
