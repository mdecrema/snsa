// src/components/ui/PillarsGridSection.tsx
'use client';

import { Subtitles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface PillarItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface PillarsGridSectionDict {
  card1: { title: string; subtitle?: string; description: string; };
  card2: { title: string; subtitle?: string; description: string; };
  card3: { title: string; subtitle?: string; description: string; };
}

interface PillarsGridSectionProps {
  dict: PillarsGridSectionDict;
}

export default function PillarsGridSection({ dict }: PillarsGridSectionProps) {
  const PILLARS_DATA: PillarItem[] = [
    {
      id: 'mission',
      title: dict.card1.title,
      description: dict.card1.description,
      imageSrc: '/images/laboratory-technician.jpg',
      imageAlt: 'Laboratory Technician Working',
    },
    {
      id: 'quality',
      title: dict.card2.title,
      description: dict.card2.description,
      imageSrc: '/images/researcher-cleanroom.avif',
      imageAlt: 'Quality Control Equipment',
    },
    {
      id: 'research',
      title: dict.card3.title,
      description: dict.card3.description,
      imageSrc: '/images/quality-control-equipment.webp',
      imageAlt: 'Researcher in Cleanroom',
    },
  ];



  return (
    <section className="w-full bg-gradient-to-b from-accent via-accent/70  to-white py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* 3x2 Checkerboard Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-xl overflow-hidden">
          
          {/* ROW 1 */}
          {/* Column 1: Image 1 */}
          <div className="relative h-72 md:h-80 w-full bg-gray-100 overflow-hidden">
            <Image
              src={PILLARS_DATA[0].imageSrc}
              alt={PILLARS_DATA[0].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Column 2: Text Box 1 (Missione / Mission) */}
          <div className="h-72 md:h-80 p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white space-y-3">
            <div className="space-y-0.5 mb-6">
              <h3 className="text-2xl sm:text-3xl">
                {PILLARS_DATA[0].title}
              </h3>
              {/* <p className="text-base sm:text-lg italic text-gray-500 font-light">
                {PILLARS_DATA[0].titleEn}
              </p> */}
            </div>
            <div className="space-y-2 text-[14px] text-justify font-inter font-light leading-relaxed max-w-xs">
              <p className="text-gray-700 tracking-wide">{PILLARS_DATA[0].description}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[0].descEn}</p> */}
            </div>
          </div>

          {/* Column 3: Image 3 */}
          <div className="relative h-72 md:h-80 w-full bg-gray-100 overflow-hidden">
            <Image
              src={PILLARS_DATA[1].imageSrc}
              alt={PILLARS_DATA[1].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* ROW 2 */}
          {/* Column 1: Text Box 2 (Qualità / Quality) */}
          <div className="h-72 md:h-80 p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white space-y-3">
            <div className="space-y-0.5 mb-6">
              <h3 className="text-2xl sm:text-3xl">
                {PILLARS_DATA[1].title}
              </h3>
              {/* <p className="text-base sm:text-lg italic text-gray-500 font-light">
                {PILLARS_DATA[1].titleEn}
              </p> */}
            </div>
            <div className="space-y-2 text-[14px] text-justify font-inter font-light leading-relaxed max-w-xs">
              <p className="text-gray-700 tracking-wide">{PILLARS_DATA[1].description}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[1].descEn}</p> */}
            </div>
          </div>

          {/* Column 2: Image 2 */}
          <div className="relative h-72 md:h-80 w-full bg-gray-100 overflow-hidden">
            <Image
              src={PILLARS_DATA[2].imageSrc}
              alt={PILLARS_DATA[2].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Column 3: Text Box 3 (Ricerca / Research) */}
          <div className="h-72 md:h-80 p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white space-y-3">
            <div className="space-y-0.5 mb-6">
              <h3 className="text-2xl sm:text-3xl">
                {PILLARS_DATA[2].title}
              </h3>
              {/* <p className="text-base sm:text-lg italic text-gray-500 font-light">
                {PILLARS_DATA[2].titleEn}
              </p> */}
            </div>
            <div className="space-y-2 text-[14px] text-justify font-inter font-light leading-relaxed max-w-xs">
              <p className="text-gray-700 tracking-wide">{PILLARS_DATA[2].description}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[2].descEn}</p> */}
            </div>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-4">
          <Link
            href="/about"
            className="inline-block accent bg-accent border border-transparent text-white hover:bg-transparent hover:border-accent hover:text-accent transition-colors px-5 py-2.5 text-xs font-serif tracking-widest shadow-sm font-montserrat"
          >
            How To Join
          </Link>
        </div>

      </div>
    </section>
  );
}