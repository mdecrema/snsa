'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Country, City } from 'country-state-city';
import {
  User,
  Mail,
  Lock,
  MapPin,
  Building,
  Globe,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { registerGuestAction } from '../actions/registerGuestAction';
import PageHeader from '@/src/components/ui/PageHeader/page';

export default function GuestRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Location State
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Memoize Countries & Cities list to avoid recalculating on every render
  const countries = useMemo(() => Country.getAllCountries(), []);

  const cities = useMemo(() => {
    if (!selectedCountryCode) return [];
    return City.getCitiesOfCountry(selectedCountryCode) || [];
  }, [selectedCountryCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);

    // Get full country name from the selected ISO code for submission
    const selectedCountryObj = Country.getCountryByCode(selectedCountryCode);
    if (selectedCountryObj) {
      formData.set('country', selectedCountryObj.name);
    }

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
      setSelectedCountryCode('');
      setSelectedCity('');
    }
  };

  return (
    <div className="min-h-screen pb-20">

    {/* MAIN CONTENT CONTAINER */}
    <div className="bg-lightgrey pt-20 pb-20 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">

        {/* REGISTRATION CARD OR SUCCESS SCREEN */}
        {feedback?.type === 'success' ? (
          <div className="bg-sixth text-white border border-sixth shadow-xl rounded-md p-8 md:p-14 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Registrazione Completata!
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {feedback.text} La tua richiesta è stata registrata correttamente. Abbiamo inviato un'email di conferma con i dettagli del tuo account.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-sixth hover:bg-slate-100 transition-colors text-xs font-bold uppercase tracking-wider rounded-md"
              >
                <span>Accedi al Portale</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-accent shadow-2xs rounded-xs p-6 md:p-10 space-y-6">
            
            {feedback?.type === 'error' && (
              <div className="p-4 rounded-md flex items-center gap-3 text-xs font-semibold border bg-red-50 text-red-800 border-red-200">
                <AlertCircle className="shrink-0 text-red-600" size={18} />
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
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
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
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
                  />
                </div>
              </div>

              {/* Country & City Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Country Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Paese *
                  </label>
                  <div className="relative flex items-center">
                    <Globe className="absolute left-3 text-slate-400 pointer-events-none z-10" size={16} />
                    <select
                      name="countryCode"
                      required
                      value={selectedCountryCode}
                      onChange={(e) => {
                        setSelectedCountryCode(e.target.value);
                        setSelectedCity('');
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 focus:outline-none focus:border-slate-400 shadow-2xs cursor-pointer appearance-none"
                    >
                      <option value="">Seleziona Paese...</option>
                      {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Città *
                  </label>
                  <div className="relative flex items-center">
                    <Building className="absolute left-3 text-slate-400 pointer-events-none z-10" size={16} />
                    <select
                      name="city"
                      required
                      disabled={!selectedCountryCode}
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-accent rounded-md text-xs text-slate-800 focus:outline-none focus:border-slate-400 shadow-2xs cursor-pointer appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedCountryCode ? 'Seleziona Città...' : 'Seleziona prima un paese'}
                      </option>
                      {cities.map((city) => (
                        <option key={`${city.name}-${city.latitude}`} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 sans-serif text-accent tracking-widest bg-accent border border-transparent text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:border-accent hover:text-accent transition-all shadow-2xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
        )}

      </div>
    </div>

    
    </div>
  );
}