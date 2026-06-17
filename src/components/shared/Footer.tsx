import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Mail } from "lucide-react"

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 bg-white/10 p-2 rounded-xl w-fit">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo/logo2.png"
                  alt="ATHECS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-10 w-32">
                <Image
                  src="/images/logo/logo1.png"
                  alt="ATHECS TUITION"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm mt-2 max-w-xs text-slate-400">
              Expert CBSE coaching with personalized guidance, regular assessments, and a strong focus on academic excellence. Your child's bright future is our aim.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span> About Us
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span> Results
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span> Activities
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span> Admission Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Goodwill Arcade, Office No. 15, Sector 10, Nerul, Navi Mumbai – 400706, Maharashtra, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+919867714984" className="hover:text-white transition-colors">+91 98677 14984</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@athecstuition.com" className="hover:text-white transition-colors">info@athecstuition.com</a>
              </li>
            </ul>
          </div>

          {/* Map / Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2 relative inline-block">
              Follow Us
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h3>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary text-white transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} ATHECS TUITION. All rights reserved.</p>
          <p>
            Designed with excellence for educational success.
          </p>
        </div>
      </div>
    </footer>
  )
}
