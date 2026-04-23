"use client";

import { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkIcon from "@mui/icons-material/Link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function PreviewPage() {
  // Estado para el data binding en tiempo real
  const [profile, setProfile] = useState({
    name: "Pedro García Oñate",
    headline: "Ingeniero de Software & Desarrollador Backend",
    bio: "Desarrollador enfocado en automatización industrial, simulaciones físicas y ecosistemas API de alto rendimiento con Python y Laravel. Estudiante de ingeniería especializado en sistemas de control dinámico.",
    email: "pedro.garcia@dev.io",
    link: "github.com/pedrogarcia",
    location: "Torreón, MX",
  });

  return (
    <div className="flex flex-col lg:flex-row h-full -m-8">
      {" "}
      {/* -m-8 compensa el padding del layout para vista edge-to-edge */}
      {/* PANEL IZQUIERDO: Configuración */}
      <div className="w-full lg:w-[400px] border-r border-border bg-background p-6 overflow-y-auto flex-shrink-0">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold font-sans">Configuration</h2>
          <button className="text-muted-foreground hover:text-foreground">
            {/* Icono de filtros o ajustes extra */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          {/* Identity Profile Group */}
          <section>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
              Identity Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">
                  Role / Headline
                </label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) =>
                    setProfile({ ...profile, headline: e.target.value })
                  }
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Endpoints Group */}
          <section>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
              Endpoints
            </h3>
            <div className="space-y-3">
              <div className="flex items-center bg-card border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="px-3 border-r border-border text-muted-foreground flex items-center bg-background/50">
                  <EmailOutlinedIcon fontSize="small" />
                </div>
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full bg-transparent px-3 py-2 text-sm font-mono outline-none"
                />
              </div>
              <div className="flex items-center bg-card border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <div className="px-3 border-r border-border text-muted-foreground flex items-center bg-background/50">
                  <LinkIcon fontSize="small" />
                </div>
                <input
                  type="text"
                  value={profile.link}
                  onChange={(e) =>
                    setProfile({ ...profile, link: e.target.value })
                  }
                  className="w-full bg-transparent px-3 py-2 text-sm font-mono outline-none"
                />
              </div>
            </div>
          </section>

          {/* Featured Repositories List (Mock Drag & Drop) */}
          <section>
            <div className="flex justify-between items-end mb-4 pb-2 border-b border-border">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                Featured Repositories
              </h3>
              <span className="text-[9px] font-mono text-primary">
                Drag to reorder
              </span>
            </div>
            <div className="space-y-2">
              {[
                { name: "boviflow-core", color: "#3572A5", active: true },
                { name: "sketchify-ai", color: "#3178c6", active: true },
                { name: "legacy-api-wrapper", color: "#8b949e", active: false },
              ].map((repo, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-2 border rounded-md text-sm font-mono
                  ${repo.active ? "bg-card border-border" : "bg-background border-border/50 opacity-60"}
                `}
                >
                  <DragIndicatorIcon
                    fontSize="small"
                    className="text-muted-foreground cursor-grab"
                  />
                  <span
                    className={
                      repo.active
                        ? "text-foreground font-bold"
                        : "line-through text-muted-foreground"
                    }
                  >
                    {repo.name}
                  </span>
                  <div className="ml-auto flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: repo.color }}
                    />
                    {repo.active ? (
                      <VisibilityOutlinedIcon
                        fontSize="small"
                        className="text-primary"
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        fontSize="small"
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* PANEL DERECHO: Previsualización en Vivo */}
      <div className="flex-1 bg-[#0a0e14] flex flex-col relative overflow-hidden">
        {/* Toolbar de Previsualización */}
        <div className="h-14 border-b border-border bg-card/50 flex justify-between items-center px-6 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex gap-2 bg-background border border-border p-1 rounded-md">
            <button className="p-1 rounded bg-card shadow-sm text-foreground">
              <DesktopMacOutlinedIcon fontSize="small" />
            </button>
            <button className="p-1 rounded text-muted-foreground hover:text-foreground">
              <PhoneIphoneOutlinedIcon fontSize="small" />
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md">
              <DownloadOutlinedIcon fontSize="small" /> Export to HTML
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold uppercase rounded-md">
              <PublishOutlinedIcon fontSize="small" /> Publish
            </button>
          </div>
        </div>

        {/* El Canvas de Renderizado del Portafolio */}
        <div className="flex-1 overflow-y-auto p-10 flex justify-center">
          {/* Aquí inyectamos el "Template" real. En este caso simulamos el template minimalista */}
          <div className="w-full max-w-3xl space-y-12 animate-in fade-in zoom-in-95 duration-500 origin-top">
            {/* Header del Template */}
            <div className="flex flex-col md:flex-row gap-8 items-start pb-10 border-b border-border/50">
              <div className="w-32 h-32 rounded-lg border border-border overflow-hidden bg-muted flex-shrink-0">
                {/* Simulando el Avatar */}
                <img
                  src="https://github.com/identicons/pedro.png"
                  alt="Avatar"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-sans tracking-tight mb-2">
                  {profile.name}
                </h1>
                <h2 className="text-primary font-mono text-sm mb-4">
                  {profile.headline}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {profile.bio}
                </p>

                <div className="flex items-center gap-6 mt-6 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <LocationOnOutlinedIcon fontSize="small" />{" "}
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <LinkIcon fontSize="small" /> {profile.link}
                  </span>
                </div>
              </div>
            </div>

            {/* Tecnologías del Template */}
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Python", "Laravel", "PostgreSQL", "Docker", "React"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Repositorios del Template */}
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Pinned Repositories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Repo Card 1 */}
                <div className="p-6 border border-border bg-card/40 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-mono font-bold text-primary">
                      boviflow-core
                    </h4>
                    <span className="px-2 py-0.5 border border-border rounded-full text-[10px] font-mono text-muted-foreground">
                      Public
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    Dynamic control system resolving load stability formulas via
                    automated Z-indexing.
                  </p>
                  <div className="flex gap-4 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#3572A5]" />{" "}
                      Python
                    </span>
                    <span>⭐ 1.2k</span>
                  </div>
                </div>

                {/* Repo Card 2 */}
                <div className="p-6 border border-border bg-card/40 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-mono font-bold text-primary">
                      sketchify-ai
                    </h4>
                    <span className="px-2 py-0.5 border border-border rounded-full text-[10px] font-mono text-muted-foreground">
                      Public
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    AI-driven rendering pipeline to transform architectural
                    floor plans into 3D environments.
                  </p>
                  <div className="flex gap-4 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#3178c6]" />{" "}
                      TypeScript
                    </span>
                    <span>⭐ 856</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
