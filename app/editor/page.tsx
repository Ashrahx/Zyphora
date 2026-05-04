"use client";

import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import {
  getCurrentUserPortfolio,
  updatePortfolioDetails,
  updatePortfolioFromCV,
  extractCVDataWithGemini,
  logOut,
} from "@/app/actions";
import {
  Repository,
  WorkExperience,
  Education,
  CVData,
  Profile,
} from "@/lib/types";
import { t, Lang } from "@/lib/i18n";
import { Iphone } from "@/components/ui/iphone";
import { Badge } from "@/components/ui/badge";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkIcon from "@mui/icons-material/Link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import StarIcon from "@mui/icons-material/Star";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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

export default function PreviewPage() {
  const [isPending, startTransition] = useTransition();
  const [isExtracting, setIsExtracting] = useState(false);
  const [username, setUsername] = useState("identicons/pedro");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [templateId, setTemplateId] = useState<string>("minimal");
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<
    "profile" | "repos" | "import" | "deploys"
  >("profile");
  const [panelOpen, setPanelOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [deployHistory, setDeployHistory] = useState<
    Array<{ template_id: string; deployed_at: string }>
  >([]);

  const toggleJobExpanded = (jobIndex: number) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobIndex]: !prev[jobIndex],
    }));
  };

  const [cvData, setCvData] = useState<CVData>({
    work: [],
    education: [],
    skills: [],
  });

  const [profile, setProfile] = useState<Profile>({
    name: "Pedro Emiliano García Oñate",
    headline: "Ingeniero de Software & Desarrollador Backend",
    bio: "Desarrollador enfocado en automatización industrial, simulaciones físicas y ecosistemas API de alto rendimiento. Especializado en sistemas de control dinámico.",
    email: "pedro.garcia@dev.io",
    link: "github.com/Ashrahx",
    location: "Torreón, MX",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await getCurrentUserPortfolio();

      if (data) {
        const actualUsername = data.github_username || "identicons/pedro";
        setUsername(actualUsername);
        setRepos((data.selected_repos || []) as Repository[]);
        setCvData({
          work: (data.work_experience || []) as WorkExperience[],
          education: (data.education || []) as Education[],
          skills: data.skills || [],
        });

        if (data.template_id) {
          setTemplateId(data.template_id);
        }

        if (data.deploy_history) {
          setDeployHistory(
            data.deploy_history as Array<{
              template_id: string;
              deployed_at: string;
            }>,
          );
        }

        setProfile((prev) => ({
          name: data.display_name || prev.name,
          headline: data.headline || prev.headline,
          bio: data.bio || prev.bio,
          email: data.email || prev.email,
          link: data.link || `github.com/${actualUsername}`,
          location: data.location || prev.location,
        }));
      }

      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (
        savedTemplate &&
        ["minimal", "modern", "professional", "creative"].includes(
          savedTemplate,
        )
      ) {
        setTemplateId(savedTemplate);
        localStorage.removeItem("selectedTemplate");
        toast.success(`Plantilla ${savedTemplate} aplicada`, {
          position: "top-center",
        });

        try {
          await updatePortfolioDetails(profile, savedTemplate);
        } catch (error) {
          console.error("Error guardando template:", error);
        }
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = (reader.result as string).split(",")[1];

      startTransition(async () => {
        try {
          const extractedData = await extractCVDataWithGemini(
            base64String,
            file.type,
          );
          await updatePortfolioFromCV(extractedData);
          toast.success("¡Currículum procesado con magia de IA exitosamente!", {
            position: "top-center",
          });
          window.location.reload();
        } catch (error) {
          toast.error("Error procesando el CV. Intenta con otro archivo.", {
            position: "top-center",
          });
          console.error(error);
        } finally {
          setIsExtracting(false);
        }
      });
    };
  };

  const handleLogout = async () => {
    await logOut();
  };

  const softSkillsFilters = [
    "proactividad",
    "liderazgo",
    "equipo",
    "comunicacion",
    "teamwork",
    "leadership",
    "adaptabilidad",
    "responsabilidad",
    "resolucion de problemas",
    "problem solving",
    "pensamiento critico",
    "critical thinking",
    "creatividad",
    "creativity",
    "gestion del tiempo",
    "time management",
    "trabajo en equipo",
    "colaboracion",
    "collaboration",
    "flexibilidad",
    "empatia",
    "empathy",
    "iniciativa",
    "automotivacion",
    "self motivation",
    "paciencia",
    "persistencia",
    "orientacion a resultados",
    "results oriented",
    "confiabilidad",
    "reliability",
    "honestidad",
    "honesty",
    "integridad",
    "integrity",
    "profesionalismo",
    "professionalism",
    "multitarea",
    "multitasking",
    "delegation",
    "delegacion",
    "mentoring",
    "mentoría",
    "coaching",
    "negociacion",
    "negotiation",
    "presentacion",
    "presentation",
    "escritura",
    "writing",
    "lectura",
    "reading",
    "escucha activa",
    "active listening",
    "networking",
    "gestion de conflictos",
    "conflict management",
    "toma de decisiones",
    "decision making",
    "analisis",
    "analysis",
    "planificacion",
    "planning",
    "organizacion",
  ];
  const filteredSkills = (cvData.skills || []).filter(
    (skill: string) =>
      !softSkillsFilters.some((soft) => skill.toLowerCase().includes(soft)),
  );

  const handleExportHTML = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    let templateHTML = "";

    if (templateId === "minimal") {
      templateHTML = `
        <div class="mb-16 border-b pb-8">
          <div class="flex gap-6 items-start mb-8">
            <img src="https://github.com/${username}.png" alt="avatar" class="w-24 h-24 rounded-full border-2 object-cover" />
            <div>
              <h1 class="text-5xl font-bold mb-2">${profile.name}</h1>
              <p class="text-lg opacity-70 mb-4">${profile.headline}</p>
              <div class="flex flex-wrap gap-4 text-sm">
                ${profile.location ? `<div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i><span>${profile.location}</span></div>` : ""}
                ${profile.email ? `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i><span>${profile.email}</span></div>` : ""}
                ${profile.link ? `<div class="flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4"></i><a href="${profile.link.startsWith("http") ? profile.link : "https://" + profile.link}" target="_blank" class="hover:underline">${profile.link}</a></div>` : ""}
              </div>
            </div>
          </div>
          ${profile.bio ? `<p class="text-base leading-relaxed">${profile.bio}</p>` : ""}
        </div>
        ${cvData.work && cvData.work.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="briefcase" class="w-6 h-6"></i><h2 class="text-2xl font-bold">${t("workExperience", lang)}</h2></div><div class="space-y-4">${cvData.work.map((job: WorkExperience) => `<div class="border-l-4 pl-4 pb-4"><div class="flex justify-between items-start mb-1"><h3 class="font-bold">${job.title || job.position}</h3>${job.duration ? `<span class="text-sm opacity-60">${job.duration}</span>` : ""}</div><p class="text-sm opacity-70">${job.company}</p>${job.description ? `<p class="text-sm mt-2 opacity-70">${job.description}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${cvData.education && cvData.education.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="graduation-cap" class="w-6 h-6"></i><h2 class="text-2xl font-bold">${t("education", lang)}</h2></div><div class="space-y-4">${cvData.education.map((edu: Education) => `<div class="border-l-4 pl-4"><h3 class="font-bold">${edu.degree}</h3><p class="text-sm opacity-70">${edu.school || edu.institution}</p>${edu.year ? `<p class="text-sm opacity-60 mt-1">${edu.year}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${
          repos.length > 0
            ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="code" class="w-6 h-6"></i><h2 class="text-2xl font-bold">${t("featuredProjects", lang)}</h2></div><div class="space-y-3">${repos
                .slice(0, 5)
                .map(
                  (repo: Repository) =>
                    `<div class="p-4 border rounded"><a href="${repo.url}" target="_blank" class="font-bold hover:underline">${repo.name}</a>${repo.lang ? `<p class="text-xs opacity-60 mt-1">${repo.lang}</p>` : ""}${repo.description ? `<p class="text-sm opacity-70 mt-1">${repo.description}</p>` : ""}</div>`,
                )
                .join("")}</div></div>`
            : ""
        }
        ${
          filteredSkills.length > 0
            ? `<div><div class="flex items-center gap-2 mb-6"><i data-lucide="zap" class="w-6 h-6"></i><h2 class="text-2xl font-bold">${t("skills", lang)}</h2></div><div class="flex flex-wrap gap-2">${filteredSkills
                .slice(0, 20)
                .map(
                  (skill: string) =>
                    `<span class="px-3 py-1 bg-opacity-10 rounded-full text-sm">${skill}</span>`,
                )
                .join("")}</div></div>`
            : ""
        }
      `;
    } else if (templateId === "professional") {
      templateHTML = `
        <div class="mb-16 border-l-4 pl-6">
          <h1 class="text-4xl font-bold mb-2">${profile.name}</h1>
          <p class="text-xl opacity-70 font-semibold mb-4">${profile.headline}</p>
          <div class="flex flex-col gap-3 text-sm mb-4">
            ${profile.location ? `<div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i><span>${profile.location}</span></div>` : ""}
            ${profile.email ? `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i><span>${profile.email}</span></div>` : ""}
            ${profile.link ? `<div class="flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4"></i><a href="${profile.link.startsWith("http") ? profile.link : "https://" + profile.link}" target="_blank" class="hover:underline">${profile.link}</a></div>` : ""}
          </div>
          ${profile.bio ? `<p class="text-base leading-relaxed mt-6">${profile.bio}</p>` : ""}
        </div>
        ${cvData.work && cvData.work.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="briefcase" class="w-6 h-6"></i><h2 class="text-2xl font-bold border-b-2 pb-2 flex-1">${t("experience", lang)}</h2></div><div class="space-y-6">${cvData.work.map((job: WorkExperience) => `<div><div class="flex justify-between mb-1"><h3 class="font-bold text-lg">${job.title || job.position}</h3>${job.duration ? `<span class="text-sm opacity-60">${job.duration}</span>` : ""}</div><p class="text-sm font-semibold opacity-70 mb-2">${job.company}</p>${job.description ? `<p class="text-sm opacity-70 leading-relaxed">${job.description}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${cvData.education && cvData.education.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="graduation-cap" class="w-6 h-6"></i><h2 class="text-2xl font-bold border-b-2 pb-2 flex-1">${t("education", lang)}</h2></div><div class="space-y-4">${cvData.education.map((edu: Education) => `<div><h3 class="font-bold">${edu.degree}</h3><p class="text-sm opacity-70">${edu.school || edu.institution}</p>${edu.year ? `<p class="text-xs opacity-60 mt-1">${edu.year}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${
          repos.length > 0
            ? `<div class="mb-16"><div class="flex items-center gap-2 mb-6"><i data-lucide="code" class="w-6 h-6"></i><h2 class="text-2xl font-bold border-b-2 pb-2 flex-1">${t("featuredProjects", lang)}</h2></div><div class="space-y-3">${repos
                .slice(0, 5)
                .map(
                  (repo: Repository) =>
                    `<div class="p-4 border-l-4 pl-4"><a href="${repo.url}" target="_blank" class="font-bold hover:underline">${repo.name}</a>${repo.lang ? `<p class="text-xs opacity-60 mt-1">${repo.lang}</p>` : ""}${repo.description ? `<p class="text-sm opacity-70 mt-1">${repo.description}</p>` : ""}</div>`,
                )
                .join("")}</div></div>`
            : ""
        }
        ${
          filteredSkills.length > 0
            ? `<div><div class="flex items-center gap-2 mb-6"><i data-lucide="zap" class="w-6 h-6"></i><h2 class="text-2xl font-bold border-b-2 pb-2 flex-1">${t("coreCompetencies", lang)}</h2></div><div class="grid grid-cols-3 gap-3">${filteredSkills
                .slice(0, 9)
                .map(
                  (skill: string) =>
                    `<div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full"></span><span class="text-sm">${skill}</span></div>`,
                )
                .join("")}</div></div>`
            : ""
        }
      `;
    } else if (templateId === "modern") {
      templateHTML = `
        <div class="mb-16 p-8 rounded-2xl bg-opacity-5">
          <div class="flex gap-8 items-start">
            <img src="https://github.com/${username}.png" alt="avatar" class="w-28 h-28 rounded-2xl border-2 object-cover" />
            <div class="flex-1">
              <h1 class="text-5xl font-bold mb-3">${profile.name}</h1>
              <p class="text-xl opacity-70 font-semibold mb-4">${profile.headline}</p>
              ${profile.bio ? `<p class="text-base opacity-70 mb-6">${profile.bio}</p>` : ""}
              <div class="flex flex-col gap-3 text-sm">
                ${profile.location ? `<div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i><span>${profile.location}</span></div>` : ""}
                ${profile.email ? `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i><span>${profile.email}</span></div>` : ""}
                ${profile.link ? `<div class="flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4"></i><a href="${profile.link.startsWith("http") ? profile.link : "https://" + profile.link}" target="_blank" class="hover:underline">${profile.link}</a></div>` : ""}
              </div>
            </div>
          </div>
        </div>
        ${cvData.work && cvData.work.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-8"><i data-lucide="briefcase" class="w-6 h-6"></i><h2 class="text-3xl font-bold">${t("workExperience", lang)}</h2></div><div class="space-y-4">${cvData.work.map((job: WorkExperience) => `<div class="p-6 rounded-xl border border-opacity-20 backdrop-blur"><div class="flex justify-between mb-2"><h3 class="font-bold text-lg">${job.title || job.position}</h3>${job.duration ? `<span class="text-sm opacity-60">${job.duration}</span>` : ""}</div><p class="text-sm font-semibold opacity-70 mb-3">${job.company}</p>${job.description ? `<p class="text-sm opacity-70 leading-relaxed">${job.description}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${cvData.education && cvData.education.length > 0 ? `<div class="mb-16"><div class="flex items-center gap-2 mb-8"><i data-lucide="graduation-cap" class="w-6 h-6"></i><h2 class="text-3xl font-bold">${t("education", lang)}</h2></div><div class="space-y-4">${cvData.education.map((edu: Education) => `<div class="p-6 rounded-xl border border-opacity-20 backdrop-blur"><h3 class="font-bold text-lg">${edu.degree}</h3><p class="text-sm opacity-70">${edu.school || edu.institution}</p>${edu.year ? `<p class="text-xs opacity-60 mt-2">${edu.year}</p>` : ""}</div>`).join("")}</div></div>` : ""}
        ${
          repos.length > 0
            ? `<div class="mb-16"><div class="flex items-center gap-2 mb-8"><i data-lucide="code" class="w-6 h-6"></i><h2 class="text-3xl font-bold">${t("featuredWork", lang)}</h2></div><div class="grid grid-cols-2 gap-6">${repos
                .slice(0, 4)
                .map(
                  (repo: Repository) =>
                    `<a href="${repo.url}" target="_blank"><div class="p-6 rounded-2xl border border-opacity-20 backdrop-blur h-full hover:bg-opacity-10 transition-colors"><h3 class="font-bold text-lg mb-1">${repo.name}</h3>${repo.lang ? `<p class="text-xs opacity-60 mb-2">${repo.lang}</p>` : ""}${repo.description ? `<p class="text-sm opacity-70">${repo.description}</p>` : ""}</div></a>`,
                )
                .join("")}</div></div>`
            : ""
        }
        ${
          filteredSkills.length > 0
            ? `<div><div class="flex items-center gap-2 mb-8"><i data-lucide="zap" class="w-6 h-6"></i><h2 class="text-3xl font-bold">${t("skills", lang)}</h2></div><div class="flex flex-wrap gap-3">${filteredSkills
                .slice(0, 15)
                .map(
                  (skill: string) =>
                    `<div class="px-4 py-2 rounded-full border border-opacity-30 text-sm">${skill}</div>`,
                )
                .join("")}</div></div>`
            : ""
        }
      `;
    } else {
      templateHTML = `
        <section class="text-center mb-16">
          <div class="inline-block mb-6">
            <img src="https://github.com/${username}.png" alt="avatar" class="w-32 h-32 rounded-2xl border-4 object-cover" />
          </div>
          <h1 class="text-6xl font-black mb-2">${profile.name}</h1>
          <p class="text-2xl font-bold mb-4">${profile.headline}</p>
          ${profile.bio ? `<p class="max-w-2xl mx-auto text-base opacity-70 leading-relaxed">${profile.bio}</p>` : ""}
          <div class="flex flex-col items-center gap-3 mt-6 text-sm">
            ${profile.location ? `<div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-5 h-5"></i><span>${profile.location}</span></div>` : ""}
            ${profile.email ? `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-5 h-5"></i><span>${profile.email}</span></div>` : ""}
            ${profile.link ? `<div class="flex items-center gap-2"><i data-lucide="globe" class="w-5 h-5"></i><a href="${profile.link.startsWith("http") ? profile.link : "https://" + profile.link}" target="_blank" class="hover:underline">${profile.link}</a></div>` : ""}
          </div>
        </section>
        <div class="grid grid-cols-3 gap-4 mb-16">
          <div class="p-6 rounded-2xl border-2 text-center"><i data-lucide="folder-open" class="w-8 h-8 mx-auto mb-2"></i><h3 class="font-bold text-3xl mb-1">${repos.length}</h3><p class="text-sm opacity-70">${t("projects", lang)}</p></div>
          <div class="p-6 rounded-2xl border-2 text-center"><i data-lucide="zap" class="w-8 h-8 mx-auto mb-2"></i><h3 class="font-bold text-3xl mb-1">${filteredSkills.length}</h3><p class="text-sm opacity-70">${t("skills", lang)}</p></div>
          <div class="p-6 rounded-2xl border-2 text-center"><i data-lucide="heart" class="w-8 h-8 mx-auto mb-2"></i><h3 class="font-bold text-3xl mb-1">∞</h3><p class="text-sm opacity-70">${t("passion", lang)}</p></div>
        </div>
        ${cvData.work && cvData.work.length > 0 ? `<section class="mb-16"><div class="flex justify-center gap-2 mb-8"><i data-lucide="briefcase" class="w-7 h-7"></i><h2 class="text-3xl font-black">${t("experience", lang)}</h2></div><div class="space-y-4">${cvData.work.map((job: WorkExperience) => `<div class="p-6 rounded-xl border-2 bg-opacity-5"><div class="flex justify-between items-start mb-2"><h3 class="font-bold text-lg">${job.title || job.position}</h3>${job.duration ? `<span class="text-xs opacity-60">${job.duration}</span>` : ""}</div><p class="text-sm font-semibold opacity-70 mb-2">${job.company}</p>${job.description ? `<p class="text-xs opacity-70 leading-relaxed">${job.description}</p>` : ""}</div>`).join("")}</div></section>` : ""}
        ${cvData.education && cvData.education.length > 0 ? `<section class="mb-16"><div class="flex justify-center gap-2 mb-8"><i data-lucide="graduation-cap" class="w-7 h-7"></i><h2 class="text-3xl font-black">${t("education", lang)}</h2></div><div class="space-y-4">${cvData.education.map((edu: Education) => `<div class="p-6 rounded-xl border-2 bg-opacity-5 text-center"><h3 class="font-bold text-lg mb-1">${edu.degree}</h3><p class="text-sm font-semibold opacity-70">${edu.school || edu.institution}</p>${edu.year ? `<p class="text-xs opacity-60 mt-2">${edu.year}</p>` : ""}</div>`).join("")}</div></section>` : ""}
        ${
          repos.length > 0
            ? `<section class="mb-16"><div class="flex justify-center gap-2 mb-8"><i data-lucide="code" class="w-7 h-7"></i><h2 class="text-3xl font-black">${t("featuredWork", lang)}</h2></div><div class="grid grid-cols-2 gap-6">${repos
                .slice(0, 4)
                .map(
                  (repo: Repository) =>
                    `<a href="${repo.url}" target="_blank"><div class="h-32 rounded-2xl border-2 flex items-center justify-center overflow-hidden relative"><div class="relative text-center z-10"><h3 class="font-bold text-lg">${repo.name}</h3><p class="text-xs opacity-60 mt-1">${repo.lang || ""}</p></div></div></a>`,
                )
                .join("")}</div></section>`
            : ""
        }
        ${
          filteredSkills.length > 0
            ? `<section><div class="flex justify-center gap-2 mb-8"><i data-lucide="sparkles" class="w-7 h-7"></i><h2 class="text-3xl font-black">${t("expertise", lang)}</h2></div><div class="flex flex-wrap justify-center gap-3">${filteredSkills
                .slice(0, 15)
                .map(
                  (skill: string) =>
                    `<div class="px-6 py-3 rounded-full border-2 font-semibold text-sm">${skill}</div>`,
                )
                .join("")}</div></section>`
            : ""
        }
      `;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="${lang}" class="${isDarkMode ? "dark" : ""}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"><\/script>
  <style>
    :root { color-scheme: ${isDarkMode ? "dark" : "light"}; }
    body { background: ${isDarkMode ? "#0a0a0a" : "#ffffff"}; color: ${isDarkMode ? "#fafafa" : "#0a0a0a"}; transition: background 0.2s, color 0.2s; }
    #theme-btn { position:fixed; bottom:1rem; right:1rem; z-index:9999; padding:0.5rem 1rem; border:1px solid #666; border-radius:0.5rem; background:rgba(128,128,128,0.15); cursor:pointer; font-size:0.75rem; font-weight:700; backdrop-filter:blur(4px); }
    #theme-btn:hover { background:rgba(128,128,128,0.3); }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
    });
    function toggleTheme() {
      var isDark = document.documentElement.classList.toggle('dark');
      document.body.style.background = isDark ? '#0a0a0a' : '#ffffff';
      document.body.style.color = isDark ? '#fafafa' : '#0a0a0a';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    (function(){
      var s = localStorage.getItem('theme');
      if (s === 'dark') { document.documentElement.classList.add('dark'); document.body.style.background='#0a0a0a'; document.body.style.color='#fafafa'; }
      else if (s === 'light') { document.documentElement.classList.remove('dark'); }
    })();
  <\/script>
</head>
<body>
  <button id="theme-btn" onclick="toggleTheme()">${t("toggleTheme", lang)}</button>
  <div class="max-w-4xl mx-auto px-5 py-16">
    ${templateHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePublish = () => {
    startTransition(async () => {
      try {
        await updatePortfolioDetails(profile, templateId);

        setDeployHistory((prev) => {
          const existing = prev.findIndex((d) => d.template_id === templateId);
          const entry = {
            template_id: templateId,
            deployed_at: new Date().toISOString(),
          };
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = entry;
            return updated;
          }
          return [...prev, entry];
        });

        toast.success(t("published", lang), {
          position: "top-center",
        });
        setActiveTab("deploys");
      } catch {
        toast.error(t("publishError", lang), {
          position: "top-center",
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden">
      <div
        className={`${panelOpen ? "fixed inset-0 z-40 lg:static lg:z-20" : "hidden lg:block"} lg:w-110 border-r border-border bg-card/80 backdrop-blur-lg lg:backdrop-blur-none flex flex-col h-full`}
      >
        <div className="border-b border-border bg-background/50 p-4 lg:p-6 space-y-4">
          <div className="flex items-center justify-between lg:justify-start gap-3">
            <h2 className="text-sm lg:text-base font-bold uppercase tracking-wider">
              Editor
            </h2>
            <button
              onClick={() => setPanelOpen(false)}
              className="lg:hidden p-1.5 hover:bg-muted rounded-md transition-colors"
              aria-label="Cerrar panel"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-1 bg-background/50 rounded-lg p-1 border border-border/50">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "profile"
                  ? "bg-primary text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("profile", lang)}
            </button>
            <button
              onClick={() => setActiveTab("repos")}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "repos"
                  ? "bg-primary text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("repos", lang)}
            </button>
            <button
              onClick={() => setActiveTab("import")}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "import"
                  ? "bg-primary text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("import", lang)}
            </button>
            <button
              onClick={() => setActiveTab("deploys")}
              className={`flex-1 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "deploys"
                  ? "bg-primary text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("deploys", lang)}
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6 pb-8">
            {activeTab === "profile" && (
              <>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                    {t("personalInfo", lang)}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("displayName", lang)}
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("headline", lang)}
                      </label>
                      <input
                        type="text"
                        value={profile.headline}
                        onChange={(e) =>
                          setProfile({ ...profile, headline: e.target.value })
                        }
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("bio", lang)}
                      </label>
                      <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition-colors"
                      />
                    </div>
                  </div>
                </section>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                    Contact Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("email", lang)}
                      </label>
                      <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div className="px-3 text-muted-foreground flex items-center">
                          <EmailOutlinedIcon fontSize="small" />
                        </div>
                        <input
                          type="text"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("link", lang)}
                      </label>
                      <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div className="px-3 text-muted-foreground flex items-center">
                          <LinkIcon fontSize="small" />
                        </div>
                        <input
                          type="text"
                          value={profile.link}
                          onChange={(e) =>
                            setProfile({ ...profile, link: e.target.value })
                          }
                          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block font-mono">
                        {t("location", lang)}
                      </label>
                      <div className="flex items-center bg-background border border-border rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <div className="px-3 text-muted-foreground flex items-center">
                          <LocationOnOutlinedIcon fontSize="small" />
                        </div>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "repos" && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  {t("selectedRepos", lang)} ({repos.length})
                </h3>
                {repos.length === 0 ? (
                  <div className="p-4 rounded-lg border border-dashed border-border text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("noRepos", lang)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
                    {repos.map((repo: Repository, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-xs text-primary hover:underline truncate"
                          >
                            {repo.name}
                          </a>
                          {(repo.stargazerCount ?? 0) > 0 && (
                            <span className="text-[10px] font-semibold text-yellow-500 flex items-center gap-1 whitespace-nowrap">
                              <StarIcon sx={{ fontSize: 10 }} />{" "}
                              {repo.stargazerCount}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                          {repo.description || "No description"}
                        </p>
                        {repo.lang && (
                          <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded">
                            {repo.lang}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "import" && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("import", lang)}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {t("importCV", lang)}
                </p>
                <label
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 ${
                    isExtracting
                      ? "border-primary bg-primary/5"
                      : "border-dashed border-border"
                  } rounded-xl cursor-pointer hover:bg-muted/50 transition-all relative overflow-hidden group`}
                >
                  {isExtracting ? (
                    <div className="flex flex-col items-center text-primary">
                      <CircularProgress
                        size={32}
                        color="inherit"
                        className="mb-3"
                      />
                      <span className="text-xs font-semibold animate-pulse">
                        {t("processing", lang)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <CloudUploadOutlinedIcon
                        fontSize="large"
                        className="text-muted-foreground mb-3 group-hover:text-primary transition-colors"
                      />
                      <span className="text-sm font-semibold text-foreground">
                        {t("dragOrClick", lang)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {t("supportedFormats", lang)}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf"
                        disabled={isExtracting}
                      />
                    </>
                  )}
                </label>
                <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
                  {t("supportedFormats", lang)}
                </p>
              </section>
            )}

            {activeTab === "deploys" && (
              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <RocketLaunchOutlinedIcon
                    sx={{ fontSize: 12 }}
                    className="text-violet-400"
                  />
                  {t("liveDeployments", lang)}
                </h3>

                {deployHistory.length > 0 ? (
                  <div className="space-y-2">
                    {deployHistory
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.deployed_at).getTime() -
                          new Date(a.deployed_at).getTime(),
                      )
                      .map((deploy) => {
                        const deployUrl =
                          typeof window !== "undefined"
                            ? `${window.location.origin}/${username}?t=${deploy.template_id}&lang=${lang}`
                            : `/${username}?t=${deploy.template_id}&lang=${lang}`;
                        const isActive = deploy.template_id === templateId;
                        return (
                          <div
                            key={deploy.template_id}
                            className={`p-3 rounded-xl border transition-colors ${isActive ? "border-violet-400/40 bg-violet-500/5" : "border-border bg-background"}`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground capitalize">
                                  {deploy.template_id}
                                </span>
                                {isActive && (
                                  <span className="px-1.5 py-0.5 bg-violet-500/15 text-violet-400 text-[9px] font-bold uppercase rounded-full">
                                    activo
                                  </span>
                                )}
                              </div>
                              <span className="text-[9px] text-muted-foreground">
                                {new Date(deploy.deployed_at).toLocaleString(
                                  "es-MX",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => window.open(deployUrl, "_blank")}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-violet-500/15 text-violet-400 text-xs font-semibold rounded-lg hover:bg-violet-500/25 transition-colors"
                              >
                                <OpenInNewOutlinedIcon sx={{ fontSize: 11 }} />
                                {t("viewLive", lang)}
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(deployUrl);
                                  toast.success(t("linkCopied", lang), {
                                    position: "top-center",
                                  });
                                }}
                                title={t("copyLink", lang)}
                                className="flex items-center justify-center px-3 py-1.5 border border-border bg-background text-xs rounded-lg hover:bg-muted transition-colors"
                              >
                                <ContentCopyOutlinedIcon
                                  sx={{ fontSize: 11 }}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="p-6 rounded-lg border border-dashed border-border text-center space-y-2">
                    <RocketLaunchOutlinedIcon className="text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      {t("noDeployments", lang)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("noDeploymentsHint", lang)}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>

      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-6 lg:hidden z-30 w-12 h-12 rounded-full bg-primary text-background shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center font-bold text-lg"
          aria-label="Abrir panel de edición"
        >
          <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
        </button>
      )}

      {panelOpen && (
        <div
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className="flex-1 bg-secondary/5 flex flex-col relative h-screen overflow-hidden">
        <div className="h-14 border-b border-border/50 bg-card/80 flex justify-between items-center px-6 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 bg-background/50 border border-border p-1 rounded-md">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`p-1.5 rounded transition-all duration-200 ${previewMode === "desktop" ? "bg-card shadow-sm text-foreground scale-105" : "text-muted-foreground hover:text-foreground"}`}
              >
                <DesktopMacOutlinedIcon fontSize="small" />
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`p-1.5 rounded transition-all duration-200 ${previewMode === "mobile" ? "bg-card shadow-sm text-foreground scale-105" : "text-muted-foreground hover:text-foreground"}`}
              >
                <PhoneIphoneOutlinedIcon fontSize="small" />
              </button>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-bold uppercase bg-background border border-border rounded-md text-foreground hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
            >
              <option value="minimal">{t("tmplMinimal", lang)}</option>
              <option value="modern">{t("tmplModern", lang)}</option>
              <option value="professional">
                {t("tmplProfessional", lang)}
              </option>
              <option value="creative">{t("tmplCreative", lang)}</option>
            </select>
            <div className="w-px h-6 bg-border/50" />
            <AnimatedThemeToggler />
            <button
              onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
              className="px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md cursor-pointer"
              title={t("toggleLang", lang)}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportHTML}
              className="items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md hidden sm:flex"
            >
              <DownloadOutlinedIcon fontSize="small" /> {t("exportHTML", lang)}
            </button>
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-1.5 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold uppercase rounded-md disabled:opacity-50"
            >
              <PublishOutlinedIcon fontSize="small" />{" "}
              {isPending ? t("saving", lang) : t("deploy", lang)}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background hover:bg-muted text-xs font-bold uppercase text-muted-foreground rounded-md"
            >
              <LogoutOutlinedIcon fontSize="small" /> {t("signOut", lang)}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center items-start">
          {previewMode === "mobile" ? (
            <div className="relative w-85 md:w-95 shrink-0 animate-in zoom-in-95 duration-500 mx-auto mt-4">
              <Iphone className="w-full h-auto drop-shadow-2xl pointer-events-none" />
              <div
                className="absolute z-10 overflow-hidden bg-background"
                style={{
                  top: "2.4%",
                  bottom: "2.4%",
                  left: "5.5%",
                  right: "5.5%",
                  borderRadius: "2.5rem",
                }}
              >
                <div className="w-full h-full overflow-y-auto px-5 pt-12 pb-8 [&::-webkit-scrollbar]:hidden">
                  <PortfolioContent
                    profile={profile}
                    repos={repos}
                    cv={cvData}
                    username={username}
                    isMobile={true}
                    template={templateId}
                    expandedJobs={expandedJobs}
                    toggleJobExpanded={toggleJobExpanded}
                    filteredSkills={filteredSkills}
                    lang={lang}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500 origin-top bg-background p-10 rounded-2xl border border-border shadow-sm">
              <PortfolioContent
                profile={profile}
                repos={repos}
                cv={cvData}
                username={username}
                isMobile={false}
                template={templateId}
                expandedJobs={expandedJobs}
                toggleJobExpanded={toggleJobExpanded}
                filteredSkills={filteredSkills}
                lang={lang}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PortfolioContent({
  profile,
  repos,
  cv,
  username,
  isMobile,
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
  isMobile: boolean;
  template: string;
  expandedJobs: Record<string, boolean>;
  toggleJobExpanded: (idx: number) => void;
  filteredSkills: string[];
  lang?: Lang;
}) {
  if (template === "minimal") {
    return (
      <div
        className={`w-full ${isMobile ? "space-y-8 pb-10" : "space-y-12 pb-20"} font-sans`}
      >
        <section
          className={`flex ${isMobile ? "flex-row gap-3 items-start" : "flex-col-reverse sm:flex-row items-start justify-between gap-6"}`}
        >
          <div
            className={`${isMobile ? "h-16 w-16" : "h-24 w-24"} shrink-0 rounded-full border border-border overflow-hidden bg-muted`}
          >
            <Image
              src={`https://github.com/${username}.png`}
              alt="avatar"
              width={isMobile ? 64 : 96}
              height={isMobile ? 64 : 96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 flex-1">
            <h1
              className={`${isMobile ? "text-xl" : "text-4xl sm:text-5xl"} font-bold tracking-tighter`}
            >
              {profile.name || "Your Name"}
            </h1>
            <p
              className={`text-muted-foreground ${isMobile ? "text-xs" : "text-base md:text-lg"} leading-relaxed`}
            >
              {profile.headline || "Software Engineer"}
            </p>
            <div
              className={`flex ${isMobile ? "flex-col gap-1" : "flex-wrap items-center gap-4"} pt-2 font-mono ${isMobile ? "text-xs" : "text-xs"} text-muted-foreground`}
            >
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
            <h2
              className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}
            >
              About
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </p>
          </section>
        )}

        {cv.work && cv.work.length > 0 && (
          <section className="space-y-6">
            <h2
              className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}
            >
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
            <h2
              className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}
            >
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
            <h2
              className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}
            >
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
          <h2
            className={`${isMobile ? "text-lg" : "text-xl"} font-bold tracking-tight`}
          >
            {t("featuredProjects", lang)}
          </h2>
          <div
            className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-4`}
          >
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
                        <StarIcon sx={{ fontSize: 11 }} /> {repo.stars}
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
                Sync your GitHub repositories to display them here.
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (template === "modern") {
    return (
      <div
        className={`w-full ${isMobile ? "space-y-6 pb-10" : "space-y-10 pb-20"} font-sans`}
      >
        <div className={`relative ${isMobile ? "" : ""}`}>
          {!isMobile && (
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          )}
          <div
            className={`relative ${isMobile ? "flex gap-3 items-start" : ""}`}
          >
            {isMobile && (
              <div className="h-16 w-16 shrink-0 rounded-full border border-border overflow-hidden bg-muted">
                <Image
                  src={`https://github.com/${username}.png`}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1
                className={`${isMobile ? "text-xl" : "text-6xl"} font-black tracking-tighter mb-2`}
              >
                {profile.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`h-1 ${isMobile ? "w-6" : "w-12"} bg-primary rounded-full`}
                />
                <span
                  className={`font-semibold ${isMobile ? "text-sm" : "text-lg"} text-primary`}
                >
                  {profile.headline}
                </span>
              </div>
              {!isMobile && (
                <p
                  className={`max-w-2xl text-muted-foreground text-base leading-relaxed`}
                >
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="flex flex-col gap-2 text-xs text-muted-foreground font-mono">
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <LocationOnOutlinedIcon fontSize="inherit" /> {profile.location}
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
        )}

        {!isMobile && (
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
          </div>
        )}

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
          <div
            className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-5`}
          >
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
                    {repo.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                      {repo.lang}
                    </span>
                    <span className="text-xs text-yellow-500">
                      <StarIcon sx={{ fontSize: 11 }} /> {repo.stargazerCount}
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
      <div
        className={`w-full ${isMobile ? "space-y-6 pb-10" : "space-y-12 pb-20"} font-sans`}
      >
        <div
          className={`${isMobile ? "flex gap-3 items-start" : "border-l-4 border-primary pl-6"}`}
        >
          {isMobile && (
            <div className="h-16 w-16 shrink-0 rounded-full border border-border overflow-hidden bg-muted">
              <Image
                src={`https://github.com/${username}.png`}
                alt="avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1
              className={`${isMobile ? "text-xl" : "text-5xl"} font-bold mb-2`}
            >
              {profile.name}
            </h1>
            <p
              className={`${isMobile ? "text-sm" : "text-lg"} text-primary font-semibold mb-3`}
            >
              {profile.headline}
            </p>
            <div
              className={`flex ${isMobile ? "flex-col gap-1 text-xs" : "flex-wrap gap-4 text-sm"} text-muted-foreground`}
            >
              {profile.location && <span>{profile.location}</span>}
              {!isMobile && profile.email && <span>{profile.email}</span>}
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
                  {repo.description}
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

  return (
    <div
      className={`w-full ${isMobile ? "space-y-8 pb-10" : "space-y-16 pb-20"} font-sans`}
    >
      <section
        className={`${isMobile ? "flex gap-3 items-start" : "text-center"}`}
      >
        <div
          className={`${isMobile ? "h-16 w-16 shrink-0" : "inline-block mb-6"}`}
        >
          <Image
            src={`https://github.com/${username}.png`}
            alt="avatar"
            width={isMobile ? 64 : 128}
            height={isMobile ? 64 : 128}
            className={`${isMobile ? "w-16 h-16 rounded-xl border-2 border-primary" : "w-32 h-32 rounded-2xl border-4 border-primary shadow-lg"}`}
          />
        </div>
        <div className={isMobile ? "flex-1" : ""}>
          <h1
            className={`${isMobile ? "text-xl" : "text-6xl"} font-black ${isMobile ? "text-foreground" : "bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/50"} mb-2`}
          >
            {profile.name}
          </h1>
          <p
            className={`${isMobile ? "text-sm" : "text-2xl"} font-bold text-foreground mb-2`}
          >
            {profile.headline}
          </p>
          {!isMobile && (
            <p
              className={`max-w-xl mx-auto text-muted-foreground text-sm leading-relaxed`}
            >
              {profile.bio}
            </p>
          )}
          {isMobile && (
            <div className="flex flex-col gap-1 text-xs text-muted-foreground font-mono">
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
          )}
        </div>
      </section>

      <div
        className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3"} gap-2 sm:gap-4`}
      >
        <div
          className={`${isMobile ? "p-3" : "p-6"} rounded-2xl bg-primary/5 border-2 border-primary text-center`}
        >
          <h3
            className={`font-bold ${isMobile ? "text-xl" : "text-3xl"} text-primary mb-1`}
          >
            {repos.length}
          </h3>
          <p
            className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}
          >
            {t("projects", lang)}
          </p>
        </div>
        <div
          className={`${isMobile ? "p-3" : "p-6"} rounded-2xl bg-primary/5 border-2 border-primary text-center`}
        >
          <h3
            className={`font-bold ${isMobile ? "text-xl" : "text-3xl"} text-primary mb-1`}
          >
            {filteredSkills.length}
          </h3>
          <p
            className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}
          >
            {t("skills", lang)}
          </p>
        </div>
        <div
          className={`${isMobile ? "p-3" : "p-6"} rounded-2xl bg-primary/5 border-2 border-primary text-center`}
        >
          <h3
            className={`font-bold ${isMobile ? "text-xl" : "text-3xl"} text-primary mb-1`}
          >
            <AllInclusiveIcon fontSize={isMobile ? "small" : "medium"} />
          </h3>
          <p
            className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}
          >
            {t("passion", lang)}
          </p>
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
        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6`}
        >
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
                className="px-6 py-3 rounded-full bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 font-semibold text-sm group-hover:from-primary/30 hover:border-primary transition-all"
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
