import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TerminalIcon from "@mui/icons-material/Terminal";

// Función auxiliar para inicializar Supabase
async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );
}

export default async function PublicPortfolio({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await getSupabase();

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("github_username", username)
    .single();

  if (error || !portfolio) notFound();

  const template = portfolio.template_id || 'minimal';

  // ==========================================
  // PLANTILLA 1: MINIMAL (Tu diseño original)
  // ==========================================
  if (template === 'minimal') {
    return (
      <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <header className="pt-32 pb-20 px-6 text-center border-b border-border/50 bg-card/10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-4">
              Software Engineer
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{portfolio.display_name}</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              {portfolio.bio || "Crafting elite code. Building high-performance systems and turning complex problems into elegant solutions."}
            </p>
          </div>
        </header>

        <section className="py-20 px-6">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-2xl font-bold mb-10 font-mono flex items-center gap-4">
              <span className="text-primary">01.</span> Featured Work
              <div className="h-px bg-border flex-1 ml-4" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.selected_repos?.map((repo: any, index: number) => (
                <a key={index} href={repo.url} target="_blank" rel="noreferrer" className="group block p-8 border border-border rounded-xl bg-card hover:border-primary/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary"><FolderOutlinedIcon /></div>
                    <StarBorderIcon className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{repo.name}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">{repo.desc}</p>
                  <div className="flex items-center justify-between text-sm font-mono text-muted-foreground border-t border-border/50 pt-6">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      {repo.lang}
                    </span>
                    <span className="flex items-center gap-1">{repo.stars} stars</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // PLANTILLA 2: TERMINAL HACKER
  // ==========================================
  if (template === 'terminal') {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono p-8 selection:bg-green-500 selection:text-black">
        <div className="max-w-4xl mx-auto border border-green-500/30 p-8 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
          <header className="mb-12 border-b border-green-500/30 pb-8">
            <div className="flex items-center gap-2 text-green-400 mb-4">
               <TerminalIcon /> <span>root@{portfolio.github_username}:~# whoami</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{portfolio.display_name}</h1>
            <p className="text-green-600">
              {portfolio.bio || "> SYSTEM_READY: Engineer focused on scalable architecture."}
            </p>
          </header>

          <section>
            <div className="text-green-400 mb-6">root@{portfolio.github_username}:~# ls -la ./projects</div>
            <div className="space-y-6">
              {portfolio.selected_repos?.map((repo: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between border-l-2 border-green-500/30 pl-4 hover:bg-green-950/30 transition-colors py-2">
                  <div>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="text-xl font-bold hover:underline hover:text-green-300">
                      ./{repo.name}
                    </a>
                    <p className="text-sm text-green-600 mt-1">{repo.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-2 md:mt-0 text-green-700">
                    <span>[{repo.lang}]</span>
                    <span>★ {repo.stars}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }
}