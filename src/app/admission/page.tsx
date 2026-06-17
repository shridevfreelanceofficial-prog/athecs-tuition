"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle } from "lucide-react"

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

export default function Admission() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
  })

  const onSubmit = (data: AdmissionFormValues) => {
    setIsSubmitting(true)
    
    // Simulate API submission
    setTimeout(() => {
      console.log("Form submitted:", data)
      setIsSubmitting(false)
      setSubmitStatus("success")
      reset()
      
      // Reset success message
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-primary text-sm font-bold tracking-wider"
          >
            ADMISSIONS OPEN
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-brand-text mb-4"
          >
            Apply for Admission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-text-muted max-w-2xl mx-auto"
          >
            Take the first step towards academic excellence. Fill out the form below and our team will get back to you with the next steps.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            {submitStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
              >
                <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-1">Application Submitted!</h3>
                  <p className="text-green-700">Thank you for your interest in ATHECS TUITION. We have received your application and will contact you shortly.</p>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-800">Something went wrong</h4>
                  <p className="text-sm text-red-700">Failed to submit your application. Please try again or call us directly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="studentName" 
                    placeholder="Enter student's full name" 
                    className={errors.studentName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("studentName")}
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="parentName" 
                    placeholder="Enter parent's full name" 
                    className={errors.parentName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("parentName")}
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number <span className="text-red-500">*</span></Label>
                  <Input 
                    id="mobileNumber" 
                    placeholder="10-digit mobile number" 
                    className={errors.mobileNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("mobileNumber")}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="Enter email address" 
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Class / Grade <span className="text-red-500">*</span></Label>
                  <Input 
                    id="grade" 
                    placeholder="e.g. 10th CBSE" 
                    className={errors.grade ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("grade")}
                  />
                  {errors.grade && (
                    <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolName">Current School Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="schoolName" 
                    placeholder="Enter school name" 
                    className={errors.schoolName ? "border-red-500 focus-visible:ring-red-500" : ""}
                    {...register("schoolName")}
                  />
                  {errors.schoolName && (
                    <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Any Specific Requirements / Questions? (Optional)</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us if you have any specific needs..." 
                  className="min-h-[120px]"
                  {...register("message")}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500">
                  By submitting this form, you agree to our terms and conditions.
                </p>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[200px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
