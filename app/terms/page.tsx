"use client";

import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";

export default function TermsPage() {
  const [lang, setLang] = useState<"en" | "es">("es");

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
            <button
              onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
              className="px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md cursor-pointer"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Link
              href="/"
              className="px-3 py-1.5 border border-border bg-background hover:bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground rounded-md font-mono"
            >
              {lang === "es" ? "Inicio" : "Home"}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 overflow-y-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            {lang === "es" ? "Aviso de Privacidad" : "Privacy Notice"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "es"
              ? "Última actualización: 4 de mayo de 2026"
              : "Last updated: May 4, 2026"}
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "1. Identidad y Domicilio del Responsable"
                : "1. Identity of the Data Controller"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? `En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), Prism ("nosotros", "nuestro" o "la Aplicación") funge como el Responsable del tratamiento de los datos personales que se recaban a través de este sitio web. Nos comprometemos a proteger tu privacidad y garantizar el manejo seguro, legítimo e informado de tu información.`
                : `In compliance with the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP), Prism ("we", "our" or "the Application") acts as the Data Controller for personal data collected through this website. We are committed to protecting your privacy and ensuring the secure, lawful, and informed handling of your information.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "2. Datos Personales que Recabamos"
                : "2. Personal Data We Collect"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es"
                ? "Para las finalidades señaladas en este aviso, podemos recabar las siguientes categorías de datos personales (en ningún caso recabamos datos patrimoniales o sensibles, como origen étnico, estado de salud o creencias religiosas):"
                : "For the purposes stated in this notice, we may collect the following categories of personal data (we do not collect financial or sensitive data such as ethnic origin, health status, or religious beliefs):"}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.1 Datos de Autenticación (GitHub OAuth)"
                    : "2.1 Authentication Data (GitHub OAuth)"}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>
                    {lang === "es"
                      ? "Nombre de usuario de GitHub e identificador único"
                      : "GitHub username and unique identifier"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Correo electrónico público asociado a la cuenta"
                      : "Public email address associated with the account"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "URL de tu avatar o foto de perfil"
                      : "Avatar or profile picture URL"}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.2 Datos Profesionales y de Portafolio"
                    : "2.2 Professional and Portfolio Data"}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>
                    {lang === "es"
                      ? "Información extraída de tu Curriculum Vitae (CV) subido voluntariamente (experiencia laboral, educación, habilidades técnicas)."
                      : "Information extracted from your voluntarily uploaded CV (work experience, education, technical skills)."}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Ubicación geográfica general (ciudad/país)."
                      : "General geographic location (city/country)."}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Enlaces a otras redes sociales o sitios web de contacto."
                      : "Links to other social networks or contact websites."}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.3 Datos de Repositorios (API de GitHub)"
                    : "2.3 Repository Data (GitHub API)"}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>
                    {lang === "es"
                      ? "Nombres, descripciones y URLs de repositorios públicos"
                      : "Names, descriptions, and URLs of public repositories"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Lenguajes de programación predominantes y métricas (estrellas)"
                      : "Predominant programming languages and metrics (stars)"}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "3. Finalidades del Tratamiento"
                : "3. Purposes of Processing"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es"
                ? "Los datos personales que recabamos serán utilizados exclusivamente para las siguientes finalidades primarias, que son necesarias para el servicio que solicitas:"
                : "The personal data we collect will be used exclusively for the following primary purposes, which are necessary for the service you request:"}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                {lang === "es"
                  ? "Verificar tu identidad y crear tu cuenta de usuario."
                  : "Verify your identity and create your user account."}
              </li>
              <li>
                {lang === "es"
                  ? "Generar, estructurar y alojar tu portafolio web personalizado."
                  : "Generate, structure, and host your personalized web portfolio."}
              </li>
              <li>
                {lang === "es"
                  ? "Procesar y extraer mediante Inteligencia Artificial los datos estructurados de los documentos (CVs) que decidas subir."
                  : "Process and extract, using Artificial Intelligence, structured data from the documents (CVs) you choose to upload."}
              </li>
              <li>
                {lang === "es"
                  ? "Mantener tu portafolio sincronizado con tu actividad pública en GitHub."
                  : "Keep your portfolio synchronized with your public GitHub activity."}
              </li>
              <li>
                {lang === "es"
                  ? "Garantizar la seguridad de tu acceso y prevenir fraudes."
                  : "Ensure the security of your access and prevent fraud."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "4. Transferencia de Datos y Servicios de Terceros"
                : "4. Data Transfer and Third-Party Services"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es"
                ? "No vendemos ni comercializamos tus datos personales. Sin embargo, para poder operar la Aplicación, compartimos estrictamente la información necesaria con los siguientes proveedores de servicios (Encargados), los cuales operan bajo sus propias normativas de privacidad:"
                : "We do not sell or commercialize your personal data. However, to operate the Application, we strictly share necessary information with the following service providers (Processors), who operate under their own privacy regulations:"}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "Supabase (Infraestructura y Base de Datos)"
                    : "Supabase (Infrastructure and Database)"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Tus datos se almacenan de forma cifrada en servidores proporcionados por Supabase. Utilizamos políticas de seguridad a nivel de fila (RLS) para asegurar que solo tú puedas editar tu información."
                    : "Your data is stored in encrypted form on servers provided by Supabase. We use Row-Level Security (RLS) policies to ensure only you can edit your information."}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "Google Generative AI (Procesamiento de Texto)"
                    : "Google Generative AI (Text Processing)"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es" ? (
                    <>
                      Los archivos PDF de tu CV se envían temporalmente a las
                      APIs de Google para la extracción de texto estructurado.{" "}
                      <strong>
                        Prism configura estas peticiones para que tus datos no
                        sean utilizados por Google para entrenar sus modelos de
                        lenguaje públicos.
                      </strong>{" "}
                      El PDF se descarta tras procesar la extracción y no se
                      almacena de forma permanente.
                    </>
                  ) : (
                    <>
                      Your CV PDF files are temporarily sent to Google APIs for
                      structured text extraction.{" "}
                      <strong>
                        Prism configures these requests so that your data is not
                        used by Google to train its public language models.
                      </strong>{" "}
                      The PDF is discarded after extraction and is not stored
                      permanently.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "5. Medidas de Seguridad" : "5. Security Measures"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Hemos implementado medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado. Esto incluye encriptación en tránsito (HTTPS), autenticación basada en tokens OAuth (no almacenamos contraseñas) y controles de acceso estrictos en bases de datos."
                : "We have implemented administrative, technical, and physical security measures to protect your personal data against damage, loss, alteration, destruction, or unauthorized use, access, or processing. This includes encryption in transit (HTTPS), OAuth token-based authentication (we do not store passwords), and strict database access controls."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "6. Ejercicio de Derechos ARCO y Revocación del Consentimiento"
                : "6. ARCO Rights and Consent Revocation"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es" ? (
                <>
                  Como titular de tus datos personales, tienes derecho a conocer
                  qué datos tenemos de ti (<strong>Acceso</strong>); solicitar la
                  corrección de tu información si está desactualizada o incorrecta
                  (<strong>Rectificación</strong>); que la eliminemos de nuestros
                  registros (<strong>Cancelación</strong>); así como oponerte al
                  uso de tus datos para fines específicos (
                  <strong>Oposición</strong>).
                </>
              ) : (
                <>
                  As the data subject, you have the right to know what data we
                  hold about you (<strong>Access</strong>); request correction of
                  your information if it is outdated or incorrect (
                  <strong>Rectification</strong>); have it deleted from our
                  records (<strong>Cancellation</strong>); and object to the use
                  of your data for specific purposes (<strong>Opposition</strong>
                  ).
                </>
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es"
                ? "Puedes ejercer la mayoría de estos derechos directamente desde el panel de configuración de la Aplicación, donde puedes editar tu información, desvincular tu cuenta de GitHub o eliminar tu cuenta por completo."
                : "You may exercise most of these rights directly from the Application's settings panel, where you can edit your information, unlink your GitHub account, or delete your account entirely."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Para solicitudes formales de Derechos ARCO o para revocar tu consentimiento, puedes enviar un correo electrónico a nuestro departamento de privacidad. Daremos respuesta a tu solicitud en un plazo máximo de 20 días hábiles."
                : "For formal ARCO rights requests or to revoke your consent, you may send an email to our privacy department. We will respond to your request within a maximum of 20 business days."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "7. Cambios al Aviso de Privacidad"
                : "7. Changes to This Privacy Notice"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? `Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la atención de novedades legislativas o políticas internas. Estas modificaciones estarán disponibles al público a través de esta misma página web, indicando la fecha de la "Última actualización".`
                : `We reserve the right to make modifications or updates to this privacy notice at any time to address legislative developments or internal policies. These modifications will be available to the public through this same web page, indicating the "Last updated" date.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "8. Contacto" : "8. Contact"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Para cualquier duda relacionada con la protección de tus datos personales, puedes contactarnos en:"
                : "For any questions related to the protection of your personal data, you may contact us at:"}
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
          <p>
            {lang === "es"
              ? "© 2026 PRISM. TODOS LOS DERECHOS RESERVADOS."
              : "© 2026 PRISM. ALL RIGHTS RESERVED."}
          </p>
        </div>
      </footer>
    </div>
  );
}
