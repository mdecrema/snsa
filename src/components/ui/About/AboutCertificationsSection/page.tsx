// src/components/ui/CertificationsSection.tsx
'use client';

import React from 'react';

export interface Certification {
  id: string;
  badgeTitle: string;
  badgeCode: string;
  badgeType?: 'bureau' | 'custom';
  customLogoUrl?: string;
  descIt: string;
  descEn: string;
}

const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'gmp',
    badgeTitle: 'CERTIFIED',
    badgeCode: 'GMP',
    badgeType: 'bureau',
    descIt: 'Produzione e confezionamento di integratori alimentari',
    descEn: 'Production and packaging of food supplements',
  },
  {
    id: 'iso-22716',
    badgeTitle: 'CERTIFIED',
    badgeCode: 'ISO 22716',
    badgeType: 'bureau',
    descIt: 'Cosmetici, Buone Pratiche di Produzione (GMP), Linee guida sulle buone pratiche di produzione',
    descEn: 'Cosmetics, Good Manufacturing Practices (GMP), Guidelines on good manufacturing practices',
  },
  {
    id: 'iso-9001',
    badgeTitle: 'CERTIFIED',
    badgeCode: 'ISO 9001',
    badgeType: 'bureau',
    descIt: 'Sistema Gestione Qualità',
    descEn: 'Quality Management System',
  },
  {
    id: 'iso-13485',
    badgeTitle: 'CERTIFIED',
    badgeCode: 'ISO 13485',
    badgeType: 'bureau',
    descIt: 'Progettazione, produzione e confezionamento di dispositivi medici',
    descEn: 'Design, production and packaging of medical devices',
  },
  {
    id: 'iso-22000',
    badgeTitle: 'CERTIFIED',
    badgeCode: 'ISO 22000',
    badgeType: 'bureau',
    descIt: 'Gestione Qualità per la Sicurezza Alimentare',
    descEn: 'Quality Management System for Food Safety',
  },
  {
    id: 'q-aid',
    badgeTitle: '',
    badgeCode: '',
    badgeType: 'custom',
    descIt: 'Sistema di Gestione per la Parità di Genere',
    descEn: 'Gender Equality Management System',
  },
];

export default function CertificationsSection() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
            Le nostre certificazioni
          </h2>
          <p className="text-xl sm:text-2xl font-serif italic text-gray-500 font-light">
            Our certifications
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-start">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div key={cert.id} className="flex flex-col items-center text-center space-y-3">
              
              {/* Badge Box */}
              {cert.badgeType === 'bureau' ? (
                <div className="w-64 h-24 border border-gray-400 rounded-xl px-5 py-3 flex items-center justify-between bg-white shadow-sm">
                  <div className="text-left space-y-0.5">
                    <span className="block text-[11px] font-semibold tracking-[0.25em] text-gray-500 uppercase">
                      {cert.badgeTitle}
                    </span>
                    <span className="block text-xl font-bold text-[#1A2A3A] tracking-tight">
                      {cert.badgeCode}
                    </span>
                  </div>

                  {/* Bureau Veritas Seal SVG Placeholder */}
                  <div className="w-10 h-14 border border-gray-800 flex flex-col items-center justify-between p-1 text-[6px] font-serif text-center leading-none text-gray-800">
                    <span className="font-bold border-b border-gray-800 pb-0.5 w-full uppercase text-[5px]">
                      1828
                    </span>
                    <span className="font-bold my-auto uppercase">
                      BUREAU<br />VERITAS
                    </span>
                  </div>
                </div>
              ) : (
                /* Custom Accreditation Logo Badge */
                <div className="w-64 h-24 flex items-center justify-center">
                  <div className="w-16 h-20 bg-[#6A2B6D] text-white p-1.5 flex flex-col justify-between items-center text-center rounded-sm">
                    <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest leading-none">
                      AID
                    </span>
                    <span className="text-[4px] uppercase leading-tight font-sans">
                      ORGANISMO DI CERTIFICAZIONE<br />
                      AZIENDA CERTIFICATA<br />
                      UNI/PdR 125:2022
                    </span>
                  </div>
                </div>
              )}

              {/* Descriptions */}
              <div className="max-w-xs space-y-1">
                <p className={`text-xs ${cert.id === 'q-aid' ? 'text-blue-600' : 'text-gray-700'}`}>
                  {cert.descIt}
                </p>
                <p className="text-[11px] italic text-gray-500 font-light">
                  {cert.descEn}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}