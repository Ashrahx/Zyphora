"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { signInWithGithub } from "./actions";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-[1200px] h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-primary font-mono font-bold text-xl tracking-tighter">
              Zyphora
            </span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Templates
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Showcase
              </a>
            </div>
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10" />

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
          Zyphora conecta directamente con tu GitHub para generar
          instantáneamente un portafolio de alto rendimiento diseñado para
          ingenieros. Cero drag-and-drop. Solo datos puros.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <form action={signInWithGithub}>
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 flex items-center gap-2"
            >
              <GitHubIcon fontSize="small" /> Login with GitHub
            </Button>
          </form>

          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-card px-8 flex items-center gap-2"
          >
            View Demo <ArrowForwardIcon fontSize="small" />
          </Button>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <p>© 2024 DEVFOLIO. BUILT FOR THE ELITE.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              GitHub API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
