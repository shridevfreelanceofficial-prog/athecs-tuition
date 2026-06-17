"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Results", path: "/results" },
  { name: "Activities", path: "/activities" },
  { name: "Contact Us", path: "/contact-us" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-4 mx-4 md:mx-auto md:max-w-5xl bg-white/90 backdrop-blur-xl shadow-xl shadow-primary/5 rounded-full py-2 border border-white/20"
            : "top-0 bg-white py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`relative transition-all duration-300 ${isScrolled ? 'h-8 w-8 md:h-10 md:w-10' : 'h-10 w-10 md:h-12 md:w-12'}`}>
              <Image
                src="/images/logo/logo2.png"
                alt="ATHECS Logo Symbol"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <div className={`relative transition-all duration-300 ${isScrolled ? 'h-6 w-20 md:h-8 md:w-28' : 'h-8 w-24 md:h-10 md:w-32'}`}>
              <Image
                src="/images/logo/logo1.png"
                alt="ATHECS TUITION"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm font-semibold transition-all duration-300 py-2 group ${
                  pathname === link.path ? "text-primary" : "text-slate-600 hover:text-primary"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full ${
                  pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className={`gap-2 transition-all duration-300 hover:bg-primary/5 ${isScrolled ? 'h-10 px-4' : ''}`} asChild>
              <a href="tel:+919867714984">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">Call Now</span>
              </a>
            </Button>
            <Button className={`transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 duration-300 ${isScrolled ? 'h-10 px-5' : ''}`} asChild>
              <Link href="/admission">Admission</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer - OUTSIDE HEADER TO FIX STACKING CONTEXT */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white flex flex-col shadow-2xl rounded-l-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <span className="font-bold text-xl text-primary flex items-center gap-2">
                  <Menu className="h-5 w-5" /> Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-white text-slate-500 hover:text-slate-800 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-3 overflow-y-auto h-full bg-white">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3.5 px-5 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      pathname === link.path
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary hover:translate-x-1"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-auto pt-6 flex flex-col gap-3">
                  <div className="bg-slate-50 p-4 rounded-2xl mb-2 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Contact Us Directly</p>
                    <a href="tel:+919867714984" className="flex items-center gap-3 text-brand-text font-bold text-lg hover:text-primary transition-colors">
                      <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                        <Phone className="h-4 w-4" />
                      </div>
                      +91 98677 14984
                    </a>
                  </div>
                  <Button className="w-full justify-center h-14 text-lg shadow-lg shadow-primary/25 rounded-xl" asChild>
                    <Link href="/admission" onClick={() => setMobileMenuOpen(false)}>
                      Apply for Admission
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
