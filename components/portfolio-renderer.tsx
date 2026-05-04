"use client";

import Image from "next/image";
import {
  Profile,
  Repository,
  CVData,
  WorkExperience,
  Education,
} from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkIcon from "@mui/icons-material/Link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import StarIcon from "@mui/icons-material/Star";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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
import { PhpDark } from "@/components/ui/svgs/phpDark";
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

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: ReactDark,
  "react.js": ReactDark,
  reactjs: ReactDark,
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

import { t, Lang } from "@/lib/i18n";

export function PortfolioRenderer({
  profile,
  repos,
  cv,
  username,
  template,
  expandedJobs,
  toggleJobExpanded,
  filteredSkills,
  lang = "es",
}: {
  profile: Profile;
  repos: Repository[];
  cv: CVData;
  username: string;
  template: string;
  expandedJobs: Record<string, boolean>;
  toggleJobExpanded: (idx: number) => void;
  filteredSkills: string[];
  lang?: Lang;
}) {
  if (template === "minimal") {
    return (
      <div className="w-full space-y-12 pb-20 font-sans">
        <section className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6">
          <div className="h-24 w-24 shrink-0 rounded-full border border-border overflow-hidden bg-muted">
            <Image
              src={`https://github.com/${username}.png`}
              alt="avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">
              {profile.name || "Your Name"}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {profile.headline || "Software Engineer"}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-muted-foreground">
              {profile.location && (
                <span className="flex items-center gap-1.5">
                  <LocationOnOutlinedIcon fontSize="inherit" />{" "}
                  {profile.location}
                </span>
              )}
              {profile.link && (
                <a
                  href={
                    profile.link.startsWith("http")
                      ? profile.link
                      : `https://${profile.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <LinkIcon fontSize="inherit" /> {profile.link}
                </a>
              )}
            </div>
          </div>
        </section>

        {profile.bio && (
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </p>
          </section>
        )}

        {cv.work && cv.work.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">
              {t("workExperience", lang)}
            </h2>
            <div className="space-y-6">
              {cv.work.map((job: WorkExperience, i: number) => {
                const isExpanded = expandedJobs[i] ?? true;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 p-2 bg-primary/10 text-foreground rounded-full border border-primary/20 shrink-0">
                      <BusinessCenterOutlinedIcon fontSize="small" />
                    </div>
                    <div className="flex-1 pb-4 border-b border-border/50 last:border-0">
                      <div
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-1 cursor-pointer group"
                        onClick={() => toggleJobExpanded(i)}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <h3 className="font-bold text-base leading-none group-hover:text-primary transition-colors">
                            {job.company}
                          </h3>
                          <ChevronRightOutlinedIcon
                            fontSize="small"
                            className={`text-foreground transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {job.start} - {job.end}
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <p className="text-sm text-foreground/80 font-medium mb-3 mt-2">
                          {job.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {cv.education && cv.education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">
              {t("education", lang)}
            </h2>
            <div className="space-y-6">
              {cv.education.map((edu: Education, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 p-2 bg-primary/10 text-primary rounded-full border border-primary/20 shrink-0">
                    <SchoolOutlinedIcon fontSize="small" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                      <h3 className="font-bold text-base leading-none">
                        {edu.school}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {edu.start} - {edu.end}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {filteredSkills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">
              {t("skills", lang)}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {filteredSkills.map((skill: string) => {
                const normalizedSkill = skill.toLowerCase().trim();
                const SvgComponent = IconMap[normalizedSkill] || null;

                return (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card shadow-sm hover:border-primary/40 transition-colors"
                  >
                    {SvgComponent ? (
                      <SvgComponent className="w-4 h-4" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    )}
                    <span className="text-xs font-medium text-foreground">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">
            {t("featuredProjects", lang)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.length > 0 ? (
              repos.map((repo: Repository) => (
                <div
                  key={repo.name}
                  className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-colors shadow-sm"
                >
                  <div className="h-28 bg-muted flex flex-col items-center justify-center font-mono text-xs text-muted-foreground border-b border-border/50">
                    <span>{repo.name}</span>
                    <span className="text-[10px] opacity-50 mt-1">
                      GitHub Integration
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm leading-tight hover:underline text-primary">
                        <a href={repo.url} target="_blank" rel="noreferrer">
                          {repo.name}
                        </a>
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <StarIcon
                          sx={{ fontSize: 11 }}
                          className="text-yellow-400"
                        />{" "}
                        {repo.stars}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {repo.desc}
                    </p>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-mono"
                      >
                        {repo.lang}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-full">
                {t("noRepos", lang)}
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (template === "modern") {
    return (
      <div className="w-full space-y-10 pb-20 font-sans">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <h1 className="text-6xl font-black tracking-tighter mb-2">
              {profile.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="font-semibold text-lg text-primary">
                {profile.headline}
              </span>
            </div>
            <p className="max-w-2xl text-muted-foreground text-base leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.location && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
              <LocationOnOutlinedIcon className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold text-sm">{profile.location}</p>
              </div>
            </div>
          )}
          {profile.email && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
              <EmailOutlinedIcon className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold text-sm">{profile.email}</p>
              </div>
            </div>
          )}
          {profile.link && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
              <LinkIcon className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Website</p>
                <a
                  href={
                    profile.link.startsWith("http")
                      ? profile.link
                      : `https://${profile.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:text-primary transition-colors"
                >
                  {profile.link}
                </a>
              </div>
            </div>
          )}
        </div>

        {cv.work && cv.work.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="h-1 w-8 bg-primary rounded-full" />
              {t("workExperience", lang)}
            </h2>
            <div className="space-y-4">
              {cv.work.map((job: WorkExperience, idx: number) => {
                const isExpanded = expandedJobs[idx] ?? true;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border bg-card/50"
                  >
                    <div
                      className="flex justify-between items-start mb-1 cursor-pointer group"
                      onClick={() => toggleJobExpanded(idx)}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-primary group-hover:opacity-80 transition-opacity">
                          {job.company}
                        </h3>
                        <ChevronRightOutlinedIcon
                          fontSize="small"
                          className={`text-foreground transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </div>
                      {job.duration && (
                        <span className="text-xs text-muted-foreground">
                          {job.duration}
                        </span>
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-sm text-foreground font-medium mb-1">
                        {job.title || job.position}
                      </p>
                      {job.description && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {job.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {cv.education && cv.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="h-1 w-8 bg-primary rounded-full" />
              {t("education", lang)}
            </h2>
            <div className="space-y-4">
              {cv.education.map((edu: Education, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-border bg-card/50"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary">{edu.degree}</h3>
                    {edu.year && (
                      <span className="text-xs text-muted-foreground">
                        {edu.year}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.school || edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="h-1 w-8 bg-primary rounded-full" />
            {t("featuredWork", lang)}
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {repos.slice(0, 4).map((repo: Repository) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {repo.desc || repo.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                      {repo.lang}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-yellow-500">
                      <StarIcon sx={{ fontSize: 11 }} />{" "}
                      {repo.stars ?? repo.stargazerCount}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {filteredSkills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="h-1 w-8 bg-primary rounded-full" />
              {t("skills", lang)}
            </h2>
            <div className="flex flex-wrap gap-3">
              {filteredSkills.slice(0, 12).map((skill: string) => (
                <div
                  key={skill}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (template === "professional") {
    return (
      <div className="w-full space-y-12 pb-20 font-sans">
        <div className="border-l-4 border-primary pl-6">
          <h1 className="text-5xl font-bold mb-2">{profile.name}</h1>
          <p className="text-lg text-primary font-semibold mb-3">
            {profile.headline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {profile.location && <span>{profile.location}</span>}
            {profile.email && <span>{profile.email}</span>}
            {profile.link && (
              <a
                href={
                  profile.link.startsWith("http")
                    ? profile.link
                    : `https://${profile.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                {profile.link}
              </a>
            )}
          </div>
        </div>

        {profile.bio && (
          <section className="p-6 bg-card rounded-lg border border-border">
            <h2 className="font-bold text-lg mb-3 text-primary">
              {t("professionalSummary", lang)}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          </section>
        )}

        {cv.work && cv.work.length > 0 && (
          <section>
            <h2 className="font-bold text-lg mb-4 text-primary border-b-2 border-primary pb-2">
              {t("workExperience", lang)}
            </h2>
            <div className="space-y-4">
              {cv.work.map((job: WorkExperience, idx: number) => {
                const isExpanded = expandedJobs[idx] ?? true;
                return (
                  <div
                    key={idx}
                    className="p-4 border-l-4 border-primary pl-4 bg-card/30 rounded"
                  >
                    <div
                      className="flex justify-between items-start mb-1 cursor-pointer group"
                      onClick={() => toggleJobExpanded(idx)}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {job.company}
                        </h3>
                        <ChevronRightOutlinedIcon
                          fontSize="small"
                          className={`text-foreground transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </div>
                      {job.duration && (
                        <span className="text-xs text-muted-foreground">
                          {job.duration}
                        </span>
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-sm text-foreground font-medium mb-1">
                        {job.title || job.position}
                      </p>
                      {job.description && (
                        <p className="text-xs text-muted-foreground">
                          {job.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {cv.education && cv.education.length > 0 && (
          <section>
            <h2 className="font-bold text-lg mb-4 text-primary border-b-2 border-primary pb-2">
              {t("education", lang)}
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu: Education, idx: number) => (
                <div
                  key={idx}
                  className="p-4 border-l-4 border-primary pl-4 bg-card/30 rounded"
                >
                  <h3 className="font-bold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.school || edu.institution}
                  </p>
                  {edu.year && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.year}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-bold text-lg mb-4 text-primary border-b-2 border-primary pb-2">
            {t("featuredProjects", lang)}
          </h2>
          <div className="space-y-4">
            {repos.slice(0, 3).map((repo: Repository) => (
              <div
                key={repo.name}
                className="p-4 border border-border rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {repo.lang}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {repo.desc || repo.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {filteredSkills.length > 0 && (
          <section>
            <h2 className="font-bold text-lg mb-4 text-primary border-b-2 border-primary pb-2">
              {t("coreCompetencies", lang)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredSkills.slice(0, 9).map((skill: string) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // creative template
  return (
    <div className="w-full space-y-16 pb-20 font-sans">
      <section className="text-center">
        <div className="inline-block mb-6">
          <Image
            src={`https://github.com/${username}.png`}
            alt="avatar"
            width={128}
            height={128}
            className="w-32 h-32 rounded-2xl border-4 border-primary shadow-lg"
          />
        </div>
        <h1 className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/50 mb-2">
          {profile.name}
        </h1>
        <p className="text-2xl font-bold text-foreground mb-2">
          {profile.headline}
        </p>
        <p className="max-w-xl mx-auto text-muted-foreground text-sm leading-relaxed">
          {profile.bio}
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-muted-foreground font-mono">
          {profile.location && (
            <span className="flex items-center gap-1.5">
              <LocationOnOutlinedIcon fontSize="inherit" /> {profile.location}
            </span>
          )}
          {profile.email && (
            <span className="flex items-center gap-1.5">
              <EmailOutlinedIcon fontSize="inherit" /> {profile.email}
            </span>
          )}
          {profile.link && (
            <a
              href={
                profile.link.startsWith("http")
                  ? profile.link
                  : `https://${profile.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <LinkIcon fontSize="inherit" /> {profile.link}
            </a>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-primary/5 border-2 border-primary text-center">
          <h3 className="font-bold text-3xl text-primary mb-1">
            {repos.length}
          </h3>
          <p className="text-sm text-muted-foreground">{t("projects", lang)}</p>
        </div>
        <div className="p-6 rounded-2xl bg-primary/5 border-2 border-primary text-center">
          <h3 className="font-bold text-3xl text-primary mb-1">
            {filteredSkills.length}
          </h3>
          <p className="text-sm text-muted-foreground">{t("skills", lang)}</p>
        </div>
        <div className="p-6 rounded-2xl bg-primary/5 border-2 border-primary text-center">
          <h3 className="font-bold text-3xl text-primary mb-1">
            <AllInclusiveIcon fontSize="medium" />
          </h3>
          <p className="text-sm text-muted-foreground">{t("passion", lang)}</p>
        </div>
      </div>

      {cv.work && cv.work.length > 0 && (
        <section>
          <h2 className="text-3xl font-black mb-8 text-center">
            {t("experience", lang)}
          </h2>
          <div className="space-y-4">
            {cv.work.map((job: WorkExperience, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-xl border-2 border-primary/30 bg-linear-to-r from-primary/5 to-transparent"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-primary">
                    {job.title || job.position}
                  </h3>
                  {job.duration && (
                    <span className="text-xs text-muted-foreground">
                      {job.duration}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-semibold mb-2">
                  {job.company}
                </p>
                {job.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {cv.education && cv.education.length > 0 && (
        <section>
          <h2 className="text-3xl font-black mb-8 text-center">
            {t("education", lang)}
          </h2>
          <div className="space-y-4">
            {cv.education.map((edu: Education, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-xl border-2 border-primary/30 bg-linear-to-r from-primary/5 to-transparent text-center"
              >
                <h3 className="font-bold text-lg text-primary mb-1">
                  {edu.degree}
                </h3>
                <p className="text-sm text-muted-foreground font-semibold">
                  {edu.school || edu.institution}
                </p>
                {edu.year && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {edu.year}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-black mb-8 text-center">
          {t("featuredWork", lang)}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {repos.slice(0, 4).map((repo: Repository) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className="h-32 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-all overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-primary/10 group-hover:to-primary/20 transition-colors" />
                <div className="relative text-center z-10">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {repo.lang}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {filteredSkills.length > 0 && (
        <section>
          <h2 className="text-3xl font-black mb-8 text-center">
            {t("expertise", lang)}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {filteredSkills.slice(0, 15).map((skill: string) => (
              <div
                key={skill}
                className="px-6 py-3 rounded-full bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 font-semibold text-sm hover:border-primary transition-all"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
