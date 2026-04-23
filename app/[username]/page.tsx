import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Función auxiliar para inicializar Supabase en el servidor
async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
}

export default async function PublicPortfolio({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await getSupabase();

  // Buscamos el portafolio en la base de datos basándonos en el nombre de usuario de la URL
  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("github_username", username)
    .single();

  // Si no existe, lanzamos un error 404 nativo de Next.js
  if (error || !portfolio) {
    notFound();
  }

  // Comprobamos si tiene un tema configurado (para futuras iteraciones), por ahora forzamos oscuro/claro por defecto
  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      
      {/* Cabecera / Hero Section */}
      <header className="pt-32 pb-20 px-6 text-center border-b border-border/50 bg-card/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-4">
            Software Engineer
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {portfolio.display_name}
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            {portfolio.bio || "Crafting elite code. Building high-performance systems and turning complex problems into elegant solutions."}
          </p>
        </div>
      </header>

      {/* Grid de Proyectos Seleccionados */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-2xl font-bold mb-10 font-mono flex items-center gap-4">
            <span className="text-primary">01.</span> Featured Work
            <div className="h-px bg-border flex-1 ml-4" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.selected_repos?.map((repo: any, index: number) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group block p-8 border border-border rounded-xl bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.05)] hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <FolderOutlinedIcon fontSize="medium" />
                  </div>
                  <StarBorderIcon className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                
                <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                  {repo.desc}
                </p>
                
                <div className="flex items-center justify-between text-sm font-mono text-muted-foreground border-t border-border/50 pt-6">
                  <span className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: repo.langColor }}
                    />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1">
                     {repo.stars} stars
                  </span>
                </div>
              </a>
            ))}
            
            {(!portfolio.selected_repos || portfolio.selected_repos.length === 0) && (
               <p className="text-muted-foreground col-span-full text-center py-10 font-mono">No projects featured yet.</p>
            )}
          </div>
        </div>
      </section>
      
      <footer className="py-10 text-center text-sm font-mono text-muted-foreground border-t border-border/50">
        <p>Built with <a href="/" className="text-primary hover:underline">Zyphora</a></p>
      </footer>
    </main>
  );
}