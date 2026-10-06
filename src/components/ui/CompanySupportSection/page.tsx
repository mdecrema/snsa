'use client';
import { useRef, useState, MouseEvent } from "react";
import {
  Compass,
  GraduationCap,
  Users,
  Info,
  ShieldCheck,
  Handshake,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import CtaBanner from '../CtaBanner/page';
import Image from "next/image";

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
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const SERVICES = [
    {
      icon: Compass,
      title: dict.boxes.box1.title,
      description: dict.boxes.box1.description,
      image: '/images/consulting.jpg'
    },
    {
      icon: GraduationCap,
      title: dict.boxes.box2.title,
      description: dict.boxes.box2.description,
      image: '/images/workshop.jpg'
    },
    {
      icon: Users,
      title: dict.boxes.box3.title,
      description: dict.boxes.box3.description,
      image: '/images/community_1.jpg'
    },
    {
      icon: Info,
      title: dict.boxes.box4.title,
      description: dict.boxes.box4.description,
      image: '/images/information.jpg'
    },
    {
      icon: ShieldCheck,
      title: dict.boxes.box5.title,
      description: dict.boxes.box5.description,
      image: '/images/training.jpg'
    },
    {
      icon: Handshake,
      title: dict.boxes.box6.title,
      description: dict.boxes.box6.description,
      image: '/images/healthcare.jpg'
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
      </section>

  <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6">
      
      {/* Header Editoriale */}
      <div className="mb-14 max-w-2xl">
        <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block mb-2">
          // Ecosistema di Incubazione
        </span>
        <h2 className="text-3xl md:text-3xl font-bold font-cormorant text-gray-900 tracking-tight">
          How We Incubate Your Vision
        </h2>
      </div>

      {/* MOSAICO BENTO CON IMMAGINI DI SFONDO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[260px]">
        {SERVICES.map((item, idx) => {
          const Icon = item.icon;
          const formattedIndex = String(idx + 1).padStart(2, "0");

          // Configurazione Asimmetria del Mosaico
          const spanClasses = [
            "md:col-span-8 md:row-span-1", // Card 1: Larga
            "md:col-span-4 md:row-span-2", // Card 2: Alta/Verticale
            "md:col-span-4 md:row-span-1", // Card 3: Normale
            "md:col-span-4 md:row-span-1", // Card 4: Normale
            "md:col-span-8 md:row-span-1", // Card 5: Larga
            "md:col-span-4 md:row-span-1", // Card 6: Normale
          ][idx % 6];

          const isFeatured = idx === 0;

          return (
            // <MosaicCardWithBg
            //   key={idx}
            //   item={item}
            //   index={formattedIndex}
            //   spanClass={spanClasses}
            //   isFeatured={isFeatured}
            //   Icon={Icon}
            // />
            <GlassMosaicCard
              key={idx}
              item={item}
              index={formattedIndex}
              spanClass={spanClasses}
              Icon={Icon}
            />
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

// Componente Card con effetto Spotlight Magnetico su coordinate mouse
function MosaicCard({ item, index, spanClass, isFeatured, Icon }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-xl p-8 flex flex-col justify-between overflow-hidden border transition-all duration-300 ${spanClass} ${
        isFeatured
          ? "bg-[#2A3421] text-white border-transparent"
          : "bg-[#FBFBFB] hover:bg-white text-gray-900 border-gray-200/80 hover:border-accent/40 shadow-2xs hover:shadow-xl"
      }`}
    >
      {/* Glow magnetico su coordinate del mouse */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${
                isFeatured ? "rgba(255,255,255,0.12)" : "rgba(117,129,86,0.12)"
              }, transparent 80%)`
            : "",
        }}
      />

      {/* TOP: Header Tessera */}
      <div className="flex items-start justify-between relative z-10">
        <span
          className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
            isFeatured
              ? "bg-white/10 text-white/80"
              : "bg-gray-200/60 text-gray-500 group-hover:bg-accent/10 group-hover:text-accent"
          } transition-colors`}
        >
          0{index}
        </span>

        <div
          className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            isFeatured
              ? "bg-white/10 text-white"
              : "bg-white text-accent border border-gray-200/80 shadow-2xs"
          }`}
        >
          <Icon size={22} />
        </div>
      </div>

      {/* MIDDLE & BOTTOM: Testo e Icona di azione */}
      <div className="relative z-10 space-y-2 mt-auto">
        <div className="flex items-center justify-between">
          <h3
            className={`font-montserrat font-bold uppercase tracking-tight ${
              isFeatured ? "text-xl md:text-2xl text-white" : "text-lg text-accent"
            }`}
          >
            {item.title}
          </h3>
          <ArrowUpRight
            className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
              isFeatured ? "text-white/80" : "text-accent"
            }`}
          />
        </div>

        <p
          className={`text-xs font-inter leading-relaxed ${
            isFeatured ? "text-gray-200" : "text-gray-600"
          }`}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

