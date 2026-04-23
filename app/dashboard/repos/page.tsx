"use client";

import { useState, useEffect } from "react";
import { fetchUserRepositories } from "@/app/actions"; // Importamos la acción
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SyncIcon from "@mui/icons-material/Sync";
import CheckIcon from "@mui/icons-material/Check";

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar los datos reales
  const loadRepos = async () => {
    setIsLoading(true);
    try {
      const realRepos = await fetchUserRepositories();
      // Transformamos los datos de GraphQL a la estructura de nuestra UI
      const formattedRepos = realRepos.map((r: any, index: number) => ({
        id: index,
        name: r.name,
        desc: r.description || "Sin descripción proporcionada.",
        lang: r.primaryLanguage?.name || "Desconocido",
        langColor: r.primaryLanguage?.color || "#888",
        stars: r.stargazerCount,
        url: r.url,
        selected: false, // Por defecto no están en el portafolio hasta que el usuario los seleccione
      }));
      setRepos(formattedRepos);
    } catch (error) {
      console.error("Error al sincronizar repos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar automáticamente al entrar a la página
  useEffect(() => {
    loadRepos();
  }, []);

  const toggleRepo = (id: number) => {
    setRepos(
      repos.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)),
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-sans">Overview</h1>
        </div>
        <div className="flex gap-3">
          {/* Botón de sincronización manual conectado a la función */}
          <button
            onClick={loadRepos}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-muted text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors rounded-md disabled:opacity-50"
          >
            <SyncIcon
              sx={{ fontSize: 16 }}
              className={isLoading ? "animate-spin" : ""}
            />
            {isLoading ? "Syncing..." : "Sync GitHub"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors rounded-md">
            Save Selection
          </button>
        </div>
      </div>

      {/* Grid de Repositorios Reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-muted-foreground font-mono text-sm animate-pulse">
            Establishing secure connection to GitHub API...
          </div>
        ) : (
          repos.map((repo) => (
            <div
              key={repo.id}
              onClick={() => toggleRepo(repo.id)}
              className={`cursor-pointer border p-5 transition-all duration-200 rounded-lg flex flex-col justify-between h-48
              ${
                repo.selected
                  ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                  : "bg-card border-border hover:border-muted-foreground/50"
              }
            `}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <FolderOutlinedIcon
                      sx={{ fontSize: 18 }}
                      className={
                        repo.selected ? "text-primary" : "text-muted-foreground"
                      }
                    />
                    <h3 className="font-mono font-bold text-[15px] truncate max-w-45">
                      {repo.name}
                    </h3>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors
                  ${repo.selected ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background"}
                `}
                  >
                    {repo.selected && (
                      <CheckIcon sx={{ fontSize: 14, strokeWidth: 3 }} />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-3">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-4">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  {repo.lang}
                </div>
                <div className="flex items-center gap-1">
                  <StarBorderIcon sx={{ fontSize: 16 }} /> {repo.stars}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
