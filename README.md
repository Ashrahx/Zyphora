<div align="center">
  <br />
  <h1>🎨 PRISM</h1>
  <h3><em>Generador de Portfolios Inteligente</em></h3>

  <p>
    Crea un portfolio profesional en minutos usando IA. Conecta tu perfil de GitHub, sube tu CV, y deja que PRISM haga la magia.
  </p>

  <br />

  <div>
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Supabase_PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Google_Gemini-EA4335?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  </div>

  <br />

  <a href="#demo" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Ver_Demo-0055FF?style=for-the-badge&logoColor=white" alt="Ver Demo" height="40" />
  </a>
  &nbsp;
  <a href="#instalación" target="_blank">
    <img src="https://img.shields.io/badge/⬇️_Empezar-28A745?style=for-the-badge&logoColor=white" alt="Empezar" height="40" />
  </a>

<br /><br />

</div>

---

## 📋 Contenido

- [¿Qué es PRISM?](#qué-es-prism)
- [Características](#características)
- [Demo](#demo)
- [Tecnologías](#tecnologías)
- [Instalación Local](#instalación-local)
- [Uso](#uso)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [Despliegue](#despliegue)

---

## ¿Qué es PRISM?

PRISM es un generador de portfolios inteligente que utiliza **IA (Google Gemini)** para extraer información de tu CV en PDF y crear un portfolio profesional en minutos.

Con autenticación GitHub, Supabase como backend y 4 plantillas hermosas, PRISM hace que lucir profesional en línea sea fácil para todos.

**Sin código. Sin configuración compleja. Solo tu mejor versión en línea.**

---

## ✨ Características

- ✅ **Autenticación GitHub** — Conecta tu cuenta en un click
- ✅ **Extracción de CV con IA** — Sube un PDF y Gemini extrae tus datos automáticamente
- ✅ **4 Plantillas Profesionales** — Minimalista, Moderno, Profesional, Creativo
- ✅ **Editor en Vivo** — Vista previa instantánea de cambios
- ✅ **Integración GitHub** — Muestra tus 6 repos principales automáticamente
- ✅ **Modo Oscuro/Claro** — Tema adaptable a preferencias
- ✅ **Exportar HTML** — Descarga tu portfolio como HTML independiente
- ✅ **Publicar en Línea** — Comparte tu portfolio con un link único
- ✅ **Totalmente Responsivo** — Se ve perfecto en móvil, tablet y desktop

---

## Demo

**URL**: [https://prism.vercel.app](https://prism.vercel.app)

1. Haz click en "Conectar con GitHub"
2. Autoriza el acceso (GitHub OAuth)
3. Sube tu CV en PDF
4. Personaliza tu portfolio
5. ¡Publica y comparte!

---

## 🛠️ Tecnologías

| Capa         | Tecnología                       | Propósito                     |
| ------------ | -------------------------------- | ----------------------------- |
| **Frontend** | Next.js 16, React 19, TypeScript | UI interactiva y SSR          |
| **Estilos**  | Tailwind CSS 4                   | Diseño responsivo y modern    |
| **Backend**  | Supabase (PostgreSQL)            | Base de datos y autenticación |
| **IA**       | Google Gemini 2.5-flash          | Extracción inteligente de CV  |
| **APIs**     | GitHub GraphQL                   | Datos de repositorios         |
| **Hosting**  | Vercel                           | Deploy automático             |

---

## 📦 Instalación Local

### Prerequisitos

- Node.js 18+
- npm o yarn
- Git
- Cuenta en [Supabase](https://supabase.com) (gratuita)
- API key de [Google Generative AI](https://makersuite.google.com)

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/portfolio-generator.git
cd portfolio-generator
```

2. **Instala dependencias**

```bash
npm install
```

3. **Configura variables de entorno**

Crea un archivo `.env.local` en la raíz:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui

# Google Gemini AI
GEMINI_API_KEY=tu_api_key_aqui

# GitHub OAuth (Supabase)
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🚀 Uso

### En el Editor

1. **Conectar GitHub** — Se sincronizarán tus repos automáticamente
2. **Subir CV** — PRISM extraerá experiencia, educación y skills
3. **Personalizar** — Edita nombre, bio, links, y selecciona repos
4. **Elegir Plantilla** — Elige entre 4 diseños profesionales
5. **Publicar** — Comparte tu portfolio con un link público

### URLs Públicas

Tu portfolio estará disponible en:

```
https://prism.vercel.app/[tu-username-github]
```

---

## ⚙️ Configuración

### Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL          # URL de tu proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Clave anónima de Supabase
GEMINI_API_KEY                    # API key de Google Generative AI
```

### Base de Datos (Supabase)

La tabla `portfolios` almacena:

```typescript
{
  user_id: string              // UUID del usuario
  github_username: string      // Username de GitHub
  display_name: string         // Nombre visible
  bio: string                  // Biografía
  headline: string             // Titular profesional
  email: string                // Email
  link: string                 // Link personal
  location: string             // Ubicación
  work_experience: WorkExperience[]
  education: Education[]
  skills: string[]
  template_id: string          // ID de plantilla seleccionada
  updated_at: timestamp        // Última actualización
}
```

---

## 💻 Desarrollo

### Estructura del Proyecto

```
app/
├── page.tsx              # Landing page
├── editor/               # Editor principal
├── [username]/           # Portfolio público dinámico
├── auth/                 # OAuth callbacks
├── actions.ts            # Server actions (Backend)
└── layout.tsx            # Layout base

components/
├── ui/                   # Componentes reutilizables
└── theme-provider.tsx    # Proveedor de temas

lib/
├── auth.ts              # Lógica de autenticación
├── github.ts            # Cliente GraphQL de GitHub
├── types.ts             # Interfaces TypeScript
└── supabase/
    └── client.ts        # Cliente Supabase
```

### Scripts Disponibles

```bash
npm run dev       # Inicia dev server (Turbopack)
npm run build     # Build para producción
npm run start     # Inicia servidor de producción
npm run lint      # Ejecuta ESLint
```

### Build de Producción

```bash
npm run build
npm run start
```

---

## 🌐 Despliegue

### En Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta en [Vercel](https://vercel.com)
3. Configura variables de entorno
4. Deploy automático en cada push

```bash
# Si tienes Vercel CLI instalado:
vercel deploy
```

### En Otros Proveedores

PRISM es compatible con cualquier hosting que soporte Node.js 18+:

- **Netlify** — Conecta tu repo y listo
- **Railway** — Railway.app
- **Render** — render.com
- **Heroku** — heroku.com

Solo asegúrate de configurar las variables de entorno correspondientes.

---

## 📄 Licencia

MIT © 2026

---

## 🤝 Contribuir

Las contribuciones son bienvenidas!

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📞 Soporte

¿Preguntas o problemas? Abre un [issue en GitHub](https://github.com/tu-usuario/portfolio-generator/issues)

---

<div align="center">
  <p>Hecho con ❤️ usando Next.js, TypeScript y mucho café ☕</p>
  <p>© 2026 PRISM. Todos los derechos reservados.</p>
</div>