// Componente Card con Immagine di Sfondo e Spotlight Magnetico
function MosaicCardWithBg({ item, index, spanClass, isFeatured, Icon }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl p-8 flex flex-col justify-between overflow-hidden border transition-all duration-500 ${spanClass} ${
        isFeatured
          ? "border-transparent text-white shadow-2xl"
          : "border-gray-200/80 hover:border-accent/50 text-white shadow-2xs hover:shadow-xl"
      }`}
    >
      {/* 1. IMMAGINE DI SFONDO IN SECONDO PIANO */}
      {item.image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out opacity-40 group-hover:opacity-50 group-hover:grayscale-0"
          />
          {/* Overlay a gradiente scuro per garantire sempre la leggibilità del testo */}
          <div className="absolute inset-0 bg-gradient-to-t group-hover:from-black/80 transition-colors duration-500" />  
          {/* from-sixth/90 via-sixth/60 to-sixth/30 */}
        </div>
      )}

      {/* 2. GLOW MAGNETICO SU COORDINATE MOUSE */}
      <div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`
            : "",
        }}
      />

      {/* 3. TOP: HEADER TESSERA (Index + Icona) */}
      <div className="flex items-start justify-between relative z-20">
        <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
          0{index}
        </span>

        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent">
          <Icon size={22} />
        </div>
      </div>

      {/* 4. BOTTOM: TESTI E ICONA DI AZIONE */}
      <div className="relative z-20 space-y-2 mt-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-montserrat font-bold uppercase tracking-tight text-xl md:text-2xl text-white group-hover:translate-x-1 transition-transform">
            {item.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
        </div>

        <p className="text-xs font-inter leading-relaxed text-gray-200 line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function GlassMosaicCard({ item, index, spanClass, Icon }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-xl hover:p-8 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${spanClass}`}
    >
      {/* 1. IMMAGINE DI SFONDO (Sempre a colori vivaci) */}
      {item.image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      )}

      {/* 2. LAYER GLASS (Sfocatura Backdrop + Sfumatura Vetro Chiaro) */}
      <div className="absolute inset-0 z-10 bg-white/20 group-hover:bg-white/30 transition-all duration-500" />

      {/* 3. LIGHT SPOTLIGHT MAGNETICO (Riflesso di luce bianca al passaggio del mouse) */}
      <div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.4), transparent 80%)`
            : "",
        }}
      />

      {/* 4. TOP: BADGE & ICONA GLASS */}
      {/* <div className="flex items-start justify-between relative z-20">
        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/60 backdrop-blur-md text-gray-900 border border-white/60 shadow-2xs">
          0{index}
        </span>

        <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-md text-accent border border-white/60 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
          <Icon size={22} />
        </div>
      </div> */}

      {/* 5. BOTTOM: SCHEDA DI TESTO IN VETRO SMERIGLIATO (Garantisce massima leggibilità) */}
      <div className="relative z-20 mt-auto bg-white/85 p-5 rounded-xl shadow-lg group-hover:bg-white/85 transition-all duration-300">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-inter uppercase font-bold uppercase tracking-tight text-sm text-accent">
            {item.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <p className="text-xs font-inter leading-relaxed tracking-wider text-gray-700 line-clamp-2">
          {item.description}
        </p>
      </div>

    </div>
  );
}