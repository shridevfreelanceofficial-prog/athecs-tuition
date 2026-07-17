import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import FloatingCTA from "@/components/shared/FloatingCTA";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
