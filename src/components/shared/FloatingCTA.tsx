"use client"

import React, { useState } from "react"
import { Phone, MessageCircle, FileText, ChevronUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/admission"
              className="flex items-center gap-3 bg-primary text-white py-2 px-4 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:-translate-x-1 group"
            >
              <span className="font-medium text-sm group-hover:block hidden md:block">Apply for Admission</span>
              <div className="bg-white/20 p-2 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
            </Link>

            <a
              href="https://wa.me/919867714984"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white py-2 px-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:-translate-x-1 group"
            >
              <span className="font-medium text-sm group-hover:block hidden md:block">WhatsApp Us</span>
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="h-5 w-5" />
              </div>
            </a>

            <a
              href="tel:+919867714984"
              className="flex items-center gap-3 bg-accent text-white py-2 px-4 rounded-full shadow-lg hover:bg-accent/90 transition-transform hover:-translate-x-1 group"
            >
              <span className="font-medium text-sm group-hover:block hidden md:block">Call Now</span>
              <div className="bg-white/20 p-2 rounded-full">
                <Phone className="h-5 w-5" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleOpen}
        className="h-14 w-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30"
        aria-label="Toggle contact options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
        </motion.div>
      </button>
    </div>
  )
}
