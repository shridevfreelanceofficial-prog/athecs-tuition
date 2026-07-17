"use client"

import React, { useState } from "react"
import { Phone, MessageCircle, FileText, X, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      href: "/admission",
      label: "Apply for Admission",
      icon: <FileText className="h-5 w-5" />,
      className: "bg-gradient-to-r from-blue-600 to-violet-600 shadow-blue-200",
      isLink: true,
    },
    {
      href: "https://wa.me/919867714984",
      label: "WhatsApp Us",
      icon: <MessageCircle className="h-5 w-5" />,
      className: "bg-[#25D366] shadow-green-100",
      isLink: false,
      target: "_blank",
    },
    {
      href: "tel:+919867714984",
      label: "Call Now",
      icon: <Phone className="h-5 w-5" />,
      className: "bg-gradient-to-r from-slate-700 to-slate-800 shadow-slate-200",
      isLink: false,
    },
  ]

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5"
          >
            {actions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                {action.isLink ? (
                  <Link
                    href={action.href}
                    className={`flex items-center gap-3 text-white py-2.5 pl-4 pr-3 rounded-2xl shadow-lg ${action.className} hover:-translate-x-1 transition-transform group`}
                  >
                    <span className="font-semibold text-sm">{action.label}</span>
                    <div className="bg-white/20 p-1.5 rounded-xl">
                      {action.icon}
                    </div>
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    target={(action as any).target}
                    rel={(action as any).target ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 text-white py-2.5 pl-4 pr-3 rounded-2xl shadow-lg ${action.className} hover:-translate-x-1 transition-transform group`}
                  >
                    <span className="font-semibold text-sm">{action.label}</span>
                    <div className="bg-white/20 p-1.5 rounded-xl">
                      {action.icon}
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-full shadow-xl shadow-blue-200 flex items-center justify-center hover:shadow-2xl hover:shadow-blue-300 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
        aria-label="Toggle contact options"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </button>
    </div>
  )
}
