"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Mail,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Admission {
  id: number;
  student_name: string;
  parent_name: string;
  mobile_number: string;
  email: string;
  grade: string;
  school_name: string;
  message: string;
  created_at: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Result {
  id: number;
  title: string;
  batch: string;
  category: string;
  image: string;
}

interface ActivityImage {
  id: number;
  image_url: string;
}

interface Activity {
  id: number;
  title: string;
  created_at: string;
  images: ActivityImage[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"admissions" | "contacts" | "results" | "activities">("admissions");

  // Data states
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Search filter lists
  const [searchTerm, setSearchTerm] = useState("");

  // Create form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Results Form
  const [resTitle, setResTitle] = useState("");
  const [resBatch, setResBatch] = useState("");
  const [resCategoryType, setResCategoryType] = useState<"existing" | "new">("existing");
  const [resCategory, setResCategory] = useState("");
  const [resNewCategory, setResNewCategory] = useState("");
  const [resImage, setResImage] = useState<File | null>(null);

  // Activities Form
  const [actTitle, setActTitle] = useState("");
  const [actImages, setActImages] = useState<FileList | null>(null);

  // Add images to existing activity Form
  const [addImagesActId, setAddImagesActId] = useState<number | null>(null);
  const [addImagesFiles, setAddImagesFiles] = useState<FileList | null>(null);

  // Loading States
  const [isLoading, setIsLoading] = useState(true);

  // Fetch functions
  const fetchAdmissions = async () => {
    try {
      const res = await fetch("/api/admin/admissions");
      if (res.ok) {
        const data = await res.json();
        setAdmissions(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/admin/results");
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/admin/activities");
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([fetchAdmissions(), fetchContacts(), fetchResults(), fetchActivities()]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Actions
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAdmission = async (id: number) => {
    if (!confirm("Are you sure you want to delete this admission log?")) return;
    try {
      const res = await fetch(`/api/admin/admissions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAdmissions((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact log?")) return;
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteResult = async (id: number) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      const res = await fetch(`/api/admin/results?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setResults((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteActivity = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entire activity and all its images?")) return;
    try {
      const res = await fetch(`/api/admin/activities?activityId=${id}`, { method: "DELETE" });
      if (res.ok) {
        setActivities((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteActivityImage = async (imageId: number, activityId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/admin/activities?imageId=${imageId}`, { method: "DELETE" });
      if (res.ok) {
        setActivities((prev) =>
          prev.map((act) => {
            if (act.id === activityId) {
              return { ...act, images: act.images.filter((img) => img.id !== imageId) };
            }
            return act;
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit handlers
  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle || !resBatch || !resImage) return;

    const chosenCategory = resCategoryType === "new" ? resNewCategory : resCategory;
    if (!chosenCategory) {
      setSubmitMsg({ type: "error", text: "Please supply a category" });
      return;
    }

    setIsSubmitting(true);
    setSubmitMsg(null);

    const formData = new FormData();
    formData.append("title", resTitle);
    formData.append("batch", resBatch);
    formData.append("category", chosenCategory);
    formData.append("image", resImage);

    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add result");

      setSubmitMsg({ type: "success", text: "Successfully added new dynamic result!" });
      setResTitle("");
      setResBatch("");
      setResNewCategory("");
      setResImage(null);
      // Reset file input
      const fileInput = document.getElementById("resImage") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      fetchResults();
    } catch (err: any) {
      setSubmitMsg({ type: "error", text: err.message || "Failed to add result" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle || !actImages || actImages.length === 0) return;

    setIsSubmitting(true);
    setSubmitMsg(null);

    const formData = new FormData();
    formData.append("title", actTitle);
    for (let i = 0; i < actImages.length; i++) {
      formData.append("images", actImages[i]);
    }

    try {
      const res = await fetch("/api/admin/activities", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create activity");

      setSubmitMsg({ type: "success", text: "Successfully created activity and uploaded photos!" });
      setActTitle("");
      setActImages(null);
      // Reset files input
      const filesInput = document.getElementById("actImages") as HTMLInputElement;
      if (filesInput) filesInput.value = "";

      fetchActivities();
    } catch (err: any) {
      setSubmitMsg({ type: "error", text: err.message || "Failed to save activity" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddImagesToExistingActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addImagesActId || !addImagesFiles || addImagesFiles.length === 0) return;

    setIsSubmitting(true);
    setSubmitMsg(null);

    const activity = activities.find((a) => a.id === addImagesActId);
    if (!activity) return;

    const formData = new FormData();
    formData.append("title", activity.title);
    for (let i = 0; i < addImagesFiles.length; i++) {
      formData.append("images", addImagesFiles[i]);
    }

    try {
      const res = await fetch("/api/admin/activities", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add images");

      setSubmitMsg({ type: "success", text: "Images added successfully to existing activity!" });
      setAddImagesFiles(null);
      setAddImagesActId(null);
      const filesInput = document.getElementById("addImagesFiles") as HTMLInputElement;
      if (filesInput) filesInput.value = "";

      fetchActivities();
    } catch (err: any) {
      setSubmitMsg({ type: "error", text: err.message || "Failed to append images" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get distinct categories in database for the results dropdown
  const uniqueResultCategories = Array.from(new Set(results.map((r) => r.category)));

  // String formatting helper for WhatsApp links
  const getWhatsAppAdmissionUrl = (mobile: string, parent: string, student: string, grade: string) => {
    // Treat as India phone number if 10-digit
    const fullNumber = mobile.length === 10 ? `91${mobile}` : mobile.replace(/\+/g, "");
    const textMsg = `Hello ${parent} / ${student},\n\nThank you for applying to ATHECS Tuition for Class ${grade}. We have received your admission form, and we are excited to contact you. Please let us know a convenient time to speak.\n\nBest regards,\nATHECS Tuition`;
    return `https://wa.me/${fullNumber}?text=${encodeURIComponent(textMsg)}`;
  };

  const getWhatsAppContactUrl = (mobile: string, name: string, subject: string, message: string) => {
    const fullNumber = mobile.length === 10 ? `91${mobile}` : mobile.replace(/\+/g, "");
    const textMsg = `Hello ${name},\n\nThank you for reaching out to ATHECS Tuition regarding '${subject}'. We have received your inquiry: "${message}". How can we assist you further today?\n\nBest regards,\nATHECS Tuition`;
    return `https://wa.me/${fullNumber}?text=${encodeURIComponent(textMsg)}`;
  };

  const getPhoneCallUrl = (mobile: string) => {
    const cleanNum = mobile.replace(/\s+/g, "");
    return cleanNum.length === 10 ? `tel:+91${cleanNum}` : `tel:${cleanNum}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Control bar */}
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ATHECS ACADEMY</h1>
              <p className="text-xs text-slate-400">Admin Control Console</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 active:bg-white/20 rounded-xl text-slate-300 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Console Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Console Tab Selector */}
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px mb-8">
          <button
            onClick={() => {
              setActiveTab("admissions");
              setSearchTerm("");
              setSubmitMsg(null);
            }}
            className={`px-5 py-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "admissions"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Admissions</span>
            {admissions.length > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                {admissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("contacts");
              setSearchTerm("");
              setSubmitMsg(null);
            }}
            className={`px-5 py-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "contacts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Log</span>
            {contacts.length > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                {contacts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("results");
              setSearchTerm("");
              setSubmitMsg(null);
            }}
            className={`px-5 py-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "results"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>Manage Results</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("activities");
              setSearchTerm("");
              setSubmitMsg(null);
            }}
            className={`px-5 py-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "activities"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Manage Activities</span>
          </button>
        </div>

        {/* Global Notifications box */}
        {submitMsg && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-start gap-3 max-w-2xl ${
              submitMsg.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {submitMsg.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            )}
            <div className="text-sm font-medium">{submitMsg.text}</div>
            <button onClick={() => setSubmitMsg(null)} className="ml-auto text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="block animate-spin border-4 border-slate-300 border-t-blue-600 rounded-full h-12 w-12 mb-4"></span>
            <p className="font-semibold text-slate-600">Fetching administrative records...</p>
          </div>
        ) : (
          <div className="w-full">
            {/* TABS CONTAINER */}

            {/* ====== ADMISSIONS TAB ====== */}
            {activeTab === "admissions" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Admission Applications</h2>
                    <p className="text-slate-500 text-sm">Review details of students applying online</p>
                  </div>
                  <div className="relative max-w-sm w-full">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <Input
                      type="text"
                      placeholder="Search applications..."
                      className="pl-9 bg-white border-slate-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {admissions.length === 0 ? (
                  <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-800 text-lg mb-1">No Applications Yet</h3>
                    <p className="text-slate-500">Student submissions will be displayed here when logged.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {admissions
                      .filter(
                        (item) =>
                          item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.grade.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-150 relative overflow-hidden flex flex-col md:flex-row justify-between gap-6"
                        >
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                Class {item.grade}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                {new Date(item.created_at).toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-slate-800">{item.student_name}</h3>
                              <p className="text-slate-600 text-sm font-medium mt-1">
                                Parent: <span className="text-slate-900 font-semibold">{item.parent_name}</span>
                              </p>
                              <p className="text-slate-600 text-sm font-medium">
                                School: <span className="text-slate-900">{item.school_name}</span>
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 pt-1 border-t border-slate-50">
                              <span className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-400" />
                                <a href={getPhoneCallUrl(item.mobile_number)} className="hover:text-blue-600 font-medium">
                                  {item.mobile_number}
                                </a>
                              </span>
                              <span className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <a href={`mailto:${item.email}`} className="hover:text-blue-600">
                                  {item.email}
                                </a>
                              </span>
                            </div>

                            {item.message && (
                              <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm border-l-4 border-slate-350">
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                                  Queries / Message
                                </p>
                                "{item.message}"
                              </div>
                            )}
                          </div>

                          <div className="flex md:flex-col justify-end items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                            <Button
                              asChild
                              size="default"
                              className="bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <a
                                href={getWhatsAppAdmissionUrl(
                                  item.mobile_number,
                                  item.parent_name,
                                  item.student_name,
                                  item.grade
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageSquare className="h-4 w-4" /> Whatsapp Msg
                              </a>
                            </Button>

                            <Button
                              asChild
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50 active:bg-blue-100 w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <a href={getPhoneCallUrl(item.mobile_number)}>
                                <Phone className="h-4 w-4" /> Call Now
                              </a>
                            </Button>

                            <Button
                              variant="outline"
                              onClick={() => handleDeleteAdmission(item.id)}
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-150 w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" /> Delete Log
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* ====== CONTACTS TAB ====== */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Inquiry logs</h2>
                    <p className="text-slate-500 text-sm">Review details of messages submitted</p>
                  </div>
                  <div className="relative max-w-sm w-full">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <Input
                      type="text"
                      placeholder="Search inquiries..."
                      className="pl-9 bg-white border-slate-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {contacts.length === 0 ? (
                  <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                    <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-800 text-lg mb-1">No Inquiries Found</h3>
                    <p className="text-slate-500">Contact form entries will appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {contacts
                      .filter(
                        (item) =>
                          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.message.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-150 relative overflow-hidden flex flex-col md:flex-row justify-between gap-6"
                        >
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-400 flex items-center gap-1.55">
                                <Calendar className="h-3 w-3" />
                                {new Date(item.created_at).toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                              <p className="text-blue-600 text-sm font-semibold mt-1">
                                Subject: <span className="text-slate-800 font-semibold">{item.subject || "General Inquiry"}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600 pt-1">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <a href={getPhoneCallUrl(item.phone)} className="hover:text-blue-600 font-medium font-mono">
                                {item.phone}
                              </a>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm border-l-4 border-slate-350">
                              <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                                Message Details
                              </p>
                              "{item.message}"
                            </div>
                          </div>

                          <div className="flex md:flex-col justify-end items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                            <Button
                              asChild
                              size="default"
                              className="bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <a
                                href={getWhatsAppContactUrl(
                                  item.phone,
                                  item.name,
                                  item.subject || "Tuition Details",
                                  item.message
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageSquare className="h-4 w-4" /> Whatsapp Msg
                              </a>
                            </Button>

                            <Button
                              asChild
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50 active:bg-blue-100 w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <a href={getPhoneCallUrl(item.phone)}>
                                <Phone className="h-4 w-4" /> Call Now
                              </a>
                            </Button>

                            <Button
                              variant="outline"
                              onClick={() => handleDeleteContact(item.id)}
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-150 w-full md:w-44 rounded-xl flex items-center justify-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" /> Delete Log
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* ====== RESULTS TAB ====== */}
            {activeTab === "results" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form column (Left) */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Plus className="h-5 w-5 text-blue-600" /> Add New Result
                    </h3>

                    <form onSubmit={handleAddResult} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-700 font-medium">
                          Result Title/Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="title"
                          placeholder="e.g. Subject Toppers 25-26"
                          required
                          value={resTitle}
                          onChange={(e) => setResTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="batch" className="text-slate-700 font-medium block">
                          Batch Years <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="batch"
                          placeholder="e.g. 24-25 or 25-26"
                          required
                          value={resBatch}
                          onChange={(e) => setResBatch(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium block">Category Selection</Label>
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-slate-700">
                            <input
                              type="radio"
                              name="catType"
                              checked={resCategoryType === "existing"}
                              onChange={() => setResCategoryType("existing")}
                            />
                            Choose Existing
                          </label>
                          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-slate-700">
                            <input
                              type="radio"
                              name="catType"
                              checked={resCategoryType === "new"}
                              onChange={() => setResCategoryType("new")}
                            />
                            Create New Category
                          </label>
                        </div>

                        {resCategoryType === "existing" ? (
                          <select
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white outline-none text-slate-750 text-sm font-medium"
                            value={resCategory}
                            onChange={(e) => setResCategory(e.target.value)}
                          >
                            <option value="">Select pre-existing category...</option>
                            {uniqueResultCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            placeholder="Enter new category name"
                            required={resCategoryType === "new"}
                            value={resNewCategory}
                            onChange={(e) => setResNewCategory(e.target.value)}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resImage" className="text-slate-700 font-medium block">
                          Result Image / Photo (Stored in Vercel Blob) <span className="text-red-500">*</span>
                        </Label>
                        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 transition-colors flex flex-col items-center bg-slate-50 relative cursor-pointer">
                          <input
                            id="resImage"
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => setResImage(e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-500 font-medium text-center">
                            {resImage ? (
                              <span className="text-blue-600 font-semibold">{resImage.name}</span>
                            ) : (
                              "Click or drag file here to upload"
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or WebP (Max 5MB)</p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-750 text-white rounded-xl py-5 font-bold shadow-md shadow-blue-500/10"
                      >
                        {isSubmitting ? "Uploading To Blob & DB..." : "Add Result"}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Dashboard grid (Right) */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dynamic Academic Records</h2>
                    <p className="text-slate-500 text-sm">Current student results loaded from the database</p>
                  </div>

                  {results.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
                      <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-550">No academic results logs found in database.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.map((result) => (
                        <div
                          key={result.id}
                          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                          <div className="relative aspect-video w-full bg-slate-50 flex items-center justify-center p-2">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="p-5 border-t border-slate-100 flex items-start justify-between gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                  {result.category}
                                </span>
                                <span className="bg-blue-50 text-blue-750 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Batch {result.batch}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-base">{result.title}</h4>
                            </div>
                            <button
                              onClick={() => handleDeleteResult(result.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 active:bg-red-100 p-2.5 rounded-lg transition shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ====== ACTIVITIES TAB ====== */}
            {activeTab === "activities" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Forms column (Left) */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Create New Activity Form */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Plus className="h-5 w-5 text-blue-600" /> Create Activity Card
                    </h3>

                    <form onSubmit={handleAddActivity} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="actTitle" className="text-slate-700 font-medium">
                          Activity Name / Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="actTitle"
                          placeholder="e.g. Wet N Joy Trip 2026"
                          required
                          value={actTitle}
                          onChange={(e) => setActTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="actImages" className="text-slate-700 font-medium block">
                          Upload Multiple Images (Stores in Vercel Blob) <span className="text-red-500">*</span>
                        </Label>
                        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 transition-colors flex flex-col items-center bg-slate-50 relative cursor-pointer">
                          <input
                            id="actImages"
                            type="file"
                            multiple
                            accept="image/*"
                            required
                            onChange={(e) => setActImages(e.target.files)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-500 font-medium text-center">
                            {actImages && actImages.length > 0 ? (
                              <span className="text-blue-600 font-semibold">{actImages.length} images selected</span>
                            ) : (
                              "Click or drag multiple files here"
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or WebP (Max 5MB each)</p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-750 text-white rounded-xl py-5 font-bold shadow-md shadow-blue-500/10"
                      >
                        {isSubmitting ? "Uploading To Blob & DB..." : "Create Activity"}
                      </Button>
                    </form>
                  </div>

                  {/* Append Images to Existing Activity Form */}
                  {activities.length > 0 && (
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-indigo-650" /> Add Photos to Existing
                      </h3>

                      <form onSubmit={handleAddImagesToExistingActivity} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium block">Select Activity</Label>
                          <select
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white outline-none text-slate-750 text-sm font-medium"
                            value={addImagesActId || ""}
                            onChange={(e) => setAddImagesActId(Number(e.target.value) || null)}
                            required
                          >
                            <option value="">Choose activity name...</option>
                            {activities.map((act) => (
                              <option key={act.id} value={act.id}>
                                {act.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="addImagesFiles" className="text-slate-700 font-medium block">
                            Appends New Images <span className="text-red-500">*</span>
                          </Label>
                          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-4 transition-colors flex flex-col items-center bg-slate-50 relative cursor-pointer">
                            <input
                              id="addImagesFiles"
                              type="file"
                              multiple
                              accept="image/*"
                              required
                              onChange={(e) => setAddImagesFiles(e.target.files)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                            <p className="text-xs text-slate-500 font-medium text-center">
                              {addImagesFiles && addImagesFiles.length > 0 ? (
                                <span className="text-indigo-600 font-semibold">
                                  {addImagesFiles.length} files selected
                                </span>
                              ) : (
                                "Click or drag files here"
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or WebP (Max 5MB each)</p>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || !addImagesActId}
                          className="w-full bg-slate-800 hover:bg-slate-750 active:bg-slate-900 text-white rounded-xl py-5 font-bold shadow-md"
                        >
                          {isSubmitting ? "Uploading To Blob & DB..." : "Append Photos"}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Dashboard grid (Right) */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dynamic Activity Folders</h2>
                    <p className="text-slate-500 text-sm">Holiday events, trips, and achievements</p>
                  </div>

                  {activities.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
                      <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-550">No activities found in database.</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {activities.map((act) => (
                        <div
                          key={act.id}
                          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">{act.title}</h3>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">
                                Photos count: <span className="text-slate-700 font-bold">{act.images?.length || 0}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteActivity(act.id)}
                              className="text-red-500 hover:text-red-750 hover:bg-red-50 p-2.5 rounded-lg transition text-sm flex items-center gap-1 font-semibold"
                            >
                              <Trash2 className="h-4.5 w-4.5" /> Delete Activity
                            </button>
                          </div>

                          {act.images.length === 0 ? (
                            <p className="text-sm text-slate-450 italic py-4">No images exist in this folder.</p>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                              {act.images.map((img) => (
                                <div
                                  key={img.id}
                                  className="relative aspect-square rounded-xl overflow-hidden group bg-slate-50 border border-slate-100"
                                >
                                  <img
                                    src={img.image_url}
                                    alt="Activity snap"
                                    className="h-full w-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <button
                                      onClick={() => handleDeleteActivityImage(img.id, act.id)}
                                      className="bg-white text-red-650 hover:bg-red-50 p-2 rounded-full shadow-lg transition"
                                      title="Delete Image"
                                    >
                                      <Trash2 className="h-4.5 w-4.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
