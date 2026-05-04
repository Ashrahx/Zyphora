export interface Repository {
  name: string;
  url: string;
  lang?: string;
  langColor?: string;
  description?: string;
  stargazerCount?: number;
  stars?: number;
  desc?: string;
}

export interface WorkExperience {
  title?: string;
  position?: string;
  company: string;
  duration?: string;
  description?: string;
  stargazerCount?: number;
  start?: string;
  end?: string;
}

export interface Education {
  degree: string;
  school?: string;
  institution?: string;
  year?: string;
  start?: string;
  end?: string;
}

export interface CVData {
  work: WorkExperience[];
  education: Education[];
  skills: string[];
  name?: string;
  headline?: string;
  summary?: string;
  location?: string;
  email?: string;
}

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  link: string;
  location: string;
}
