"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormState({ name: "", phone: "", subject: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">Contact Us</h1>
          <p className="text-lg text-brand-text-muted">
            Have questions about our courses or admissions? We'd love to hear from you. Get in touch with our team today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Contact Details */}
            <div className="lg:w-1/3 flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
              >
                <h3 className="text-2xl font-bold text-brand-text mb-6">Get In Touch</h3>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text mb-1">Phone Number</h4>
                      <p className="text-brand-text-muted mb-2">+91 98677 14984</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                          <a href="tel:+919867714984">Call Now</a>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" asChild>
                          <a href="https://wa.me/919867714984" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-3 w-3 mr-1" /> WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text mb-1">Our Location</h4>
                      <p className="text-brand-text-muted leading-relaxed">
                        Goodwill Arcade, Office No. 15, Sector 10, Nerul, Navi Mumbai – 400706, Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text mb-1">Email Address</h4>
                      <p className="text-brand-text-muted">info@athecstuition.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text mb-1">Office Hours</h4>
                      <p className="text-brand-text-muted">Mon - Sat: 9:00 AM - 8:00 PM</p>
                      <p className="text-brand-text-muted">Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200"
              >
                <h3 className="text-2xl font-bold text-brand-text mb-6">Send us a Message</h3>
                
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3">
                    <div className="mt-0.5"><Send className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-bold">Message Sent Successfully!</h4>
                      <p className="text-sm">Thank you for contacting us. Our team will get back to you shortly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="e.g. John Doe" 
                        required 
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="e.g. 9876543210" 
                        required 
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="e.g. Inquiry about 10th standard batches" 
                      value={formState.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Type your message here..." 
                      className="min-h-[150px]"
                      required 
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full md:w-auto min-w-[200px]" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9367352355554!2d73.0135313!3d19.0225134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3c09b609c95%3A0x6b1007f35492211f!2sGoodwill%20Arcade!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ATHECS TUITION Location"
        ></iframe>
      </section>
    </div>
  )
}
