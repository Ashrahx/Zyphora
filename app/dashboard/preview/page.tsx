"use client";

import { useState, useEffect, useTransition } from "react";
import { getCurrentUserPortfolio, updatePortfolioDetails, updatePortfolioFromCV, extractCVDataWithGemini } from "@/app/actions";
import { Iphone } from "@/components/ui/iphone";
import { Badge } from "@/components/ui/badge";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkIcon from "@mui/icons-material/Link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CircularProgress from '@mui/material/CircularProgress';

// --- IMPORTACIONES DE ICONOS SVGL (Solo los que SÍ tienes en tu carpeta) ---
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { Python } from "@/components/ui/svgs/python";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Typescript } from "@/components/ui/svgs/typescript";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { GithubDark } from "@/components/ui/svgs/githubDark";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Java } from "@/components/ui/svgs/java";
import { Nodejs } from "@/components/ui/svgs/nodejs";

  
  import { PhpDark   } from "@/components/ui/svgs/phpDark";
  import { Kotlin } from "@/components/ui/svgs/kotlin";
  import { AstroIconDark } from "@/components/ui/svgs/astroIconDark";
  import { Expressjs } from "@/components/ui/svgs/expressjs";
  import { MysqlIconDark } from "@/components/ui/svgs/mysqlIconDark";
  import { MongodbIconDark } from "@/components/ui/svgs/mongodbIconDark";
  import { Firebase } from "@/components/ui/svgs/firebase";
  import { Html5 } from "@/components/ui/svgs/html5";
  import { CssOld } from "@/components/ui/svgs/cssOld";
  import { Bootstrap } from "@/components/ui/svgs/bootstrap";
  import { Figma } from "@/components/ui/svgs/figma";
  import { Tailwind } from "@/components/ui/svgs/tailwindcss";

// Mapeo inteligente (Los que no están aquí usarán el fallback del puntito)
const IconMap: Record<string, any> = {
  react: ReactDark,
  "react.js": ReactDark,
  "reactjs": ReactDark,
  "react native": ReactDark,
  javascript: Javascript,
  js: Javascript,
  typescript: Typescript,
  ts: Typescript,
  python: Python,
  java: Java,
  node: Nodejs,
  "node.js": Nodejs,
  nodejs: Nodejs,
  laravel: Laravel,
  nextjs: NextjsIconDark,
  "next.js": NextjsIconDark,
  postgresql: Postgresql,
  postgres: Postgresql,
  sql: Postgresql,
  supabase: Supabase,
  docker: Docker,
  github: GithubDark,
  git: GithubDark,
  php: PhpDark,
  kotlin: Kotlin,
  astro: AstroIconDark,
  express: Expressjs,
  mysql: MysqlIconDark,
  mongodb: MongodbIconDark,
  firebase: Firebase,
  html5: Html5,
  css3: CssOld,
  bootstrap: Bootstrap,
  figma: Figma,
  tailwindcss: Tailwind,
};

