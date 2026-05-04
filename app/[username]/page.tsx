import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Repository } from "@/lib/types";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TerminalIcon from "@mui/icons-material/Terminal";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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
    },
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

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("github_username", username)
    .single();

  if (error || !portfolio) notFound();

  const template = portfolio.template_id || "minimal";

  if (template === "minimal") {
    return (
      <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <header className="pt-32 pb-20 px-6 text-center border-b border-border/50 bg-card/10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-4">
              Software Engineer
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {portfolio.display_name}
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              {portfolio.bio ||
                "Crafting elite code. Building high-performance systems and turning complex problems into elegant solutions."}
            </p>
          </div>
        </header>

        <section className="py-20 px-6">
          <div className="max-w-250 mx-auto">
            <h2 className="text-2xl font-bold mb-10 font-mono flex items-center gap-4">
              <span className="text-primary">01.</span> Featured Work
              <div className="h-px bg-border flex-1 ml-4" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.selected_repos?.map(
                (repo: Repository, index: number) => (
                  <a
                    key={index}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block p-8 border border-border rounded-xl bg-card hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <FolderOutlinedIcon />
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
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (template === "terminal") {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono p-8 selection:bg-green-500 selection:text-black">
        <div className="max-w-4xl mx-auto border border-green-500/30 p-8 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
          <header className="mb-12 border-b border-green-500/30 pb-8">
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <TerminalIcon />{" "}
              <span>root@{portfolio.github_username}:~# whoami</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {portfolio.display_name}
            </h1>
            <p className="text-green-600">
              {portfolio.bio ||
                "> SYSTEM_READY: Engineer focused on scalable architecture."}
            </p>
          </header>

          <section>
            <div className="text-green-400 mb-6">
              root@{portfolio.github_username}:~# ls -la ./projects
            </div>
            <div className="space-y-6">
              {portfolio.selected_repos?.map(
                (repo: Repository, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between border-l-2 border-green-500/30 pl-4 hover:bg-green-950/30 transition-colors py-2"
                  >
                    <div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl font-bold hover:underline hover:text-green-300"
                      >
                        ./{repo.name}
                      </a>
                      <p className="text-sm text-green-600 mt-1">{repo.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs mt-2 md:mt-0 text-green-700">
                      <span>[{repo.lang}]</span>
                      <span>★ {repo.stars}</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (template === "card-grid") {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <header className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white shadow-xl">
              {portfolio.display_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                {portfolio.display_name}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                {portfolio.bio ||
                  "Desarrollador Full Stack. Transformando ideas en experiencias digitales."}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.selected_repos?.map(
              (repo: Repository, index: number) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-500/20">
                        {repo.lang}
                      </span>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-500 transition-colors"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex-1 leading-relaxed">
                      {repo.desc}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <StarBorderIcon fontSize="small" />
                      <span className="font-medium">{repo.stars} stars</span>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: repo.langColor }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </main>
    );
  }
}
