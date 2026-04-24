// CREAR: app/dashboard/page.tsx
import { getCurrentUserPortfolio } from "@/app/actions";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default async function DashboardOverview() {
  const portfolio = await getCurrentUserPortfolio();
  
  const repoCount = portfolio?.selected_repos?.length || 0;
  const username = portfolio?.github_username || "User";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold font-sans">Welcome back, {username}</h1>
        <p className="text-muted-foreground text-sm mt-1">Here is the status of your developer portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-border bg-card rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <GitHubIcon fontSize="small" />
          </div>
          <h3 className="text-3xl font-bold font-mono">{repoCount}</h3>
          <p className="text-muted-foreground text-sm mt-1">Featured Repositories</p>
        </div>
        
        <div className="p-6 border border-border bg-card rounded-xl">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
            <span className="font-bold">#</span>
          </div>
          <h3 className="text-3xl font-bold font-mono">{portfolio?.template_id || 'minimal'}</h3>
          <p className="text-muted-foreground text-sm mt-1">Active Template</p>
        </div>
      </div>

      <div className="mt-8 p-6 border border-border bg-card/50 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold">Ready to deploy?</h3>
          <p className="text-sm text-muted-foreground">Review your content and publish your site to the world.</p>
        </div>
        <Link 
          href="/dashboard/preview" 
          className="px-4 py-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider rounded-md hover:bg-primary/90 flex items-center gap-2"
        >
          Go to Preview <ArrowForwardIcon fontSize="small" />
        </Link>
      </div>
    </div>
  );
}