"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Pages that should not have the default header (they have their own navigation)
  const pagesWithoutHeader = ['/', '/homepagev2'];
  const showHeader = !pagesWithoutHeader.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
} 