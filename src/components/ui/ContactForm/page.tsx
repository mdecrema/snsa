"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/src/features/contacts/actions/submitContactForm";

const SUBJECT_OPTIONS = [
  "Membership",
  "Quality Mark",
  "Start-up Incubator",
  "Events",
  "Partnership",
  "Media",
  "Other",
];

interface ContactFormDict {
  title: string,
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  phone: string,
  subject: string,
  privacyDesc1: string,
  privacyPolicy: string,
  privacyDesc2: string,
  buttonText: string,
  successMessage: {
    title: string,
    description: string,
    buttonText: string
  }
}


interface Props {
  dict: ContactFormDict;
}

export default function ContactForm({dict}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    email: "",
    phone: "",
    subject: "Membership",
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Chiamata alla Server Action
      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.error || "Si è verificato un errore.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Errore di connessione. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-2xl p-8 md:p-10 bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl transition-all">
      {/* Glow d'effetto subtle in secondo piano */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <h3 className="font-cabinet text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-6">
        {dict.title}
      </h3>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto animate-bounce" />
          <h4 className="font-cabinet text-2xl font-bold text-gray-900">
            {dict.successMessage.title}
          </h4>
          <p className="font-inter text-sm text-gray-600 max-w-sm mx-auto">
            {dict.successMessage.description}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-xs font-mono font-bold text-accent underline tracking-wider uppercase hover:opacity-80"
          >
            {dict.successMessage.buttonText}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Mostra eventuali errori di invio */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-inter">
              {errorMessage}
            </div>
          )}
          {/* Grid per Name & Surname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                {dict.firstName} *
              </label>
              <input
                type="text"
                required
                placeholder="John"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                {dict.lastName} *
              </label>
              <input
                type="text"
                required
                placeholder="Doe"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs"
              />
            </div>
          </div>

          {/* Company / Organisation */}
          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
              {dict.company}
            </label>
            <input
              type="text"
              placeholder="Swiss BioTech Labs"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs"
            />
          </div>

          {/* Grid per Email, Phone e Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                {dict.email} *
              </label>
              <input
                type="email"
                required
                placeholder="john@domain.ch"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                {dict.phone}
              </label>
              <input
                type="tel"
                placeholder="+41 00 000 00 00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs"
              />
            </div>
          </div>

          {/* Menu a Tendina (Subject Select) */}
          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
              {dict.subject} *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 focus:border-accent focus:bg-white focus:outline-none transition-all text-sm text-gray-900 shadow-2xs cursor-pointer"
            >
              {SUBJECT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-2 flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              required
              checked={formData.privacyConsent}
              onChange={(e) =>
                setFormData({ ...formData, privacyConsent: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent cursor-pointer"
            />
            <label htmlFor="privacy" className="text-xs font-inter leading-relaxed text-gray-700 cursor-pointer">
              {dict.privacyDesc1}{" "}
              <a href="/privacy" className="underline font-semibold hover:text-accent">
                {dict.privacyPolicy}
              </a>{" "}
              {dict.privacyDesc2}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-accent text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>{dict.buttonText}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}