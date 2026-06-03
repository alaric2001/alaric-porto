import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/app/components/AuthProvider";
import { LangProvider } from "@/app/components/LangProvider";
import AchievementProvider from "@/app/components/AchievementProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Alaric Rasendriya Aniko — Fullstack Developer",
  description: "Portfolio of Alaric Rasendriya Aniko — Fullstack Developer specializing in React.js, Next.js, Laravel, React Native, and AI/Cloud integration. M.Sc. Information Systems, Telkom University. 5 publications in IEEE Scopus & Sinta 2.",
  keywords: ["Fullstack Developer", "React.js", "Next.js", "Laravel", "React Native", "AWS", "IBM Granite", "Telkom University"],
  authors: [{ name: "Alaric Rasendriya Aniko", url: "https://github.com/alaric2001" }],
  openGraph: {
    type: "website",
    title: "Alaric Rasendriya Aniko — Fullstack Developer",
    description: "Fullstack Developer with expertise in React.js, Node.js, Laravel, and AWS. Active researcher with 5 international publications.",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <LangProvider>
              <AchievementProvider>
                {children}
              </AchievementProvider>
            </LangProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
