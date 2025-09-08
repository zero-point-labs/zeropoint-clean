import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Andreas Kyriakou | Full-Stack Developer & UI/UX Designer",
  description: "Meet Andreas Kyriakou, a passionate Full-Stack Developer and UI/UX Designer from Cyprus with 5+ years of experience creating exceptional digital experiences.",
  keywords: ["Andreas Kyriakou", "Full-Stack Developer", "UI/UX Designer", "React", "Next.js", "TypeScript", "Cyprus", "Web Development"],
  authors: [{ name: "Andreas Kyriakou" }],
  openGraph: {
    title: "About Andreas Kyriakou | Zero Point Labs",
    description: "Discover the story behind Zero Point Labs - from design intuition to technical expertise",
    type: "website",
    locale: "en_US",
    siteName: "Zero Point Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Andreas Kyriakou | Full-Stack Developer & Designer",
    description: "The rare combination of design intuition and technical expertise",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
