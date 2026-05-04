"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CasinoIcon from "@mui/icons-material/Casino";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PaletteIcon from "@mui/icons-material/Palette";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      router.replace(`/auth/callback?code=${code}`);
    }
  }, [searchParams, router]);

  const [showDemo, setShowDemo] = useState(false);
  const [demoData, setDemoData] = useState({
    name: "Juan Pérez",
    headline: "Full Stack Developer",
    template: "minimal",
  });

  const handleDemoInputChange = (field: string, value: string) => {
    setDemoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeployWithTemplate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("selectedTemplate", demoData.template);

    const templateNames: Record<string, string> = {
      minimal: "Minimalista",
      modern: "Moderno",
      professional: "Profesional",
      creative: "Creativo",
    };

    toast.loading(
      `Iniciando con plantilla ${templateNames[demoData.template]}...`,
      {
        position: "top-center",
      },
    );

    setTimeout(() => {
      window.location.href = "/api/auth/signin";
    }, 800);
  };

  const randomProfiles = [
    { name: "María García", headline: "React & TypeScript Specialist" },
    { name: "Carlos López", headline: "Python Data Scientist" },
    { name: "Ana Rodríguez", headline: "DevOps & Cloud Engineer" },
    { name: "Miguel Torres", headline: "Mobile Developer iOS/Android" },
    { name: "Laura Sánchez", headline: "UI/UX Designer & Frontend" },
  ];

  const generateRandomProfile = () => {
    const random =
      randomProfiles[Math.floor(Math.random() * randomProfiles.length)];
    setDemoData((prev) => ({
      ...prev,
      ...random,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 w-full h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-primary font-mono font-bold text-xl tracking-tighter">
              Prism
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AnimatedThemeToggler />
            <Button
              variant="outline"
              size="sm"
              className="font-mono uppercase tracking-widest text-[10px]"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[10px] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v1.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Your code is <span className="text-white">elite.</span>
          <br />
          <span className="text-primary">Your portfolio should be too.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Prism conecta directamente con tu GitHub para generar instantáneamente
          un portafolio de alto rendimiento diseñado para ingenieros. Cero
          drag-and-drop. Solo datos puros.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 flex items-center gap-2"
            onClick={() => {
              window.location.href = "/api/auth/signin";
            }}
          >
            <GitHubIcon fontSize="small" /> Login with GitHub
          </Button>

          <Button
            onClick={() => setShowDemo(true)}
            size="lg"
            variant="outline"
            className="border-border hover:bg-card px-8 flex items-center gap-2"
          >
            View Demo <ArrowForwardIcon fontSize="small" />
          </Button>
        </div>
      </main>

      {showDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-border p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Prueba tu Portfolio</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="overflow-auto p-6 flex-1 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={demoData.name}
                    onChange={(e) =>
                      handleDemoInputChange("name", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Tu Titular (Headline)
                  </label>
                  <input
                    type="text"
                    value={demoData.headline}
                    onChange={(e) =>
                      handleDemoInputChange("headline", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    placeholder="Ej: Full Stack Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Plantilla
                  </label>
                  <select
                    value={demoData.template}
                    onChange={(e) =>
                      handleDemoInputChange("template", e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="minimal">Minimalista</option>
                    <option value="modern">Moderno</option>
                    <option value="professional">Profesional</option>
                    <option value="creative">Creativo</option>
                  </select>
                </div>

                <Button
                  onClick={generateRandomProfile}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <CasinoIcon fontSize="small" /> Generar Aleatorio
                </Button>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <StarIcon fontSize="small" /> Características incluidas:
                  </h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Perfil GitHub automático</li>
                    <li>• Experiencia de tu CV</li>
                    <li>• 6 repos principales</li>
                    <li>• Link público</li>
                  </ul>
                </div>
              </div>

              <div className="border border-border rounded-lg overflow-hidden bg-background">
                <div className="h-full flex flex-col">
                  <div className="bg-primary/5 border-b border-border p-4">
                    <p className="text-xs font-mono text-muted-foreground">
                      VISTA PREVIA
                    </p>
                  </div>

                  <div className="flex-1 p-6 overflow-auto space-y-4">
                    {demoData.template === "minimal" && (
                      <>
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/50 mx-auto mb-3"></div>
                          <h2 className="text-xl font-bold">{demoData.name}</h2>
                          <p className="text-sm text-primary font-semibold">
                            {demoData.headline}
                          </p>
                        </div>
                        <div className="border-t border-border pt-4">
                          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                            <LocationOnIcon fontSize="small" /> Proyectos
                          </h3>
                          <div className="space-y-2 text-xs">
                            <div className="p-2 border border-border rounded">
                              Api REST con Node.js
                            </div>
                            <div className="p-2 border border-border rounded">
                              Dashboard React
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {demoData.template === "modern" && (
                      <>
                        <div className="bg-linear-to-r from-primary/20 to-primary/5 p-4 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-primary mx-auto mb-2"></div>
                          <h2 className="text-lg font-bold text-center">
                            {demoData.name}
                          </h2>
                          <p className="text-xs text-center text-muted-foreground">
                            {demoData.headline}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                              React
                            </span>
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                              Node.js
                            </span>
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                              TypeScript
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {demoData.template === "professional" && (
                      <>
                        <h2 className="text-xl font-bold border-b border-border pb-2">
                          {demoData.name}
                        </h2>
                        <p className="font-semibold text-primary">
                          {demoData.headline}
                        </p>
                        <div className="border-t border-border pt-3 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="font-bold">Senior Developer</span>
                            <span className="text-muted-foreground">
                              2020 - Presente
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            Liderando proyectos críticos
                          </p>
                        </div>
                      </>
                    )}

                    {demoData.template === "creative" && (
                      <>
                        <div className="bg-linear-to-br from-purple-500/20 to-primary/20 p-6 rounded-lg text-center">
                          <LaptopIcon
                            sx={{ fontSize: 40 }}
                            className="mx-auto mb-2"
                          />
                          <h2 className="text-lg font-bold">{demoData.name}</h2>
                          <p className="text-sm text-primary">
                            {demoData.headline}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 border border-border rounded text-center">
                            <PhoneIphoneIcon className="text-2xl mx-auto mb-1" />
                            <p className="text-xs font-bold">Mobile</p>
                          </div>
                          <div className="p-2 border border-border rounded text-center">
                            <PaletteIcon className="text-2xl mx-auto mb-1" />
                            <p className="text-xs font-bold">Design</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-6 flex gap-3">
              <form onSubmit={handleDeployWithTemplate} className="flex-1">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                >
                  Empezar Ahora
                </Button>
              </form>
              <Button
                onClick={() => setShowDemo(false)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <p>© 2026 PRISM. BUILT FOR THE ELITE.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              GitHub API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
