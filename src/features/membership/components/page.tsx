'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Lock,
  MapPin,
  Building,
  Globe,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Download,
} from 'lucide-react';
import { registerGuestAction } from '../actions/registerGuestAction';

export default function GuestRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerGuestAction(null, formData);

    setIsLoading(false);

    if (result?.error) {
      setFeedback({ type: 'error', text: result.error });
    } else if (result?.success) {
      setFeedback({
        type: 'success',
        text: 'Registrazione completata con successo!',
      });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-[#E9ECEF] min-h-screen pb-20 font-sans text-slate-800">
      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        
        {/* HEADER TITLE */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Membership Application
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Registrati per accedere ai servizi esclusivi e rimanere aggiornato
          </p>
        </div>

        {/* REGISTRATION FORM CARD */}
        <div className="bg-[#F8F9FA] border border-slate-200 shadow-2xs rounded-xs p-6 md:p-10 space-y-6">
          
          {feedback && (
            <div
              className={`p-4 rounded-md flex items-center gap-3 text-xs font-semibold border transition-all ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle className="shrink-0 text-emerald-600" size={18} />
              ) : (
                <AlertCircle className="shrink-0 text-red-600" size={18} />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nome *
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="Mario"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cognome *
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Rossi"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email *
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="mario.rossi@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Indirizzo *
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="Via Roma, 12"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                />
              </div>
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Città *
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="city"
                    type="text"
                    required
                    placeholder="Milano"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Paese *
                </label>
                <div className="relative flex items-center">
                  <Globe className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                  <input
                    name="country"
                    type="text"
                    required
                    placeholder="Italia"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-white border border-slate-800 text-slate-900 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all shadow-2xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Registrazione in corso...</span>
                  </>
                ) : (
                  <span>Completa Registrazione</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}