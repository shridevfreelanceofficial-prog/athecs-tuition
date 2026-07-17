import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Mail, GraduationCap, ArrowRight } from "lucide-react"

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-300">
      {/* Top CTA Bar */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-600 to-violet-600 p-6 md:p-8 rounded-2xl">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Enroll Your Child Today!</h3>
              <p className="text-blue-100 text-sm">Seats are limited. Apply now for the upcoming batch.</p>
            </div>
            <Link
              href="/admission"
              className="flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg shrink-0 group"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 bg-white p-2.5 rounded-xl w-fit shadow-md">
              <div className="relative h-11 w-11">
                <Image src="/images/logo/logo2.png" alt="ATHECS Logo" fill className="object-contain" />
              </div>
              <div className="relative h-9 w-28">
                <Image src="/images/logo/logo1.png" alt="ATHECS TUITION" fill className="object-contain object-left" />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Expert CBSE coaching with personalized guidance, regular assessments, and a strong focus on academic excellence. Your child's bright future is our aim.
            </p>
            <div className="flex gap-3 mt-1">
              <a
                href="#"
                className="h-9 w-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:border-transparent text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base tracking-wide">Quick Links</h3>
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full mb-1"></div>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Results", path: "/results" },
                { name: "Activities", path: "/activities" },
                { name: "Admission Form", path: "/admission" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block group-hover:bg-white transition-colors shrink-0"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3 className="text-white font-bold text-base tracking-wide">Our Branches</h3>
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full mb-1"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nerul */}
              <div className="bg-white/5 border border-white/8 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-blue-300 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Nerul Branch
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Goodwill Arcade, Office No. 15, Sector 10, Nerul, Navi Mumbai – 400706
                </p>
              </div>
              {/* Sanpada */}
              <div className="bg-white/5 border border-white/8 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-violet-300 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Sanpada Branch
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ground Floor, Office No. 7, Shiv Durga Apartment, Juinagar Rly Stn Road, Near DMart, Sector 10, Sanpada
                </p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="flex flex-wrap gap-4 mt-1 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919867714984" className="hover:text-white transition-colors">+91 98677 14984</a>
                  <a href="tel:+918356809709" className="hover:text-white transition-colors">+91 83568 09709</a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="mailto:info@athecstuition.com" className="hover:text-white transition-colors">info@athecstuition.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-blue-500" />
            <p>&copy; {new Date().getFullYear()} ATHECS TUITION. All rights reserved.</p>
          </div>
          <p>Designed with excellence for educational success.</p>
        </div>
      </div>
    </footer>
  )
}
