export type Lang = "en" | "es";

const translations = {
  en: {
    // Portfolio section titles
    workExperience: "Work Experience",
    education: "Education",
    featuredWork: "Featured Work",
    featuredProjects: "Featured Projects",
    skills: "Skills",
    professionalSummary: "Professional Summary",
    coreCompetencies: "Core Competencies",
    experience: "Experience",
    expertise: "Expertise",
    projects: "Projects",
    passion: "Passion",
    noRepos: "No repositories available yet.",
    // Editor tabs
    profile: "Profile",
    repos: "Repos",
    import: "Import",
    deploys: "Deploys",
    // Editor labels
    editor: "Editor",
    personalInfo: "Personal Information",
    displayName: "Display Name",
    headline: "Headline",
    bio: "Bio",
    email: "Email",
    link: "Website",
    location: "Location",
    importCV: "Upload your CV to extract your information automatically.",
    dragOrClick: "Drag or click to upload your CV",
    supportedFormats: "Supported: PDF",
    processing: "Extracting information...",
    selectedRepos: "Selected Repositories",
    // Deploys tab
    liveDeployments: "Live Deployments",
    viewLive: "View Live",
    active: "active",
    noDeployments: "No deployments yet",
    noDeploymentsHint: "Click Deploy to publish your portfolio",
    // Toolbar
    deploy: "Deploy",
    saving: "Saving...",
    exportHTML: "Export to HTML",
    signOut: "Sign Out",
    copyLink: "Copy link",
    linkCopied: "Link copied!",
    published: "Portfolio published!",
    publishError: "Error publishing changes.",
    // Theme toggle in HTML export
    toggleTheme: "Toggle Theme",
    toggleLang: "Idioma",
    // Template names
    tmplMinimal: "Minimal",
    tmplModern: "Modern",
    tmplProfessional: "Professional",
    tmplCreative: "Creative",
  },
  es: {
    // Portfolio section titles
    workExperience: "Experiencia Laboral",
    education: "Educación",
    featuredWork: "Proyectos Destacados",
    featuredProjects: "Proyectos Destacados",
    skills: "Habilidades",
    professionalSummary: "Resumen Profesional",
    coreCompetencies: "Competencias Clave",
    experience: "Experiencia",
    expertise: "Especialidades",
    projects: "Proyectos",
    passion: "Pasión",
    noRepos: "Sin repositorios disponibles aún.",
    // Editor tabs
    profile: "Perfil",
    repos: "Repos",
    import: "Importar",
    deploys: "Deploys",
    // Editor labels
    editor: "Editor",
    personalInfo: "Información Personal",
    displayName: "Nombre",
    headline: "Titular",
    bio: "Sobre mí",
    email: "Email",
    link: "Sitio web",
    location: "Ubicación",
    importCV: "Sube tu CV y tu información será extraída automáticamente.",
    dragOrClick: "Arrastra o haz click para subir tu CV",
    supportedFormats: "Compatible: PDF",
    processing: "Extrayendo información...",
    selectedRepos: "Repositorios Seleccionados",
    // Deploys tab
    liveDeployments: "Deployments en vivo",
    viewLive: "Ver en vivo",
    active: "activo",
    noDeployments: "Sin deployments aún",
    noDeploymentsHint: "Haz click en Deploy para publicar tu portafolio",
    // Toolbar
    deploy: "Deploy",
    saving: "Guardando...",
    exportHTML: "Exportar HTML",
    signOut: "Cerrar sesión",
    copyLink: "Copiar link",
    linkCopied: "¡Link copiado!",
    published: "¡Portafolio publicado con éxito!",
    publishError: "Error al publicar los cambios.",
    // Theme toggle in HTML export
    toggleTheme: "Cambiar tema",
    toggleLang: "Language",
    // Template names
    tmplMinimal: "Minimalista",
    tmplModern: "Moderno",
    tmplProfessional: "Profesional",
    tmplCreative: "Creativo",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(key: TranslationKey, lang: Lang = "es"): string {
  return (
    (translations[lang] as Record<string, string>)[key] ??
    (translations["en"] as Record<string, string>)[key] ??
    key
  );
}

export { translations };
