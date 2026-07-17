"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactUs() {
  const [formState, setFormState] = useState({ name: "", phone: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)
    setIsError(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Submission failed")
      setIsSuccess(true)
      setFormState({ name: "", phone: "", subject: "", message: "" })
      setTimeout(() => setIsSuccess(false), 5500)
    } catch (error) {
      setIsError(true)
      setTimeout(() => setIsError(false), 5500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50/40 via-white to-red-50/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50/80 via-white/70 to-red-50/80 pt-28 pb-16 relative overflow-hidden border-b border-slate-100">
        {/* Background watermark image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
          <Image
            src="/images/class_photos/c2.png"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-blue-100/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-red-100/20 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-650 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Have questions about our courses? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 flex-1">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/5 flex flex-col gap-5"
            >
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl p-7 text-white">
                <h3 className="text-xl font-bold mb-5">Quick Contact</h3>

                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Phone Numbers</p>
                    <div className="flex flex-col gap-2">
                      <a href="tel:+919867714984" className="flex items-center gap-2 text-white font-semibold hover:text-blue-200 transition-colors">
                        <Phone className="h-4 w-4 shrink-0" /> +91 98677 14984
                      </a>
                      <a href="tel:+918356809709" className="flex items-center gap-2 text-white font-semibold hover:text-blue-200 transition-colors">
                        <Phone className="h-4 w-4 shrink-0" /> +91 83568 09709
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl flex-1"
                      asChild
                    >
                      <a href="tel:+919867714984">Call Now</a>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl flex-1 gap-1"
                      asChild
                    >
                      <a href="https://wa.me/919867714984" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                  </div>

                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Email</p>
                    <a href="mailto:info@athecstuition.com" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
                      <Mail className="h-4 w-4 shrink-0" /> info@athecstuition.com
                    </a>
                  </div>

                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Office Hours</p>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="h-4 w-4 shrink-0 text-blue-200" />
                      <span className="text-sm">Mon – Sat: 10:00 AM – 9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locations */}
              {[
                {
                  label: "Nerul Branch",
                  address: "Goodwill Arcade, Office No. 15, Sector 10, Nerul, Navi Mumbai – 400706",
                  color: "border-blue-200 bg-blue-50",
                  iconColor: "text-blue-600 bg-blue-100",
                },
                {
                  label: "Sanpada Branch",
                  address: "Ground Floor, Office No. 7, Shiv Durga Apartment, Juinagar Rly Stn Road, Near DMart, Sector 10, Sanpada",
                  color: "border-red-200 bg-red-50",
                  iconColor: "text-red-600 bg-red-100",
                },
              ].map((branch, i) => (
                <div key={i} className={`rounded-2xl border p-5 ${branch.color}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${branch.iconColor}`}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mb-1">{branch.label}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{branch.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:w-3/5"
            >
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Send us a Message</h3>
                <p className="text-slate-500 text-sm mb-7">Fill out the form and we'll get back to you shortly.</p>

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3"
                  >
                    <Send className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-800">Message Sent Successfully!</h4>
                      <p className="text-sm text-emerald-700">Our team will get back to you shortly.</p>
                    </div>
                  </motion.div>
                )}

                {isError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-800">Submission Failed</h4>
                      <p className="text-sm text-red-700">Please try again or call us directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-slate-700 font-semibold text-sm">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="name" name="name" placeholder="e.g. Priya Sharma" required value={formState.name} onChange={handleChange} className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-slate-700 font-semibold text-sm">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input id="phone" name="phone" type="tel" placeholder="e.g. 9876543210" required value={formState.phone} onChange={handleChange} className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-slate-700 font-semibold text-sm">Subject</Label>
                    <Input id="subject" name="subject" placeholder="e.g. Inquiry about 10th standard batches" value={formState.subject} onChange={handleChange} className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-slate-700 font-semibold text-sm">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea id="message" name="message" placeholder="Tell us how we can help..." className="min-h-[140px] rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100 resize-none" required value={formState.message} onChange={handleChange} />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-12 font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[360px] w-full overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1784292584883!6m8!1m7!1s1jDZrjQJwCw3VxC2ukrphw!2m2!1d19.03669619356896!2d73.01734498988502!3f106.96228879023819!4f3.914949437396885!5f0.7820865974627469"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="ATHECS TUITION — Nerul Branch"
        />
      </section>
    </div>
  )
}
