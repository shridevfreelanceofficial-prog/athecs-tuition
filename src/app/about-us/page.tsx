"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, GraduationCap, Award, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/images/class_photos/c1.png"
          alt="ATHECS Classroom Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />

        <div className="container relative z-10 px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto"
          >
            Empowering students with knowledge, confidence, and excellence.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                A Legacy of <span className="text-primary">Academic Excellence</span>
              </h2>
              <p className="text-lg text-brand-text-muted mb-6 leading-relaxed">
                At ATHECS TUITION, we are more than just a coaching center. We are a community dedicated to academic growth and holistic development. Our exclusive focus on the CBSE curriculum allows us to provide targeted, effective, and up-to-date education.
              </p>
              <p className="text-lg text-brand-text-muted mb-8 leading-relaxed">
                We believe that every child has immense potential. Our role is to unlock that potential through conceptual clarity, individual attention, and consistent performance improvement strategies.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text">Expert Faculty</h4>
                    <p className="text-sm text-brand-text-muted">Highly qualified teachers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text">Proven Results</h4>
                    <p className="text-sm text-brand-text-muted">Consistent top ranks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text">CBSE Board</h4>
                    <p className="text-sm text-brand-text-muted">Dedicated curriculum</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text">Regular Tests</h4>
                    <p className="text-sm text-brand-text-muted">Performance tracking</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-primary/10 rounded-3xl -z-10 translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-accent/10 rounded-3xl -z-10 -translate-x-4 translate-y-4"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                  <Image src="/images/class_photos/c2.png" alt="Classroom Environment" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Experience (Masonry) */}
      <section className="py-20 bg-brand-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">Our Classroom Experience</h2>
            <p className="text-brand-text-muted text-lg">Modern facilities designed to foster a distraction-free and engaging learning environment.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <div className="break-inside-avoid relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group bg-gradient-to-br from-blue-100 to-indigo-50 p-2">
              <div className="relative rounded-[1.5rem] overflow-hidden w-full h-full">
                <Image src="/images/class_photos/c1.png" alt="Classroom 1" width={800} height={600} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            <div className="break-inside-avoid relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group bg-gradient-to-br from-emerald-100 to-teal-50 p-2">
              <div className="relative rounded-[1.5rem] overflow-hidden w-full h-full">
                <Image src="/images/class_photos/c2.png" alt="Classroom 2" width={800} height={1000} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            <div className="break-inside-avoid relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 group bg-gradient-to-br from-pink-100 to-rose-50 p-2">
              <div className="relative rounded-[1.5rem] overflow-hidden w-full h-full">
                <Image src="/images/class_photos/c3.png" alt="Classroom 3" width={800} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-brand-text mb-6">Visit Our Center</h2>
              <p className="text-brand-text-muted mb-8">
                Located conveniently in Nerul, our center is easily accessible. Come visit us to discuss your child's academic future.
              </p>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text mb-1">Address</h4>
                    <p className="text-brand-text-muted leading-relaxed">
                      Goodwill Arcade, Office No. 15,<br />
                      Sector 10, Nerul,<br />
                      Navi Mumbai – 400706, Maharashtra
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text mb-1">Contact</h4>
                    <p className="text-brand-text-muted">+91 98677 14984</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href="tel:+919867714984">Call Now</a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white" asChild>
                  <a href="https://maps.app.goo.gl/gPLBEP3yuJca34q97" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 h-[400px] lg:h-auto min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9367352355554!2d73.0135313!3d19.0225134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3c09b609c95%3A0x6b1007f35492211f!2sGoodwill%20Arcade!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ATHECS TUITION Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
