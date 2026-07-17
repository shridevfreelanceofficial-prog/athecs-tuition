"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, GraduationCap, Search, SlidersHorizontal } from "lucide-react"

interface ResultItem {
  id: number;
  title: string;
  batch: string;
  category: string;
  image: string;
}

export default function Results() {
  const [resultsData, setResultsData] = useState<ResultItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeBatch, setActiveBatch] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/results")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setResultsData(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const categories = ["All", ...Array.from(new Set(resultsData.map((r) => r.category)))]
  const batches = ["All", ...Array.from(new Set(resultsData.map((r) => r.batch)))]

  const filteredResults = resultsData.filter((result) => {
    const matchCategory = activeCategory === "All" || result.category === activeCategory
    const matchBatch = activeBatch === "All" || result.batch === activeBatch
    const matchSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchBatch && matchSearch
  })

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-red-50/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50/80 via-white/70 to-red-50/80 pt-28 pb-16 relative overflow-hidden border-b border-slate-100">
        {/* Background watermark image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
          <Image
            src="/images/results/mgmschooltoppers_23_25.png"
            alt="Results Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-red-100/20 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-650 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Student Achievements
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Our Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Celebrating outstanding achievements of our students year after year.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="container px-4 mx-auto py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md shadow-blue-100"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:flex-none">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  className="pl-9 pr-4 py-2 rounded-xl text-sm font-medium bg-slate-50 border border-slate-200 text-slate-600 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full"
                  value={activeBatch}
                  onChange={(e) => setActiveBatch(e.target.value)}
                >
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch === "All" ? "All Batches" : `Batch ${batch}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 rounded-xl text-sm w-full md:w-52 bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12 flex-1">
        <div className="container px-4 mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative w-14 h-14 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-spin border-t-blue-600" />
              </div>
              <p className="text-slate-500 font-medium">Loading results...</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto text-center p-8">
              <GraduationCap className="h-12 w-12 text-blue-200 mb-4" />
              <p className="text-slate-700 font-bold text-lg mb-2">No results found</p>
              <p className="text-slate-400 text-sm mb-5">Try adjusting your filters</p>
              <button
                onClick={() => { setActiveCategory("All"); setActiveBatch("All"); setSearchQuery("") }}
                className="text-blue-600 font-semibold hover:underline text-sm"
              >
                Clear all filters
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
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-400 border border-slate-100 group cursor-pointer hover:-translate-y-1"
                      onClick={() => setLightboxImage(result.image)}
                    >
                      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-blue-50 to-slate-50">
                        <Image src={result.image} alt={result.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors flex items-center justify-center">
                          <ZoomIn className="text-blue-600 opacity-0 group-hover:opacity-100 h-10 w-10 bg-white rounded-full p-2 shadow-lg transition-all duration-300 scale-75 group-hover:scale-100" />
                        </div>
                      </div>
                      <div className="p-5 border-t border-slate-50">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-bold text-slate-800 text-base leading-snug">{result.title}</h3>
                          <span className="bg-gradient-to-r from-blue-100 to-red-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">
                            {result.batch}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">{result.category}</p>
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
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-5 right-5 bg-white text-slate-700 hover:text-slate-900 p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null) }}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImage} alt="Enlarged result" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
