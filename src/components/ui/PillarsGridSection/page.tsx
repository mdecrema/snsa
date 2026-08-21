// src/components/ui/PillarsGridSection.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface PillarItem {
  id: string;
  titleIt: string;
  titleEn: string;
  descIt: string;
  descEn: string;
  imageSrc: string;
  imageAlt: string;
}

const PILLARS_DATA: PillarItem[] = [
  {
    id: 'mission',
    titleIt: 'Missione',
    titleEn: 'Mission',
    descIt: 'Offrire ai nostri clienti prodotti sicuri, efficaci e di qualità, sviluppati specificatamente per il benessere, la salute dell\'organismo e la bellezza del corpo.',
    descEn: 'To offer our consumers safe, effective and quality products, designed exclusively for the well-being, the health of the organism and the beauty of the body.',
    imageSrc: '/images/laboratory-technician.jpg', // Replace with your image paths
    imageAlt: 'Laboratory Technician Working',
  },
  {
    id: 'quality',
    titleIt: 'Qualità',
    titleEn: 'Quality',
    descIt: 'La qualità dei prodotti è controllata durante tutte le fasi della produzione secondo le linee guida GMP (Good Manufacturing Practice): selezione materie prime, produzione, controlli di processo e controlli sul prodotto finito.',
    descEn: 'Product quality is controlled during all stages of production according to GMP (Good Manufacturing Practice) guidelines: raw material selection, production, in-process controls and finished product controls.',
    imageSrc: '/images/quality-control-equipment.webp',
    imageAlt: 'Quality Control Equipment',
  },
  {
    id: 'research',
    titleIt: 'Ricerca',
    titleEn: 'Research',
    descIt: 'Siamo costantemente impegnati nella ricerca di innovativi principi attivi e nello sviluppo di nuove formulazioni.',
    descEn: 'We are constantly engaged in the search for innovative active ingredients and in the development of new formulations.',
    imageSrc: '/images/researcher-cleanroom.avif',
    imageAlt: 'Researcher in Cleanroom',
  },
];

export default function PillarsGridSection() {
  return (
    <section className="w-full ice py-16 sm:py-24 px-4 font-sans">
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
            <div className="space-y-0.5">
              <h3 className="text-xl font-serif text-[#1A1A1A]">
                {PILLARS_DATA[0].titleIt}
              </h3>
              <p className="text-sm font-serif italic text-gray-500 font-light">
                {PILLARS_DATA[0].titleEn}
              </p>
            </div>
            <div className="space-y-2 text-[11px] sm:text-xs font-light leading-relaxed max-w-xs">
              <p className="text-gray-700">{PILLARS_DATA[0].descIt}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[0].descEn}</p> */}
            </div>
          </div>

          {/* Column 3: Image 3 */}
          <div className="relative h-72 md:h-80 w-full bg-gray-100 overflow-hidden">
            <Image
              src={PILLARS_DATA[2].imageSrc}
              alt={PILLARS_DATA[2].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* ROW 2 */}
          {/* Column 1: Text Box 2 (Qualità / Quality) */}
          <div className="h-72 md:h-80 p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-serif text-[#1A1A1A]">
                {PILLARS_DATA[1].titleIt}
              </h3>
              <p className="text-sm font-serif italic text-gray-500 font-light">
                {PILLARS_DATA[1].titleEn}
              </p>
            </div>
            <div className="space-y-2 text-[11px] sm:text-xs font-light leading-relaxed max-w-xs">
              <p className="text-gray-700">{PILLARS_DATA[1].descIt}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[1].descEn}</p> */}
            </div>
          </div>

          {/* Column 2: Image 2 */}
          <div className="relative h-72 md:h-80 w-full bg-gray-100 overflow-hidden">
            <Image
              src={PILLARS_DATA[1].imageSrc}
              alt={PILLARS_DATA[1].imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Column 3: Text Box 3 (Ricerca / Research) */}
          <div className="h-72 md:h-80 p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-serif text-[#1A1A1A]">
                {PILLARS_DATA[2].titleIt}
              </h3>
              <p className="text-sm font-serif italic text-gray-500 font-light">
                {PILLARS_DATA[2].titleEn}
              </p>
            </div>
            <div className="space-y-2 text-[11px] sm:text-xs font-light leading-relaxed max-w-xs">
              <p className="text-gray-700">{PILLARS_DATA[2].descIt}</p>
              {/* <p className="italic text-gray-400 font-light">{PILLARS_DATA[2].descEn}</p> */}
            </div>
          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-4">
          <Link
            href="/about"
            className="inline-block accent text-white hover:bg-gray-100 transition-colors px-8 py-3 text-xs font-serif italic tracking-wide shadow-sm"
          >
            Discover our Company
          </Link>
        </div>

      </div>
    </section>
  );
}