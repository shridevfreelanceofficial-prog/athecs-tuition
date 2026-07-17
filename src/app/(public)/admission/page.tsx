"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, GraduationCap, BookOpen, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const admissionSchema = z.object({
  studentName: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  parentName: z.string().min(2, { message: "Parent name must be at least 2 characters." }),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, { message: "Mobile number must be exactly 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  grade: z.string().min(1, { message: "Please enter the class/grade." }),
  schoolName: z.string().min(2, { message: "School name is required." }),
  message: z.string().optional(),
})

type AdmissionFormValues = z.infer<typeof admissionSchema>

const highlights = [
  { icon: <GraduationCap className="h-5 w-5" />, text: "Expert CBSE-specialized faculty", color: "text-blue-600 bg-blue-50" },
  { icon: <Users className="h-5 w-5" />, text: "Small batches, personal attention", color: "text-red-600 bg-red-50" },
  { icon: <BookOpen className="h-5 w-5" />, text: "Comprehensive study material", color: "text-amber-600 bg-amber-50" },
  { icon: <Star className="h-5 w-5" />, text: "95%+ board exam pass rate", color: "text-emerald-600 bg-emerald-50" },
]

export default function Admission() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
  })

  const onSubmit = async (data: AdmissionFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const resData = await response.json()
      if (!response.ok) throw new Error(resData.error || "Submission failed")
      setIsSubmitting(false)
      setSubmitStatus("success")
      reset()
      setTimeout(() => setSubmitStatus("idle"), 5500)
    } catch (error) {
      setIsSubmitting(false)
      setSubmitStatus("error")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-red-50/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50/80 via-white/70 to-red-50/80 pt-28 pb-16 relative overflow-hidden border-b border-slate-100">
        {/* Background watermark image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
          <Image
            src="/images/class_photos/c1.png"
            alt="Admission Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-blue-100/20 blur-3xl" />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-650 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Admissions Open
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Apply for Admission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Take the first step towards academic excellence.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Why Join sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/5 flex flex-col gap-5"
            >
              <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl p-7 text-white">
                <h3 className="text-xl font-bold mb-2">Why Join ATHECS?</h3>
                <p className="text-blue-200 text-sm mb-5">Leading CBSE coaching center in Navi Mumbai since 2016.</p>
                <div className="flex flex-col gap-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                      <div className="p-2 bg-white/20 rounded-lg shrink-0">{h.icon}</div>
                      <span className="text-sm font-semibold text-white">{h.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Need Help?</p>
                <p className="text-slate-700 font-semibold text-sm mb-3">Call us directly to know more about our batches and timings.</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+919867714984" className="flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-colors text-sm">
                    <div className="p-1.5 bg-blue-100 rounded-lg"><GraduationCap className="h-3.5 w-3.5" /></div>
                    +91 98677 14984
                  </a>
                  <a href="tel:+918356809709" className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm">
                    <div className="p-1.5 bg-blue-50 rounded-lg"><GraduationCap className="h-3.5 w-3.5" /></div>
                    +91 83568 09709
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:w-3/5"
            >
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Application Form</h3>
                <p className="text-slate-500 text-sm mb-7">Fields marked with <span className="text-red-500">*</span> are required.</p>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-7 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4"
                  >
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 shrink-0">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-800 mb-1">Application Submitted!</h3>
                      <p className="text-emerald-700 text-sm">We received your application and will contact you shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-7 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-800">Submission Failed</h4>
                      <p className="text-sm text-red-700">Please try again or call us directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { id: "studentName", label: "Student Name", placeholder: "Full name of student", required: true },
                      { id: "parentName", label: "Parent / Guardian Name", placeholder: "Full name of parent", required: true },
                      { id: "mobileNumber", label: "Mobile Number", placeholder: "10-digit number", required: true },
                      { id: "email", label: "Email Address", placeholder: "Enter email address", required: true, type: "email" },
                      { id: "grade", label: "Class / Grade", placeholder: "e.g. 10th CBSE", required: true },
                      { id: "schoolName", label: "Current School", placeholder: "Enter school name", required: true },
                    ].map((field) => (
                      <div key={field.id} className="space-y-1.5">
                        <Label htmlFor={field.id} className="text-slate-700 font-semibold text-sm">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          id={field.id}
                          type={(field as any).type || "text"}
                          placeholder={field.placeholder}
                          className={`rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100 ${(errors as any)[field.id] ? "border-red-400" : ""}`}
                          {...register(field.id as keyof AdmissionFormValues)}
                        />
                        {(errors as any)[field.id] && (
                          <p className="text-red-500 text-xs mt-1">{(errors as any)[field.id]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-slate-700 font-semibold text-sm">
                      Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific requirements or questions..."
                      className="min-h-[110px] rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-100 resize-none"
                      {...register("message")}
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">By submitting, you agree to our terms and conditions.</p>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
