"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { Repository, Profile, CVData } from "@/lib/types";
import { PortfolioRenderer } from "@/components/portfolio-renderer";
import { Lang } from "@/lib/i18n";

export default function PublicPortfolio() {
  const params = useParams();
  const searchParams = useSearchParams();
  const username = params.username as string;
  const templateOverride = searchParams.get("t");
  const langParam = searchParams.get("lang");
  const activeLang: Lang = langParam === "en" ? "en" : "es";
  const [portfolio, setPortfolio] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const supabase = createClient();

        const { data, error: queryError } = await supabase
          .from("portfolios")
          .select("*")
          .eq("github_username", username)
          .single();

        if (queryError || !data) {
          setError(true);
          return;
        }

        setPortfolio(data);
      } catch (err) {
        console.error("Error loading portfolio:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [username]);

  const toggleJobExpanded = (jobIndex: number) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobIndex]: !prev[jobIndex],
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando portafolio...</p>
        </div>
      </main>
    );
  }

  if (error || !portfolio) {
    return notFound();
  }

  const profile: Profile = {
    name: (portfolio.display_name as string) || "Developer",
    headline: (portfolio.headline as string) || "Software Engineer",
    bio: (portfolio.bio as string) || "",
    email: (portfolio.email as string) || "",
    link: (portfolio.link as string) || "",
    location: (portfolio.location as string) || "",
  };

  const repos: Repository[] = (
    (portfolio.selected_repos as Record<string, unknown>[]) || []
  ).map((repo: Record<string, unknown>) => ({
    name: (repo.name as string) || "",
    url: (repo.url as string) || "",
    desc: (repo.desc as string) || "",
    lang: (repo.lang as string) || "Unknown",
    stars: (repo.stars as number) || 0,
    langColor: (repo.langColor as string) || "#cccccc",
  }));

  const cvData: CVData = {
    work: (portfolio.work_experience as CVData["work"]) || [],
    education: (portfolio.education as CVData["education"]) || [],
    skills: (portfolio.skills as string[]) || [],
  };

  const filteredSkills = cvData.skills.filter(
    (skill: string | null | undefined) => skill && skill.trim().length > 0,
  );

  const validTemplates = ["minimal", "modern", "professional", "creative"];
  const activeTemplate =
    templateOverride && validTemplates.includes(templateOverride)
      ? templateOverride
      : (portfolio.template_id as string) || "minimal";

  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-y-auto h-auto">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <PortfolioRenderer
          profile={profile}
          repos={repos}
          cv={cvData}
          username={(portfolio.github_username as string) || username}
          template={activeTemplate}
          expandedJobs={expandedJobs}
          toggleJobExpanded={toggleJobExpanded}
          filteredSkills={filteredSkills}
          lang={activeLang}
        />
      </div>
    </main>
  );
}
