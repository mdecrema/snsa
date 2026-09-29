'use client';

import {
  Compass,
  GraduationCap,
  Users,
  Info,
  ShieldCheck,
  Handshake,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import CtaBanner from '../CtaBanner/page';

export interface Services {
  icon: string,
  title: string,
  description: string
}

interface CompanySupportSectionDict {
  ourCustomServices: string,
  boxes: {
    box1: { title: string; description: string; };
    box2: { title: string; description: string; };
    box3: { title: string; description: string; };
    box4: { title: string; description: string; };
    box5: { title: string; description: string; };
    box6: { title: string; description: string; };
  },
  ctaBanner: {
    title: string,
    subtitle: string,
    buttonText: string
  }
}

interface CompanySupportSectionProps {
  dict: CompanySupportSectionDict;
}

export default function CompanySupportSection({ dict }: CompanySupportSectionProps) {
  const SERVICES = [
    {
      icon: Compass,
      title: dict.boxes.box1.title,
      description: dict.boxes.box1.description
    },
    {
      icon: GraduationCap,
      title: dict.boxes.box2.title,
      description: dict.boxes.box2.description
    },
    {
      icon: Users,
      title: dict.boxes.box3.title,
      description: dict.boxes.box3.description
    },
    {
      icon: Info,
      title: dict.boxes.box4.title,
      description: dict.boxes.box4.description
    },
    {
      icon: ShieldCheck,
      title: dict.boxes.box5.title,
      description: dict.boxes.box5.description
    },
    {
      icon: Handshake,
      title: dict.boxes.box6.title,
      description: dict.boxes.box6.description
    },
  ];

  return (
    <div className="lightgrey min-h-screen text-slate-800">

      {/* SERVICES GRID CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 ">
        
        {/* SECTION TITLE */}
        <div className="border-b border-slate-300 pb-3">
          <h2 className="text-xs font-bold text-slate-900 font-montserrat uppercase tracking-wider">
            {dict.ourCustomServices}
          </h2>
        </div>

        {/* 2 & 3 COLUMN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="cursor-pointer bg-lightgrey border border-transparent p-6 rounded-xs shadow-2xs hover:border-accent transition-all flex flex-col justify-between space-y-4 min-h-[200px]"
              >
                <div className="space-y-3">
                  {/* Contenitore Flex per Icona + Titolo affiancati */}
                  <div className="flex items-center gap-3">
                    {/* Icon Header (con shrink-0 per non schiacciarsi) */}
                    <div className="w-10 h-10 bg-accent text-white border border-slate-200 rounded-xs flex items-center justify-center shadow-2xs shrink-0">
                      <Icon size={22} />
                    </div>

                    {/* Service Title */}
                    <h3 className="uppercase font-montserrat font-bold text-accent leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Service Description */}
                  <p className="text-[14px] text-gray-600 tracking-wide leading-relaxed font-inter mt-5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BOX */}
      <CtaBanner
        title={dict.ctaBanner.title}
        subtitle={dict.ctaBanner.subtitle}
        buttonText={dict.ctaBanner.buttonText}
        buttonHref="/membership"
      />
    </div>
  );
}