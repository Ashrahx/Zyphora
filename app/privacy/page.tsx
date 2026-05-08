"use client";

import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";

export default function PrivacyPage() {
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
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
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
              {lang === "es" ? "1. Introducción" : "1. Introduction"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? `En Prism ("nosotros", "nuestro" o "la Aplicación"), nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando utilizas nuestra aplicación web.`
                : `At Prism ("we", "our" or "the Application"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our web application.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "2. Información que Recopilamos"
                : "2. Information We Collect"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.1 Información de GitHub OAuth"
                    : "2.1 GitHub OAuth Information"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Cuando te registras usando GitHub OAuth, recopilamos:"
                    : "When you register using GitHub OAuth, we collect:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>
                    {lang === "es" ? "Nombre de usuario de GitHub" : "GitHub username"}
                  </li>
                  <li>
                    {lang === "es" ? "Correo electrónico público" : "Public email address"}
                  </li>
                  <li>
                    {lang === "es" ? "Avatar/foto de perfil" : "Avatar/profile picture"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Información básica del perfil"
                      : "Basic profile information"}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.2 Información del Portafolio"
                    : "2.2 Portfolio Information"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Almacenamos la información que proporcionas voluntariamente:"
                    : "We store the information you voluntarily provide:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>
                    {lang === "es"
                      ? "Nombre y titular de tu CV"
                      : "Name and headline from your CV"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Experiencia laboral y educativa"
                      : "Work and educational experience"}
                  </li>
                  <li>
                    {lang === "es" ? "Habilidades técnicas" : "Technical skills"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Ubicación y datos de contacto"
                      : "Location and contact data"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Enlaces personalizados y redes sociales"
                      : "Custom links and social networks"}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es"
                    ? "2.3 Datos de Repositorio de GitHub"
                    : "2.3 GitHub Repository Data"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Accedemos a través de GitHub GraphQL API:"
                    : "We access through the GitHub GraphQL API:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>
                    {lang === "es"
                      ? "Nombres y descripciones de repositorios públicos"
                      : "Names and descriptions of public repositories"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Lenguajes de programación utilizados"
                      : "Programming languages used"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Estrellas y información de visibilidad"
                      : "Stars and visibility information"}
                  </li>
                  <li>
                    {lang === "es" ? "URLs de repositorios" : "Repository URLs"}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es" ? "2.4 Datos de CV" : "2.4 CV Data"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Cuando subes un PDF de CV, lo procesamos con Google Generative AI para extraer:"
                    : "When you upload a CV PDF, we process it with Google Generative AI to extract:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>
                    {lang === "es"
                      ? "Información de experiencia laboral"
                      : "Work experience information"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Información educativa"
                      : "Educational information"}
                  </li>
                  <li>
                    {lang === "es" ? "Habilidades técnicas" : "Technical skills"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "El archivo PDF se procesa pero no se almacena permanentemente"
                      : "The PDF file is processed but not stored permanently"}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es" ? "2.5 Datos de Uso" : "2.5 Usage Data"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es"
                    ? "Podemos recopilar información sobre cómo usas la aplicación:"
                    : "We may collect information about how you use the application:"}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 ml-4">
                  <li>
                    {lang === "es" ? "Páginas visitadas" : "Pages visited"}
                  </li>
                  <li>{lang === "es" ? "Tiempo de uso" : "Usage time"}</li>
                  <li>
                    {lang === "es"
                      ? "Interacciones con características"
                      : "Feature interactions"}
                  </li>
                  <li>
                    {lang === "es"
                      ? "Información del navegador y dispositivo"
                      : "Browser and device information"}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "3. Cómo Usamos tu Información"
                : "3. How We Use Your Information"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es"
                ? "Utilizamos la información recopilada para:"
                : "We use the collected information to:"}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                {lang === "es"
                  ? "Crear y mantener tu portafolio personalizado"
                  : "Create and maintain your personalized portfolio"}
              </li>
              <li>
                {lang === "es"
                  ? "Autenticar tu acceso a la aplicación"
                  : "Authenticate your access to the application"}
              </li>
              <li>
                {lang === "es"
                  ? "Generar y exportar tu portafolio en HTML"
                  : "Generate and export your portfolio in HTML"}
              </li>
              <li>
                {lang === "es"
                  ? "Mejorar la experiencia del usuario"
                  : "Improve user experience"}
              </li>
              <li>
                {lang === "es"
                  ? "Proporcionar soporte técnico"
                  : "Provide technical support"}
              </li>
              <li>
                {lang === "es"
                  ? "Cumplir con obligaciones legales"
                  : "Comply with legal obligations"}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "4. Servicios Terceros" : "4. Third-Party Services"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {lang === "es" ? "Supabase (Base de Datos)" : "Supabase (Database)"}
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es" ? (
                    <>
                      Almacenamos tus datos en Supabase (PostgreSQL) con
                      Row-Level Security. Supabase es una plataforma confiable
                      de código abierto.{" "}
                      <a
                        href="https://supabase.com/privacy"
                        className="text-primary hover:underline"
                      >
                        Política de Privacidad de Supabase
                      </a>
                    </>
                  ) : (
                    <>
                      We store your data in Supabase (PostgreSQL) with
                      Row-Level Security. Supabase is a reliable open-source
                      platform.{" "}
                      <a
                        href="https://supabase.com/privacy"
                        className="text-primary hover:underline"
                      >
                        Supabase Privacy Policy
                      </a>
                    </>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">GitHub API</h3>
                <p className="text-muted-foreground">
                  {lang === "es" ? (
                    <>
                      Usamos GitHub OAuth y GraphQL API. Tu token de acceso se
                      almacena de forma segura.{" "}
                      <a
                        href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                        className="text-primary hover:underline"
                      >
                        Política de Privacidad de GitHub
                      </a>
                    </>
                  ) : (
                    <>
                      We use GitHub OAuth and GraphQL API. Your access token is
                      stored securely.{" "}
                      <a
                        href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                        className="text-primary hover:underline"
                      >
                        GitHub Privacy Policy
                      </a>
                    </>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Google Generative AI
                </h3>
                <p className="text-muted-foreground">
                  {lang === "es" ? (
                    <>
                      Procesamos PDFs con Gemini para extraer datos. Tus CVs no
                      se almacenan en Google.{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-primary hover:underline"
                      >
                        Política de Privacidad de Google
                      </a>
                    </>
                  ) : (
                    <>
                      We process PDFs with Gemini to extract data. Your CVs are
                      not stored in Google.{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-primary hover:underline"
                      >
                        Google Privacy Policy
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "5. Seguridad de Datos" : "5. Data Security"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información:"
                : "We implement technical and organizational security measures to protect your information:"}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4 ml-4">
              <li>
                {lang === "es"
                  ? "HTTPS y encriptación en tránsito"
                  : "HTTPS and encryption in transit"}
              </li>
              <li>
                {lang === "es"
                  ? "Row-Level Security en Supabase"
                  : "Row-Level Security in Supabase"}
              </li>
              <li>
                {lang === "es"
                  ? "Autenticación segura con OAuth"
                  : "Secure authentication with OAuth"}
              </li>
              <li>
                {lang === "es"
                  ? "Control de acceso basado en roles"
                  : "Role-based access control"}
              </li>
              <li>
                {lang === "es"
                  ? "No almacenamos contraseñas (OAuth)"
                  : "We do not store passwords (OAuth)"}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "6. Tus Derechos" : "6. Your Rights"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {lang === "es" ? "Tienes derecho a:" : "You have the right to:"}
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                {lang === "es"
                  ? "Acceder a tus datos personales"
                  : "Access your personal data"}
              </li>
              <li>
                {lang === "es"
                  ? "Corregir información inexacta"
                  : "Correct inaccurate information"}
              </li>
              <li>
                {lang === "es"
                  ? "Solicitar la eliminación de tus datos"
                  : "Request deletion of your data"}
              </li>
              <li>
                {lang === "es"
                  ? "Transferir tus datos (portabilidad)"
                  : "Transfer your data (portability)"}
              </li>
              <li>
                {lang === "es"
                  ? "Revocar el consentimiento en cualquier momento"
                  : "Revoke consent at any time"}
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {lang === "es"
                ? "Para ejercer estos derechos, contáctanos a través de los datos de contacto al final de esta política."
                : "To exercise these rights, contact us through the contact information at the end of this policy."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "7. Eliminación de Datos" : "7. Data Deletion"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Cuando eliminas tu cuenta, se borran todos tus datos (excepto cuando es requerido por ley). Los PDFs procesados no se almacenan permanentemente. Puedes solicitar la eliminación completa en cualquier momento."
                : "When you delete your account, all your data is deleted (except when required by law). Processed PDFs are not stored permanently. You may request complete deletion at any time."}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es"
                ? "8. Cambios a Esta Política"
                : "8. Changes to This Policy"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? `Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos actualizando la fecha de "Última actualización" en esta página.`
                : `We may update this Privacy Policy occasionally. We will notify you of significant changes by updating the "Last updated" date on this page.`}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "es" ? "9. Contacto" : "9. Contact"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "es"
                ? "Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctanos:"
                : "If you have questions about this Privacy Policy or our privacy practices, contact us:"}
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