export default function PreviewPage() {
  const [isPending, startTransition] = useTransition();
  const [isExtracting, setIsExtracting] = useState(false);
  const [username, setUsername] = useState("identicons/pedro");
  const [repos, setRepos] = useState<any[]>([]);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  
  const [cvData, setCvData] = useState({
    work: [] as any[],
    education: [] as any[],
    skills: [] as string[]
  });

  const [profile, setProfile] = useState({
    name: "Pedro Emiliano García Oñate",
    headline: "Ingeniero de Software & Desarrollador Backend",
    bio: "Desarrollador enfocado en automatización industrial, simulaciones físicas y ecosistemas API de alto rendimiento. Especializado en sistemas de control dinámico.",
    email: "pedro.garcia@dev.io",
    link: "github.com/Ashrahx",
    location: "Torreón, MX",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await getCurrentUserPortfolio();
      if (data) {
        const actualUsername = data.github_username || "identicons/pedro";
        setUsername(actualUsername);
        setRepos(data.selected_repos || []);
        setCvData({
          work: data.work_experience || [],
          education: data.education || [],
          skills: data.skills || []
        });
        setProfile({
          name: data.display_name || profile.name,
          headline: data.headline || profile.headline,
          bio: data.bio || profile.bio,
          email: data.email || profile.email,
          link: data.link || `github.com/${actualUsername}`,
          location: data.location || profile.location,
        });
      }
    };
    loadData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = (reader.result as string).split(',')[1];
      
      startTransition(async () => {
        try {
          const extractedData = await extractCVDataWithGemini(base64String, file.type);
          await updatePortfolioFromCV(extractedData);
          alert("¡Currículum procesado con magia de IA exitosamente!");
          window.location.reload();
        } catch (error) {
          alert("Error procesando el CV. Revisa la consola.");
          console.error(error);
        } finally {
          setIsExtracting(false);
        }
      });
    };
  };

  const handlePublish = () => {
    startTransition(async () => {
      try {
        await updatePortfolioDetails(profile);
        alert("¡Portafolio publicado con éxito!");
        window.open(`/${username}`, '_blank');
      } catch (error) {
        alert("Error al publicar los cambios.");
      }
    });
  };

  const technologies = repos.length > 0 
    ? Array.from(new Set(repos.map(r => r.lang).filter(Boolean)))
    : ["Python", "Laravel", "PostgreSQL", "Docker", "React"];

  return (
    <div className="flex flex-col lg:flex-row h-full -m-8">
      {/* PANEL IZQUIERDO: Configuración */}
      <div className="w-full lg:w-[400px] border-r border-border bg-background p-6 overflow-y-auto flex-shrink-0 z-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold font-sans">Configuration</h2>
        </div>

        <div className="space-y-8">
          {/* Zona de Subida Mágica */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Magic Import
            </h3>
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${isExtracting ? "border-primary bg-primary/5" : "border-dashed border-border"} rounded-xl cursor-pointer hover:bg-muted/50 transition-all relative overflow-hidden`}>
              {isExtracting ? (
                <div className="flex flex-col items-center text-primary">
                   <CircularProgress size={24} color="inherit" className="mb-2" />
                   <span className="text-xs font-mono font-bold animate-pulse">Gemini is thinking...</span>
                </div>
              ) : (
                <>
                  <CloudUploadOutlinedIcon className="text-muted-foreground mb-2" />
                  <span className="text-xs font-mono text-muted-foreground">Upload CV (PDF)</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf" disabled={isExtracting} />
                </>
              )}
            </label>
          </section>

          {/* Identity Profile Group */}
          <section>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">Identity Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Display Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Role / Headline</label>
                <input type="text" value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Bio</label>
                <textarea rows={4} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" />
              </div>
            </div>
          </section>

          {/* Endpoints Group */}
          <section>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">Endpoints</h3>
            <div className="space-y-3">
              <div className="flex items-center bg-card border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="px-3 border-r border-border text-muted-foreground flex items-center bg-background/50"><EmailOutlinedIcon fontSize="small" /></div>
                <input type="text" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full bg-transparent px-3 py-2 text-sm font-mono outline-none" />
              </div>
              <div className="flex items-center bg-card border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="px-3 border-r border-border text-muted-foreground flex items-center bg-background/50"><LinkIcon fontSize="small" /></div>
                <input type="text" value={profile.link} onChange={(e) => setProfile({ ...profile, link: e.target.value })} className="w-full bg-transparent px-3 py-2 text-sm font-mono outline-none" />
              </div>
              <div className="flex items-center bg-card border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="px-3 border-r border-border text-muted-foreground flex items-center bg-background/50"><LocationOnOutlinedIcon fontSize="small" /></div>
                <input type="text" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="w-full bg-transparent px-3 py-2 text-sm font-mono outline-none" />
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* PANEL DERECHO: Previsualización en Vivo */}
      <div className="flex-1 bg-secondary/5 flex flex-col relative overflow-hidden">
        
        {/* Toolbar de Previsualización */}
        <div className="h-14 border-b border-border/50 bg-card/80 flex justify-between items-center px-6 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex gap-1 bg-background/50 border border-border p-1 rounded-md">
            <button onClick={() => setPreviewMode("desktop")} className={`p-1.5 rounded transition-all duration-200 ${previewMode === "desktop" ? "bg-card shadow-sm text-foreground scale-105" : "text-muted-foreground hover:text-foreground"}`}>
              <DesktopMacOutlinedIcon fontSize="small" />
            </button>
            <button onClick={() => setPreviewMode("mobile")} className={`p-1.5 rounded transition-all duration-200 ${previewMode === "mobile" ? "bg-card shadow-sm text-foreground scale-105" : "text-muted-foreground hover:text-foreground"}`}>
              <PhoneIphoneOutlinedIcon fontSize="small" />
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md hidden sm:flex">
              <DownloadOutlinedIcon fontSize="small" /> Export to HTML
            </button>
            <button onClick={handlePublish} disabled={isPending} className="flex items-center gap-2 px-4 py-1.5 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold uppercase rounded-md disabled:opacity-50">
              <PublishOutlinedIcon fontSize="small" /> {isPending ? "Saving..." : "Deploy"}
            </button>
          </div>
        </div>

        {/* Canvas de Renderizado */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center items-start">
          {previewMode === "mobile" ? (
            <div className="relative w-[340px] md:w-[380px] shrink-0 animate-in zoom-in-95 duration-500 mx-auto mt-4">
              <Iphone className="w-full h-auto drop-shadow-2xl pointer-events-none" />
              <div 
                className="absolute z-10 overflow-hidden bg-background"
                style={{ top: "2.4%", bottom: "2.4%", left: "5.5%", right: "5.5%", borderRadius: "2.5rem" }}
              >
                <div className="w-full h-full overflow-y-auto px-5 pt-12 pb-8 [&::-webkit-scrollbar]:hidden">
                  <MagicPortfolioContent profile={profile} repos={repos} cv={cvData} username={username} isMobile={true} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500 origin-top bg-background p-10 rounded-2xl border border-border shadow-sm">
              <MagicPortfolioContent profile={profile} repos={repos} cv={cvData} username={username} isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENTE: Plantilla tipo Magic UI
// ---------------------------------------------------------------------------
function MagicPortfolioContent({ profile, repos, cv, username, isMobile }: any) {
  
  const softSkillsFilters = ["proactividad", "liderazgo", "equipo", "comunicación", "teamwork", "leadership", "adaptabilidad", "comunicacion", "resolución", "resolucion", "agile", "scrum", "gestión", "gestion", "colaboración", "colaboracion", "creatividad", "creatividad", "pensamiento crítico", "pensamiento critico", "responsabilidad", "organización", "organizacion"];
  const filteredSkills = (cv.skills || []).filter((skill: string) => 
    !softSkillsFilters.some(soft => skill.toLowerCase().includes(soft))
  );

  return (
    <div className={`w-full ${isMobile ? "space-y-8 pb-10" : "space-y-12 pb-20"} font-sans`}>
      {/* Intro */}
      <section className={`flex ${isMobile ? "flex-col-reverse gap-4" : "flex-col-reverse sm:flex-row items-start justify-between gap-6"}`}>
        <div className="space-y-3 flex-1">
          <h1 className={`${isMobile ? "text-3xl" : "text-4xl sm:text-5xl"} font-bold tracking-tighter`}>{profile.name || "Your Name"}</h1>
          <p className={`max-w-[500px] text-muted-foreground ${isMobile ? "text-sm" : "text-base md:text-lg"} leading-relaxed`}>{profile.headline || "Software Engineer"}</p>
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-muted-foreground">
             {profile.location && <span className="flex items-center gap-1.5"><LocationOnOutlinedIcon fontSize="inherit" /> {profile.location}</span>}
             {profile.link && <span className="flex items-center gap-1.5"><LinkIcon fontSize="inherit" /> {profile.link}</span>}
          </div>
        </div>
        <div className={`${isMobile ? "h-20 w-20" : "h-24 w-24"} shrink-0 rounded-full border border-border overflow-hidden bg-muted`}>
           <img src={`https://github.com/${username}.png`} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* About */}
      {profile.bio && (
        <section className="space-y-3">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}>About</h2>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
        </section>
      )}

      {/* Work Experience */}
      {cv.work && cv.work.length > 0 && (
        <section className="space-y-6">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}>Work Experience</h2>
          <div className="space-y-6">
            {cv.work.map((job: any, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                 <div className="mt-1 p-2 bg-secondary/20 text-secondary rounded-full border border-secondary/30 shrink-0">
                    <BusinessCenterOutlinedIcon fontSize="small" />
                 </div>
                 <div className="flex-1 pb-4 border-b border-border/50 last:border-0">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                     <h3 className="font-bold text-base leading-none">{job.company}</h3>
                     <span className="text-xs font-mono text-muted-foreground">{job.start} - {job.end}</span>
                   </div>
                   <p className="text-sm text-foreground/80 font-medium mb-3">{job.title}</p>
                   <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {cv.education && cv.education.length > 0 && (
        <section className="space-y-6">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}>Education</h2>
          <div className="space-y-6">
            {cv.education.map((edu: any, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                 <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full border border-primary/20 shrink-0">
                    <SchoolOutlinedIcon fontSize="small" />
                 </div>
                 <div className="flex-1">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                     <h3 className="font-bold text-base leading-none">{edu.school}</h3>
                     <span className="text-xs font-mono text-muted-foreground">{edu.start} - {edu.end}</span>
                   </div>
                   <p className="text-sm text-muted-foreground">{edu.degree}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {filteredSkills.length > 0 && (
        <section className="space-y-4">
          <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}>Skills</h2>
          <div className="flex flex-wrap gap-2.5">
            {filteredSkills.map((skill: string) => {
              const normalizedSkill = skill.toLowerCase().trim();
              const SvgComponent = IconMap[normalizedSkill] || null;

              return (
                <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
                  {SvgComponent ? (
                    <SvgComponent className="w-4 h-4" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  )}
                  <span className="text-xs font-medium text-foreground">{skill}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="space-y-6">
        <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}>Featured Projects</h2>
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}>
          {repos.length > 0 ? repos.map((repo: any) => (
            <div key={repo.name} className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-colors shadow-sm">
              <div className="h-28 bg-muted flex flex-col items-center justify-center font-mono text-xs text-muted-foreground border-b border-border/50">
                <span>{repo.name}</span>
                <span className="text-[10px] opacity-50 mt-1">GitHub Integration</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-sm leading-tight hover:underline text-primary">
                      <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
                   </h3>
                   <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                     ⭐ {repo.stars}
                   </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-4 flex-1">{repo.desc}</p>
                <div className="flex gap-2">
                   <Badge variant="secondary" className="text-[10px] font-mono">{repo.lang}</Badge>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground col-span-full">Sync your GitHub repositories to display them here.</p>
          )}
        </div>
      </section>
    </div>
  );
}