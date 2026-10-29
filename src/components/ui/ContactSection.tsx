"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { scifiAudio } from "@/lib/audio";

interface ContactSectionProps {
  onOpenVideo?: () => void;
}

export function ContactSection({ onOpenVideo }: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    industry: "Class-A Commercial Office Towers",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scifiAudio.playHoloBeep(950, 0.1);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      scifiAudio.playHoloBeep(1200, 0.15);
    }, 600);
  };

  return (
    <section
      id="contact-us"
      className="relative z-20 bg-[#1A6C89] px-6 sm:px-10 lg:px-16 py-20 sm:py-28 text-white selection:bg-[#38BDF8] selection:text-[#082230] border-t border-[#38BDF8]/30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================
              LEFT COLUMN: Contact Us Details & Direct Channels
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Main Headline */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Contact Us
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-base sm:text-lg text-[#E0F2FE] leading-relaxed max-w-md mb-8">
                Tell us a little bit about who you are, and we'll tell you a whole lot more about who we are.
              </p>

              {/* Section 1: Talk to our team today */}
              <div className="mb-10">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                  Talk to our team today
                </h3>
                <ol className="space-y-3 font-sans text-sm sm:text-base text-[#E0F2FE]/90 leading-relaxed list-decimal list-inside pl-1">
                  <li>Understanding how our franchise model fulfills your commercial growth</li>
                  <li>Discover prime acquisition capabilities and get answers to your questions</li>
                  <li>Receive a customized franchise territory and capital quote</li>
                </ol>
              </div>

              {/* Section 2: Find The Property Franchise Group */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-5">
                  Find The Property Franchise Group
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B254A] border border-[#38BDF8]/40 text-[#38BDF8] shadow-sm">
                      <MapPin className="h-5 w-5 text-[#38BDF8]" />
                    </div>
                    <span className="font-sans text-sm sm:text-base text-white font-medium leading-snug">
                      Level 42, International Commercial Tower, Sydney CBD, NSW 2000
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B254A] border border-[#38BDF8]/40 text-[#38BDF8] shadow-sm">
                      <Phone className="h-5 w-5 text-[#38BDF8]" />
                    </div>
                    <a
                      href="tel:+13108449200"
                      className="font-sans text-sm sm:text-base text-white font-bold hover:text-[#38BDF8] transition-colors"
                    >
                      (603) 555-0123 / +1 (310) 844-9200
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B254A] border border-[#38BDF8]/40 text-[#38BDF8] shadow-sm">
                      <Mail className="h-5 w-5 text-[#38BDF8]" />
                    </div>
                    <a
                      href="mailto:contact@thepropertyfranchise.com"
                      className="font-sans text-sm sm:text-base text-white font-bold hover:text-[#38BDF8] transition-colors"
                    >
                      contact@thepropertyfranchise.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Elevated Form Card Matching Screenshot
             ======================================================== */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border-2 border-[#38BDF8]/40 bg-[#0B254A] p-7 sm:p-10 shadow-[0_20px_60px_rgba(7,25,39,0.7)] text-white">
              {formSubmitted ? (
                <div className="py-14 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0E72C4] text-white border-2 border-[#38BDF8]/40 shadow-lg">
                    <CheckCircle2 className="h-8 w-8 text-[#38BDF8]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-serif font-bold text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#E0F2FE] max-w-md font-sans">
                    Thank you for reaching out to The Property Franchise. One of our commercial directors will review your inquiry and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        companyName: "",
                        industry: "Class-A Commercial Office Towers",
                        message: "",
                      });
                    }}
                    className="mt-8 rounded-2xl border-2 border-[#38BDF8]/40 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0B254A] hover:bg-[#E0F2FE] transition-colors cursor-pointer shadow-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-sm font-bold text-white mb-1.5">
                        First Name <span className="text-[#38BDF8]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Your Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white placeholder-white/45 focus:border-[#38BDF8] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-bold text-white mb-1.5">
                        Last Name <span className="text-[#38BDF8]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter Your Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white placeholder-white/45 focus:border-[#38BDF8] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Your Email */}
                  <div>
                    <label className="block font-sans text-sm font-bold text-white mb-1.5">
                      Your Email <span className="text-[#38BDF8]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white placeholder-white/45 focus:border-[#38BDF8] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Row 3: Company Name */}
                  <div>
                    <label className="block font-sans text-sm font-bold text-white mb-1.5">
                      Company Name <span className="text-[#38BDF8]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Company Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white placeholder-white/45 focus:border-[#38BDF8] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Row 4: Industry */}
                  <div>
                    <label className="block font-sans text-sm font-bold text-white mb-1.5">
                      Industry <span className="text-[#38BDF8]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full appearance-none rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white focus:border-[#38BDF8] focus:outline-none transition-colors cursor-pointer pr-10"
                      >
                        <option className="bg-[#071F2F] text-white">Class-A Commercial Office Towers</option>
                        <option className="bg-[#071F2F] text-white">Corporate Business Campuses</option>
                        <option className="bg-[#071F2F] text-white">Industrial & Logistics Hubs</option>
                        <option className="bg-[#071F2F] text-white">Commercial Retail Complexes</option>
                        <option className="bg-[#071F2F] text-white">Franchise Territory Licensing</option>
                        <option className="bg-[#071F2F] text-white">Commercial Capital Syndication</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#38BDF8]">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Your Message */}
                  <div>
                    <label className="block font-sans text-sm font-bold text-white mb-1.5">
                      Your Message <span className="text-[#38BDF8]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Enter Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border-2 border-[#38BDF8]/30 bg-[#071F2F] px-4 py-3 font-sans text-sm text-white placeholder-white/45 focus:border-[#38BDF8] focus:outline-none transition-colors resize-y min-h-[110px]"
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-[#E0F2FE] text-[#0B254A] py-4 font-sans text-base font-bold shadow-[0_4px_24px_rgba(255,255,255,0.35)] transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B254A] border-t-transparent" />
                          Sending Message...
                        </span>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-[#0E72C4]" />
                          <span>Send Message</span>
                          <ArrowRight className="h-4 w-4 ml-1 text-[#0E72C4]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}