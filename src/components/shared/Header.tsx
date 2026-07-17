"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-3 mx-3 md:mx-auto md:max-w-5xl bg-white/95 backdrop-blur-2xl shadow-lg shadow-blue-100/50 rounded-2xl py-2 border border-blue-50"
            : "top-0 bg-white/80 backdrop-blur-md py-3 border-b border-slate-100/80"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`relative transition-all duration-300 ${isScrolled ? "h-8 w-8 md:h-10 md:w-10" : "h-10 w-10 md:h-12 md:w-12"}`}>
              <Image
                src="/images/logo/logo2.png"
                alt="ATHECS Logo Symbol"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className={`relative transition-all duration-300 ${isScrolled ? "h-6 w-20 md:h-7 md:w-28" : "h-7 w-24 md:h-9 md:w-32"}`}>
              <Image
                src="/images/logo/logo1.png"
                alt="ATHECS TUITION"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  pathname === link.path
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/70"
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919867714984"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">98677 14984</span>
            </a>
            <Button
              className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-750 text-white shadow-md shadow-red-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
              asChild
            >
              <Link href="/admission">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white flex flex-col shadow-2xl rounded-l-3xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <Image src="/images/logo/logo2.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <span className="font-bold text-blue-700 text-lg">ATHECS</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col p-5 gap-1.5 overflow-y-auto flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                      pathname === link.path
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Contact Block */}
                <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-3">Contact Us Directly</p>
                  <a href="tel:+919867714984" className="flex items-center gap-3 text-slate-800 font-bold hover:text-blue-700 transition-colors mb-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    +91 98677 14984
                  </a>
                  <a href="tel:+918356809709" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-blue-700 transition-colors">
                    <Phone className="h-4 w-4 text-blue-600" />
                    +91 83568 09709
                  </a>
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl shadow-md"
                    asChild
                  >
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
