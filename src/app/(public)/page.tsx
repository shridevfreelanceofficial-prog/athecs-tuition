"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Award,
  Target,
  Calendar,
  Presentation,
  ClipboardCheck,
  Laptop,
  Users,
  Smile,
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle,
  Trophy,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"

const schoolFeatures = [
  {
    icon: <Award className="h-10 w-10 text-red-600" />,
    title: "Quality education",
    bg: "bg-red-50/50",
    border: "border-red-100",
  },
  {
    icon: <Target className="h-10 w-10 text-blue-600" />,
    title: "Conceptual clarity",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
  },
  {
    icon: <Calendar className="h-10 w-10 text-red-600" />,
    title: "Bi-weekly test",
    bg: "bg-red-50/50",
    border: "border-red-100",
  },
  {
    icon: <Presentation className="h-10 w-10 text-blue-600" />,
    title: "Weekly practice sessions",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
  },
  {
    icon: <ClipboardCheck className="h-10 w-10 text-red-600" />,
    title: "Result-oriented methodology",
    bg: "bg-red-50/50",
    border: "border-red-100",
  },
  {
    icon: <Laptop className="h-10 w-10 text-blue-600" />,
    title: "In-house subject assistants",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
  },
  {
    icon: <Users className="h-10 w-10 text-red-600" />,
    title: "Parent-teacher meetings",
    bg: "bg-red-50/50",
    border: "border-red-100",
  },
  {
    icon: <Smile className="h-10 w-10 text-blue-600" />,
    title: "Weekend de-stress activities",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
  },
]

const stats = [
  { value: "8+", label: "Years of Excellence" },
  { value: "500+", label: "Students Mentored" },
  { value: "95%", label: "Board Pass Rate" },
  { value: "2", label: "Branches in Navi Mumbai" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ===== HERO SECTION (Premium Light Two-Column) ===== */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-red-50/50 pt-28 pb-12 overflow-hidden">
        {/* Background watermark image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
          <Image
            src="/images/hero/h1.png"
            alt="ATHECS Classroom Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Glow rings in background */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-red-400/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Content) */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mx-auto lg:mx-0 w-fit"
              >
                <Sparkles className="h-4 w-4 text-red-500 fill-red-500" />
                CBSE Expert Coaching · Nerul & Sanpada
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6"
              >
                Your Child's{" "}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Bright Future
                </span>{" "}
                Is Our Aim
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                At ATHECS TUITION, we provide highly interactive, concept-focused coaching explicitly tailored to the CBSE syllabus. Empowering young minds since 2016.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white h-14 px-8 text-base font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all rounded-xl"
                  asChild
                >
                  <Link href="/admission">Apply for Admission</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50 text-slate-700 h-14 px-8 text-base font-semibold rounded-xl bg-white/80 shadow-sm"
                  asChild
                >
                  <a href="tel:+919867714984" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Call us: 98677 14984
                  </a>
                </Button>
              </motion.div>

              {/* Quick statistics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-slate-100"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="text-2xl md:text-3xl font-black text-slate-800">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (Visual) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full flex justify-center"
            >
              <div className="relative aspect-[4/3] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white bg-slate-100">
                <Image
                  src="/images/class_photos/c3.png"
                  alt="ATHECS Classroom Image"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2.5">
                  <div className="bg-red-500 rounded-full p-1 text-white">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Class Moment</p>
                    <p className="text-sm font-bold text-slate-800">ATHECS TUITION</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CORE PILLARS SECTION (New red/blue themed features matching user images) ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-slate-50/50 -z-10" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-widest mb-3">Our Core Highlights</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-5">
              The Path to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Conceptual Mastery
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Structured support systems and scientifically chosen practices to ensure absolute top scoring.
            </p>
          </div>

          {/* Outline Grid matching user images in our color theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {schoolFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className={`p-4 rounded-2xl ${item.bg} border ${item.border} mb-6 shrink-0`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 leading-snug">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS PREVIEW ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Our Pride</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-800">Excellent Board Results</h2>
            </div>
            <Button variant="outline" className="shrink-0 border-slate-200 text-blue-700 hover:bg-blue-50 rounded-xl bg-white" asChild>
              <Link href="/results" className="flex items-center gap-2">
                All Toppers List <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/images/results/mgmschooltoppers_23_25.png", label: "MGM School Toppers", batch: "23-25", color: "from-blue-500 to-blue-600" },
              { src: "/images/results/schooltopper_2324_and_-2325.png", label: "Outstanding Performance", batch: "23-25", color: "from-red-500 to-red-600" },
              { src: "/images/results/subjecttoppers_24_25.png", label: "Subject Toppers", batch: "24-25", color: "from-blue-600 to-red-600" },
            ].map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden group aspect-[4/3] ${i === 2 ? "hidden lg:block" : ""}`}
              >
                <Image src={result.src} alt={result.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className={`text-white text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${result.color} inline-block mb-2`}>
                    Batch {result.batch}
                  </span>
                  <h3 className="text-white text-lg font-bold">{result.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACTIVITIES PREVIEW ===== */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-widest mb-3">Holistic Growth</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">Co-curricular Life</h2>
            <p className="text-slate-500 text-lg">Unwinding, de-stressing, and celebrating milestones together as a family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-slate-100"
            >
              <Image src="/images/Activities/drawing_competition/d1.png" alt="Drawing Competition" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">Annual Activity</span>
                <h3 className="text-white text-2xl font-bold mt-2">Drawing Competition</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { src: "/images/Activities/Farewell/f1.png", label: "Farewell Functions" },
                { src: "/images/Activities/Sports_Day_Celebration_2k23/t2.png", label: "Annual Sports" },
                { src: "/images/Activities/wetnjoy/w2.png", label: "Fun Trips (Wet N Joy)", wide: true },
              ].map((act, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden group border border-slate-100 ${act.wide ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}>
                  <Image src={act.src} alt={act.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-sm">{act.label}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center">
            <Button
              className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 h-12 rounded-xl shadow-md hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link href="/activities">Explore All Activities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
