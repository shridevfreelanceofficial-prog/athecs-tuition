"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Users, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "CBSE-Focused Curriculum",
    description: "In-depth coverage of the syllabus tailored exclusively for CBSE students."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Small Batch Sizes",
    description: "Ensuring individual attention and personalized guidance for every student."
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Result-Oriented Teaching",
    description: "Proven strategies and consistent assessments to maximize academic performance."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Performance Tracking",
    description: "Regular tests and detailed feedback to monitor and improve progress continuously."
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/hero/h1.png"
            alt="ATHECS Classroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f172a]/70 mix-blend-multiply" />
        </motion.div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wider"
          >
            WELCOME TO ATHECS TUITION
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Your Child's Bright Future Is Our Aim
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light"
          >
            Expert CBSE coaching with personalized guidance, regular assessments, and a strong focus on academic excellence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-xl shadow-primary/30" asChild>
              <Link href="/admission">Apply for Admission</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 hover:bg-white text-white hover:text-primary border-white/50 backdrop-blur-sm" asChild>
              <Link href="/contact-us">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] blur-3xl -z-0"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-6">Why Choose ATHECS?</h2>
            <p className="text-brand-text-muted text-lg">We provide an environment that nurtures curiosity, builds confidence, and drives academic success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div className="h-16 w-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  {React.cloneElement(feature.icon, { className: "h-8 w-8 text-primary group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-3">{feature.title}</h3>
                <p className="text-brand-text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Results Preview */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-6">Our Success Stories</h2>
              <p className="text-brand-text-muted text-lg">Consistent outstanding performance by our students year after year is a testament to our dedication.</p>
            </div>
            <Button variant="outline" className="shrink-0" asChild>
              <Link href="/results" className="flex items-center gap-2">
                View All Results <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group aspect-[4/3] bg-gradient-to-br from-blue-100 to-white p-2"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image src="/images/results/mgmschooltoppers_23_25.png" alt="MGM School Toppers" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-accent font-bold text-sm bg-white shadow-lg w-fit px-4 py-1.5 rounded-full mb-3 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Batch 23-25</span>
                  <h3 className="text-white text-xl font-bold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">MGM School Toppers</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group aspect-[4/3] bg-gradient-to-br from-indigo-100 to-white p-2"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image src="/images/results/schooltopper_2324_and_-2325.png" alt="School Toppers" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-bold text-sm bg-white shadow-lg w-fit px-4 py-1.5 rounded-full mb-3 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Batch 23-25</span>
                  <h3 className="text-white text-xl font-bold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Outstanding Performance</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group aspect-[4/3] hidden lg:block bg-gradient-to-br from-sky-100 to-white p-2"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image src="/images/results/subjecttoppers_24_25.png" alt="Subject Toppers" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-secondary font-bold text-sm bg-white shadow-lg w-fit px-4 py-1.5 rounded-full mb-3 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Batch 24-25</span>
                  <h3 className="text-white text-xl font-bold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Subject Toppers</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-6">Beyond the Classroom</h2>
            <p className="text-brand-text-muted text-lg">We believe in holistic development. Explore the vibrant student life at ATHECS.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-50 p-2 shadow-2xl shadow-primary/10 aspect-[4/3] md:aspect-auto group cursor-pointer"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image src="/images/Activities/drawing_competition/d1.png" alt="Drawing Competition" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-3xl font-bold mb-2">Drawing Competition</h3>
                  <p className="text-white/90">Fostering creativity and imagination.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              <div className="relative rounded-[2rem] bg-gradient-to-br from-purple-100 to-pink-50 p-1.5 shadow-xl shadow-primary/5 overflow-hidden aspect-square group cursor-pointer">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image src="/images/Activities/Farewell/f1.png" alt="Farewell" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg md:text-xl">Farewell</h3>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[2rem] bg-gradient-to-br from-emerald-100 to-teal-50 p-1.5 shadow-xl shadow-primary/5 overflow-hidden aspect-square group cursor-pointer">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image src="/images/Activities/Sports_Day_Celebration_2k23/t2.png" alt="Sports Day" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg md:text-xl">Sports Day</h3>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[2rem] bg-gradient-to-br from-sky-100 to-blue-50 p-1.5 shadow-xl shadow-primary/5 overflow-hidden aspect-[2/1] col-span-2 group cursor-pointer">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image src="/images/Activities/wetnjoy/w2.png" alt="Wet N Joy Trip" fill className="object-cover transition-transform duration-700 group-hover:scale-110 object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xl md:text-2xl">Wet N Joy Trip</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/activities" className="px-8">Explore All Activities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="relative py-24 w-full overflow-hidden">
        <Image src="/images/class_photos/c2.png" alt="Classroom" fill className="object-cover" />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Begin Your Academic Journey?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Join ATHECS TUITION today and take the first step towards academic excellence. Call us at +91 98677 14984.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-lg h-14 px-8" asChild>
                <Link href="/admission">Apply for Admission</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 text-white border-white hover:bg-white hover:text-primary" asChild>
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
