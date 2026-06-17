import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import FloatingCTA from "@/components/shared/FloatingCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ATHECS TUITION | Expert CBSE Coaching in Nerul, Navi Mumbai",
  description: "ATHECS TUITION provides expert CBSE coaching with personalized guidance, regular assessments, and a strong focus on academic excellence in Nerul, Navi Mumbai.",
  keywords: "CBSE Tuition Classes, CBSE Coaching in Nerul, Tuition Classes in Navi Mumbai, CBSE Coaching Centre, Best Tuition Classes in Nerul",
  openGraph: {
    title: "ATHECS TUITION | Expert CBSE Coaching in Nerul",
    description: "Your child's bright future is our aim. Best CBSE tuition classes in Navi Mumbai.",
    type: "website",
    locale: "en_IN",
    url: "https://athecstuition.com",
    siteName: "ATHECS TUITION",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATHECS TUITION | Expert CBSE Coaching",
    description: "Expert CBSE coaching with personalized guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Header />
        <main className="flex-1 pt-24 md:pt-28">
          {children}
        </main>
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}
