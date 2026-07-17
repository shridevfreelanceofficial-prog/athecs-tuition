"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ImageIcon } from "lucide-react"

interface ActivityItem {
  id: number;
  category: string;
  image: string;
}

export default function Activities() {
  const [activitiesData, setActivitiesData] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/activities?flat=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setActivitiesData(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const categories = ["All", ...Array.from(new Set(activitiesData.map((a) => a.category)))]
  const filteredActivities = activeCategory === "All" ? activitiesData : activitiesData.filter((item) => item.category === activeCategory)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50/40 via-white to-blue-50/40">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-50/80 via-white/70 to-blue-50/80 pt-28 pb-16 relative overflow-hidden border-b border-slate-100">
        {/* Background watermark image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
          <Image
            src="/images/Activities/drawing_competition/d1.png"
            alt="Activities Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-red-100/20 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-red-600 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Student Life
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Life at ATHECS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Beyond academics — holistic development through sports, arts, and memorable experiences.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="container px-4 mx-auto py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 pb-24 flex-1">
        <div className="container px-4 mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-red-100 animate-spin border-t-red-600" />
              </div>
              <p className="text-slate-500 font-medium">Loading activities...</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 text-center p-8 max-w-sm mx-auto">
              <ImageIcon className="h-12 w-12 text-red-200 mb-4" />
              <p className="text-slate-700 font-bold">No activities found</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
              <AnimatePresence>
                {filteredActivities.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid"
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-50 group cursor-pointer border border-slate-100 hover:-translate-y-1 transition-all duration-400"
                      onClick={() => setLightboxImage(item.image)}
                    >
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5">
                        <p className="text-white font-bold text-base transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {item.category}
                        </p>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                        <ZoomIn className="h-4 w-4 text-red-650" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-5 right-5 bg-white text-slate-700 p-2.5 rounded-full shadow-xl hover:scale-110 transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null) }}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-6xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImage} alt="Activity" fill sizes="100vw" className="object-contain" quality={95} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
