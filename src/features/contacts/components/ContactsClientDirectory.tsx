"use client";

import ContactForm from "@/src/components/ui/ContactForm/page";
import { MapPin, Mail, ShieldCheck, Users, Calendar, Award } from "lucide-react";

const CONTACT_BLOCKS = [
  {
    title: "General Enquiries",
    email: "info@[domain].ch",
    icon: Mail,
  },
  {
    title: "Membership",
    email: "membership@[domain].ch",
    icon: Users,
  },
  {
    title: "Quality Mark",
    email: "quality@[domain].ch",
    icon: ShieldCheck,
  },
  {
    title: "Partnerships & Events",
    email: "partnerships@[domain].ch",
    icon: Calendar,
  },
];

export default function ContactsClientDirectory() {
  return (
    <section className="relative max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8  border-t border-gray-200">

      {/* Grid a due colonne: Contatti (Sinistra) vs Form (Destra) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* COLONNA SINISTRA: Contact Block info */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Card Sede Svizzera */}
          <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-lg relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Headquarters
              </span>
            </div>
            <h3 className="font-cabinet text-xl font-bold text-gray-900">
              Swiss Natural Skincare Association (SNSA)
            </h3>
            <p className="text-sm font-inter text-gray-600 mt-1">Switzerland</p>
          </div>

          {/* Lista Canali Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {CONTACT_BLOCKS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={`mailto:${item.email}`}
                  className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md hover:bg-white/70 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white text-accent border border-gray-200/60 shadow-2xs group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cabinet text-base font-bold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-gray-600 group-hover:text-accent transition-colors mt-0.5">
                      {item.email}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>

        {/* COLONNA DESTRA: Componente Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}