import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Skills from "@/app/components/Skills";
import ExperienceSection from "@/app/components/Experience";
import Dokumentasi from "@/app/components/Dokumentasi";
import Publications from "@/app/components/Publications";
import Certifications from "@/app/components/Certifications";
import EducationSection from "@/app/components/Education";
import AIChatWidget from "@/app/components/AIChatWidget";
import { portfolioData } from "@/app/lib/data";
import { Github, Linkedin, Gitlab } from "lucide-react";

export default async function HomePage() {
  const data = portfolioData;

  return (
    <div className="relative min-h-screen dark:bg-[#020617] bg-mesh overflow-x-hidden">
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        {[
          <Skills key="skills" skills={data.skills} />,
          <ExperienceSection key="exp" experiences={data.experiences} />,
          <Dokumentasi key="docs" projects={data.projects} architectures={data.architectures} />,
          <Publications key="pubs" publications={data.publications} />,
          <Certifications key="certs" certifications={data.certifications} />,
          <EducationSection key="edu" education={data.education} />,
        ].map((section, i) => (
          <div key={i}>
            <div className="max-w-6xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 sm:mx-6" />
            </div>
            {section}
          </div>
        ))}
      </main>

      <footer className="border-t border-white/5 mt-12 py-10 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1">{data.profile.name}</p>
          <p className="text-slate-500 text-sm mb-6">Fullstack Developer · Sistem Informasi · Telkom University</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            {[
              { icon: Linkedin, href: data.profile.links.linkedin, label: "LinkedIn" },
              { icon: Github, href: data.profile.links.github, label: "GitHub" },
              { icon: Gitlab, href: data.profile.links.gitlab, label: "GitLab" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-slate-700 text-xs">Built with Next.js 15 · TypeScript · Tailwind CSS · Framer Motion</p>
          <p className="text-slate-800 text-xs mt-1">© {new Date().getFullYear()} Alaric Rasendriya Aniko</p>
        </div>
      </footer>

      <AIChatWidget />
    </div>
  );
}
