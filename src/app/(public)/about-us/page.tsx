"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, GraduationCap, Award, BookOpen, Clock, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Fixed particle data — no Math.random() to avoid hydration mismatch
const PARTICLES = [
  { width: 6, height: 4, left: "15%", top: "20%", duration: 4.0 },
  { width: 4, height: 6, left: "75%", top: "35%", duration: 5.5 },
  { width: 5, height: 5, left: "55%", top: "70%", duration: 4.8 },
  { width: 3, height: 4, left: "30%", top: "55%", duration: 6.0 },
  { width: 7, height: 4, left: "85%", top: "15%", duration: 3.8 },
  { width: 4, height: 7, left: "10%", top: "80%", duration: 5.2 },
  { width: 5, height: 3, left: "45%", top: "10%", duration: 4.5 },
  { width: 6, height: 5, left: "65%", top: "90%", duration: 5.8 },
  { width: 3, height: 6, left: "20%", top: "45%", duration: 4.2 },
  { width: 7, height: 4, left: "90%", top: "60%", duration: 6.2 },
  { width: 4, height: 5, left: "35%", top: "88%", duration: 3.6 },
  { width: 5, height: 3, left: "60%", top: "30%", duration: 5.0 },
]

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center pt-24 pb-12">
        <Image
          src="/images/class_photos/c1.png"
          alt="ATHECS Classroom Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-55/75 via-white/65 to-red-55/75" />

        <div className="container relative z-10 px-4 text-center text-slate-800">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-650 text-sm font-bold uppercase tracking-widest mb-4"
          >
            Est. 2016 · Navi Mumbai
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 text-slate-900"
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              ATHECS
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-700 font-medium text-lg md:text-xl max-w-2xl mx-auto"
          >
            Empowering students with knowledge, confidence, and excellence.
          </motion.p>
        </div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                A Legacy of{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-5 leading-relaxed">
                At ATHECS TUITION, we are more than just a coaching center. We are a community dedicated to academic growth and holistic development. Our exclusive focus on the CBSE curriculum allows us to provide targeted, effective, and up-to-date education.
              </p>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                We believe that every child has immense potential. Our role is to unlock that potential through conceptual clarity, individual attention, and consistent performance improvement strategies.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <GraduationCap className="h-6 w-6" />, title: "Expert Faculty", sub: "Highly qualified teachers", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: <Award className="h-6 w-6" />, title: "Proven Results", sub: "Consistent top ranks", color: "text-violet-600", bg: "bg-violet-50" },
                  { icon: <BookOpen className="h-6 w-6" />, title: "CBSE Board", sub: "Dedicated curriculum", color: "text-amber-600", bg: "bg-amber-50" },
                  { icon: <Clock className="h-6 w-6" />, title: "Regular Tests", sub: "Performance tracking", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} shrink-0`}>{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-to-br from-blue-100 to-violet-100 rounded-3xl -z-10 translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl -z-10 -translate-x-4 translate-y-4"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl shadow-blue-100">
                  <Image src="/images/class_photos/c2.png" alt="Classroom Environment" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 relative overflow-hidden">
        {/* Animated orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 420, 540, 660].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/8"
              style={{ width: size, height: size }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 25 + i * 8, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{ width: 5 - i * 0.8, height: 5 - i * 0.8, boxShadow: "0 0 10px rgba(255,255,255,0.8)", opacity: 0.7 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Fixed particles — no Math.random() */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
            animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}

        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-blue-200 font-bold text-sm uppercase tracking-widest mb-3"
            >
              Leadership
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white"
            >
              Meet Our <span className="text-blue-200">Founder</span>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-14 max-w-5xl mx-auto">
            {/* Photo with rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0 flex items-center justify-center w-48 h-48 lg:w-72 lg:h-72"
            >
              {[1.15, 1.35, 1.55].map((scaleFactor, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white"
                  style={{
                    width: `${scaleFactor * 100}%`,
                    height: `${scaleFactor * 100}%`,
                    opacity: 0.15 - i * 0.04,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
                  transition={{
                    rotate: { duration: 10 + i * 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                </motion.div>
              ))}

              <div className="absolute rounded-full bg-white/20 blur-3xl w-[70%] h-[70%]" />

              <div className="relative w-40 h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl z-10">
                <Image
                  src="/images/Founder/founder.png"
                  alt="Abhishek Mishra – Founder"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-3 z-20 bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              >
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> Est. 2016
              </motion.div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="inline-block text-blue-200 text-xs font-bold uppercase tracking-widest border border-blue-300/40 px-3 py-1 rounded-full mb-4">
                Founder & Director
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">Abhishek Mishra</h3>
              <p className="text-blue-200 font-semibold text-lg mb-6">B.E. in Information Technology</p>

              <div className="w-14 h-1 bg-gradient-to-r from-blue-300 to-white rounded-full mb-7 mx-auto lg:mx-0" />

              <p className="text-blue-100 text-lg leading-relaxed mb-4">
                Abhishek Mishra, the founder of ATHECS TUITION, holds a Bachelor's degree in Information Technology (B.E. IT). He established the institute in 2016 with a vision to provide quality education that goes beyond scoring good marks in CBSE board examinations.
              </p>
              <p className="text-blue-200/80 leading-relaxed mb-8">
                His primary goal has always been to help students build strong fundamental concepts, develop logical thinking, and gain the confidence to solve problems independently — skills that last a lifetime, not just through board exams.
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                {["Quality Education", "CBSE Expert", "Since 2016", "B.E. IT", "Visionary Educator"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CLASSROOM ===== */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Our Environment</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Classroom Experience</h2>
            <p className="text-slate-500 text-lg">Modern facilities designed to foster a distraction-free and engaging learning environment.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { src: "/images/class_photos/c1.png", alt: "Classroom 1" },
              { src: "/images/class_photos/c2.png", alt: "Classroom 2" },
              { src: "/images/class_photos/c3.png", alt: "Classroom 3" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
              >
                <Image src={img.src} alt={img.alt} width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Visit Our Centers</h2>
            <p className="text-slate-500">Two convenient locations across Navi Mumbai to serve you better.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Nerul Branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-400"
            >
              <div className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-600 rounded-xl">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xl">Nerul Branch</h4>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Goodwill Arcade, Office No. 15,<br />
                  Sector 10, Nerul,<br />
                  Navi Mumbai – 400706, Maharashtra
                </p>
                <div className="flex items-center gap-2 text-slate-600 mb-6">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <a href="tel:+919867714984" className="hover:text-blue-700 transition-colors font-semibold">+91 98677 14984</a>
                    <a href="tel:+918356809709" className="hover:text-blue-700 transition-colors">+91 83568 09709</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl shadow-md hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <a href="tel:+919867714984">Call Now</a>
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl" asChild>
                    <a href="https://maps.app.goo.gl/gPLBEP3yuJca34q97" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
              {/* Map */}
              <div className="h-[280px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1784292584883!6m8!1m7!1s1jDZrjQJwCw3VxC2ukrphw!2m2!1d19.03669619356896!2d73.01734498988502!3f106.96228879023819!4f3.914949437396885!5f0.7820865974627469"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="ATHECS TUITION Nerul Branch"
                />
              </div>
            </motion.div>

            {/* Sanpada Branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-red-50 to-white rounded-3xl border border-red-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-50 transition-all duration-400"
            >
              <div className="p-7 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-red-600 rounded-xl">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xl">Sanpada Branch</h4>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Ground Floor, Office No. 7,<br />
                  Shiv Durga Apartment,<br />
                  Juinagar Railway Station Road, Near DMart,<br />
                  Sector 10, Sanpada
                </p>
                <div className="flex items-center gap-2 text-slate-600 mb-6">
                  <Phone className="h-4 w-4 text-red-600 shrink-0" />
                  <div className="flex flex-col text-sm">
                    <a href="tel:+919867714984" className="hover:text-red-700 transition-colors font-semibold">+91 98677 14984</a>
                    <a href="tel:+918356809709" className="hover:text-red-700 transition-colors">+91 83568 09709</a>
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <Button
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-md hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <a href="tel:+918356809709">Call Now</a>
                  </Button>
                </div>

                {/* Branch info card instead of map */}
                <div className="flex-1 bg-gradient-to-br from-red-100 to-rose-50/50 rounded-2xl p-6 flex flex-col gap-4 border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600 rounded-xl">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Sanpada, Navi Mumbai</p>
                      <p className="text-xs text-slate-500">Near Juinagar Railway Station</p>
                    </div>
                  </div>
                  {[
                    "Near DMart, easily accessible",
                    "Ground floor — wheelchair accessible",
                    "Close to Juinagar Railway Station",
                    "Convenient parking available nearby",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-red-600 shrink-0" />
                      <span className="text-sm text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
