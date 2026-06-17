"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

const activitiesData = [
  // Drawing Competition
  { id: 1, category: "Drawing Competition", image: "/images/Activities/drawing_competition/d1.png" },
  { id: 2, category: "Drawing Competition", image: "/images/Activities/drawing_competition/d2.png" },
  { id: 3, category: "Drawing Competition", image: "/images/Activities/drawing_competition/d3.png" },
  // Farewell
  { id: 4, category: "Farewell", image: "/images/Activities/Farewell/f1.png" },
  { id: 5, category: "Farewell", image: "/images/Activities/Farewell/f2.png" },
  { id: 6, category: "Farewell", image: "/images/Activities/Farewell/f3.png" },
  { id: 7, category: "Farewell", image: "/images/Activities/Farewell/f4.png" },
  // Sports Day Celebration 2k23
  { id: 8, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t1.png" },
  { id: 9, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t2.png" },
  { id: 10, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t3.png" },
  { id: 11, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t4.png" },
  { id: 12, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t5.png" },
  { id: 13, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t6.png" },
  { id: 14, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t7.png" },
  { id: 15, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t8.png" },
  { id: 16, category: "Sports Day", image: "/images/Activities/Sports_Day_Celebration_2k23/t10.png" },
  // Wet N Joy Trip
  { id: 17, category: "Wet N Joy Trip", image: "/images/Activities/wetnjoy/w1.png" },
  { id: 18, category: "Wet N Joy Trip", image: "/images/Activities/wetnjoy/w2.png" },
]

const categories = ["All", "Drawing Competition", "Farewell", "Sports Day", "Wet N Joy Trip"]

export default function Activities() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredActivities = activeCategory === "All"
    ? activitiesData
    : activitiesData.filter(item => item.category === activeCategory)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">Life at ATHECS</h1>
          <p className="text-lg text-brand-text-muted">
            Beyond academics, we believe in holistic development. Our students participate in various extracurricular activities, sports, and educational trips to build character and teamwork.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sticky top-20 z-40 bg-slate-50/90 backdrop-blur-md">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 pb-24">
        <div className="container px-4 mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredActivities.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid"
                >
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-slate-200/50 bg-white"
                    onClick={() => setLightboxImage(item.image)}
                  >
                    <Image
                      src={item.image}
                      alt={item.category}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">{item.category}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full max-w-6xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Enlarged activity"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
