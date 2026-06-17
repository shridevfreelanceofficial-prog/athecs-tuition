"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

const resultsData = [
  {
    id: 1,
    title: "MGM School Toppers",
    batch: "23-25",
    category: "School Toppers",
    image: "/images/results/mgmschooltoppers_23_25.png"
  },
  {
    id: 2,
    title: "School Toppers 23-25",
    batch: "23-25",
    category: "School Toppers",
    image: "/images/results/schooltopper_2324_and_-2325.png"
  },
  {
    id: 3,
    title: "Subject Toppers 23-24",
    batch: "23-24",
    category: "Subject Toppers",
    image: "/images/results/subjecttoppers_23_24.png"
  },
  {
    id: 4,
    title: "Subject Toppers 24-25",
    batch: "24-25",
    category: "Subject Toppers",
    image: "/images/results/subjecttoppers_24_25.png"
  },
  {
    id: 5,
    title: "Toppers Batch 24-25",
    batch: "24-25",
    category: "Overall Toppers",
    image: "/images/results/toppers_batch_24_25.png"
  }
]

const categories = ["All", "School Toppers", "Subject Toppers", "Overall Toppers"]
const batches = ["All", "23-24", "24-25", "23-25"]

export default function Results() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeBatch, setActiveBatch] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredResults = resultsData.filter(result => {
    const matchCategory = activeCategory === "All" || result.category === activeCategory
    const matchBatch = activeBatch === "All" || result.batch === activeBatch
    const matchSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchBatch && matchSearch
  })

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      {/* Header Section */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">Our Success Stories</h1>
          <p className="text-lg text-brand-text-muted">
            Celebrating the outstanding achievements of our students. Their hard work combined with our dedicated guidance has led to stellar academic performances.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 sticky top-20 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-slate-200/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex w-full md:w-auto gap-4">
              <select
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 outline-none focus:ring-2 focus:ring-primary/50"
                value={activeBatch}
                onChange={(e) => setActiveBatch(e.target.value)}
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch === "All" ? "All Batches" : `Batch ${batch}`}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-full text-sm w-full md:w-64 bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          {filteredResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-text-muted text-lg">No results found matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setActiveBatch("All"); setSearchQuery(""); }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {filteredResults.map((result) => (
                  <motion.div
                    key={result.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid"
                  >
                    <div 
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-pointer relative"
                      onClick={() => setLightboxImage(result.image)}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-contain p-2 bg-slate-50 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 h-10 w-10 drop-shadow-md transition-opacity" />
                        </div>
                      </div>
                      <div className="p-5 border-t border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-brand-text text-lg">{result.title}</h3>
                          <span className="bg-blue-50 text-primary text-xs font-bold px-2 py-1 rounded-md shrink-0">
                            Batch {result.batch}
                          </span>
                        </div>
                        <p className="text-sm text-brand-text-muted">{result.category}</p>
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
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-sm transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video md:aspect-[16/9] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Enlarged result"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
