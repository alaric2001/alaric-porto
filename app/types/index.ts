export interface Profile {
  name: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  summaryEn: string;
  links: { linkedin: string; github: string; gitlab: string; whatsapp: string };
}

export interface SkillGroup {
  category: string;
  categoryEn: string;
  icon: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  roleEn: string;
  period: string;
  bullets: string[];
  bulletsEn: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  subtitleEn: string;
  role: string;
  roleEn: string;
  period: string;
  bullets: string[];
  bulletsEn: string[];
  stack: string[];
  url?: string;
  docsKey?: string;
}

export interface ArchLayer {
  label: string;
  labelEn: string;
  tech: string[];
  description: string;
  descriptionEn: string;
}

export interface TechArchitecture {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  layers: ArchLayer[];
  dataFlow: string[];
  dataFlowEn: string[];
  highlights: string[];
  highlightsEn: string[];
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  indexing?: string;
  url?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  descriptionEn: string;
  credentialUrl?: string;
  badge?: string;
}

export interface Education {
  id: string;
  degree: string;
  degreeEn: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  architectures: Record<string, TechArchitecture>;
  publications: Publication[];
  certifications: Certification[];
  education: Education[];
}

export type AuthRole = "recruiter" | "admin";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}
