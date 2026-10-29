'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ExternalLink, CheckCircle2, ChevronRight, Sparkles, Shield, Check } from 'lucide-react';
import type { Member, MemberCategory } from '@/app/generated/prisma';
import CtaBanner from '@/src/components/ui/CtaBanner/page';
import PageHeader from '@/src/components/ui/PageHeader/page';
import { HorizontalFeatureCard } from '@/src/components/ui/HorizontalFeatureCard/page';
import { AssessmentSectionSplit } from '@/src/components/ui/AssessmentSectionSplit/page';
import { ShieldCheck, Award, Crown } from "lucide-react";

export interface Level {
    id: number,
    code: string,
    title: string,
    subtitle: string,
    desc: string,
    features: {
      feat1: string,
      feat2: string,
      feat3: string,
      feat4: string
    },
    image: string,
    icon: React.ComponentType<{ className?: string }>,
    badgeText: string,
}

  const STEPS = [
        {
          step: "01",
          title: "Application",
          desc: "Submission of product details, ingredient declarations, and company documentation.",
        },
        {
          step: "02",
          title: "Documentation Review",
          desc: "Initial screening to verify completeness, compliance, and preliminary requirements.",
        },
        {
          step: "03",
          title: "Scientific Evaluation",
          desc: "In-depth technical analysis conducted by qualified scientific committee members.",
        },
        {
          step: "04",
          title: "Technical Report",
          desc: "Compilation of detailed findings, compliance metrics, and assessment outcome.",
        },
        {
          step: "05",
          title: "Quality Mark Decision",
          desc: "Formal evaluation and awarding of the appropriate Quality Mark recognition level.",
        },
        {
          step: "06",
          title: "Annual Verification",
          desc: "Ongoing monitoring and periodic reviews to ensure continuous standard adherence.",
        },
      ];

interface QualityMarkClientDirectoryDict {
  pageHeader: {
    title: string,
    subtitle: string,
    description: string
  },
  label: {
    title: string,
    subtitle: string,
    description: string,
    card: {
      title: string,
      description: string
    }
  },
  assessmentSection: {
    title: string,
    subtitle: string,
    criterias: {
      criteria1: {
        title: string,
        description: string
      },
      criteria2: {
        title: string,
        description: string
      },
      criteria3: {
        title: string,
        description: string
      },
      criteria4: {
        title: string,
        description: string
      },
      criteria5: {
        title: string,
        description: string
      },
    }
  },
  levelsOfRecognition: {
    subtitle: string,
    title: string,
    levelCards: {
      basic: {
        code: string,
        title: string,
        subtitle: string,
        desc: string,
        features: {
          feat1: string,
          feat2: string,
          feat3: string,
          feat4: string
        },
        badgeText: string,
      },
      advanced: {
        code: string,
        title: string,
        subtitle: string,
        desc: string,
        features: {
          feat1: string,
          feat2: string,
          feat3: string,
          feat4: string
        },
        badgeText: string,
      },
      excellence: {
          code: string,
          title: string,
          subtitle: string,
          desc: string,
          features: {
            feat1: string,
            feat2: string,
            feat3: string,
            feat4: string
          },
          badgeText: string,
      }
    }
  },
  ctaBanner: {
    title: string
    subtitle: string
    buttonText: string
  }
}

interface Props {
  dict: QualityMarkClientDirectoryDict;
}

export default function QualityMarkClientDirectory({
  dict
}: Props) {
const [selectedLevel, setSelectedLevel] = useState(2);
const [activeIndex, setActiveIndex] = useState<number>(0);
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const [isPaused, setIsPaused] = useState<boolean>(false);

  // Animazione in loop ogni 4 secondi
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % STEPS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const levels = [
    {
      id: 0,
      code: dict.levelsOfRecognition.levelCards.basic.code,
      title: dict.levelsOfRecognition.levelCards.basic.title,
      subtitle: dict.levelsOfRecognition.levelCards.basic.subtitle,
      desc: dict.levelsOfRecognition.levelCards.basic.desc,
      features: {
        feat1: dict.levelsOfRecognition.levelCards.basic.features.feat1,
        feat2: dict.levelsOfRecognition.levelCards.basic.features.feat2,
        feat3: dict.levelsOfRecognition.levelCards.basic.features.feat3,
        feat4: dict.levelsOfRecognition.levelCards.basic.features.feat4
      },
      image: "/images/skincare_2.jpg",
      icon: ShieldCheck,
      badgeText: dict.levelsOfRecognition.levelCards.basic.badgeText,
    },
    {
      id: 1,
      code: dict.levelsOfRecognition.levelCards.advanced.code,
      title: dict.levelsOfRecognition.levelCards.advanced.title,
      subtitle: dict.levelsOfRecognition.levelCards.advanced.subtitle,
      desc: dict.levelsOfRecognition.levelCards.advanced.desc,
      features: {
        feat1: dict.levelsOfRecognition.levelCards.advanced.features.feat1,
        feat2: dict.levelsOfRecognition.levelCards.advanced.features.feat2,
        feat3: dict.levelsOfRecognition.levelCards.advanced.features.feat3,
        feat4: dict.levelsOfRecognition.levelCards.advanced.features.feat4
      },
      image: "/images/laboratory-technician.jpg",
      icon: Award,
      badgeText: dict.levelsOfRecognition.levelCards.advanced.badgeText,
    },
    {
      id: 2,
      code: dict.levelsOfRecognition.levelCards.excellence.code,
      title: dict.levelsOfRecognition.levelCards.excellence.title,
      subtitle: dict.levelsOfRecognition.levelCards.excellence.subtitle,
      desc: dict.levelsOfRecognition.levelCards.excellence.subtitle,
      features: {
        feat1: dict.levelsOfRecognition.levelCards.excellence.features.feat1,
        feat2: dict.levelsOfRecognition.levelCards.excellence.features.feat2,
        feat3: dict.levelsOfRecognition.levelCards.excellence.features.feat3,
        feat4: dict.levelsOfRecognition.levelCards.excellence.features.feat4
      },
      image: "/images/consulenza.webp",
      icon: Crown,
      badgeText: dict.levelsOfRecognition.levelCards.excellence.badgeText,
    },
  ];

const current = levels[selectedLevel];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen pb-20">
      
    {/* <PageHeader
      title={dict.pageHeader.title}
      subtitle={dict.pageHeader.subtitle}
      description={dict.pageHeader.description}
      quickActions={[
        { label: 'Home', href: '/', variant: 'filled' },
        { label: 'Membership', href: '/membership', variant: 'outlined' },
      ]}
    /> */}
      
    {/* 1. HERO / INTRODUCTION: THE LABEL */}
      <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
        {/* Titolo e Badge */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
            // {dict.label.subtitle }
          </span>
          <h1 className="text-3xl font-bold font-cormorant text-gray-900 leading-tight">
            {dict.label.title }
          </h1>
        </div>

        {/* Testo Introduttivo */}
        <div className="lg:col-span-7 space-y-6 lg:pt-2">
          <p className="text-sm font-inter text-gray-700 leading-relaxed tracking-wide">
            {dict.label.description}
          </p>
          <div className="p-6 bg-[#FBFBFB] border-l-4 border-l-second border-y border-r border-gray-200 space-y-2">
            <span className="text-xs font-montserrat font-bold text-second uppercase tracking-widest block">
              {dict.label.card.title}
            </span>
            <p className="text-sm font-inter text-gray-600 leading-relaxed">
              {dict.label.card.description}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 2. WHAT WE ASSESS (I 5 CRITERI DI VALUTAZIONE) */}
    <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6">
        
      <AssessmentSectionSplit dict={dict.assessmentSection} ></AssessmentSectionSplit>

    </section>

   <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 border-t border-gray-100">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
          // {dict.levelsOfRecognition.subtitle}
        </span>
        <h2 className="text-3xl font-bold font-cormorant text-gray-900">
          {dict.levelsOfRecognition.title}
        </h2>
      </div>

      {/* Modern Tabs Selector */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 bg-gray-100/80 rounded-xl border border-gray-200/80 max-w-md w-full justify-between">
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-montserrat font-bold transition-all duration-300 ${
                selectedLevel === lvl.id
                  ? "bg-white text-gray-900 shadow-md scale-102"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {lvl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Column Left: Text & Features */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-3 py-1 bg-second/10 text-second rounded-md">
              {current.code}
            </span>
            <span className="text-xs font-montserrat uppercase tracking-wider text-gray-400 font-semibold">
              {current.badgeText}
            </span>
          </div>

          <div>
            <h3 className="text-3xl font-bold font-cormorant text-gray-900">
              {current.title}
            </h3>
            <p className="text-sm font-montserrat text-second font-medium mt-1">
              {current.subtitle}
            </p>
          </div>

          <p className="text-sm font-inter text-gray-600 leading-relaxed">
            {current.desc}
          </p>

          <div className="pt-4 space-y-3 border-t border-gray-100">
            <span className="text-[10px] font-mono uppercase text-gray-400 tracking-widest font-bold block">
              Incluso in questo livello:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(current.features).map((feat: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-inter text-gray-700">
                  <div className="p-1 rounded-full bg-second/10 text-second">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column Right: Visual Badge / Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full h-80 rounded-xl overflow-hidden border border-gray-200 shadow-inner group">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A2B081] tracking-widest block">
                  SNSA Seal
                </span>
                <span className="font-cormorant text-xl font-bold">
                  {current.title} Standard
                </span>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>


      {/* 4. PROCESS: HOW IT WORKS */}
              <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 border-t border-gray-200 space-y-16">
      {/* Section Header */}
      <div className="text-center mx-auto space-y-2 max-w-2xl">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
          // Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-cabinet text-gray-900">
          How It Works
        </h2>
        <p className="text-sm font-inter text-gray-600 tracking-wide pt-1">
          A rigorous, multi-stage evaluation process ensuring complete compliance and transparency.
        </p>
      </div>

      {/* TIMELINE CONTAINER (ORIZZONTALE) */}
      <div className="relative py-20 hidden lg:block">
        {/* Linea Orizzontale Centrale Perfettamente Centrata */}
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />

        {/* Griglia a 6 colonne per gli Step */}
        <div className="grid grid-cols-6 gap-5 relative z-10">
          {STEPS.map((item, index) => {
            const isTop = index % 2 === 0; // Alternanza: pari sopra, dispari sotto
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                }}
                className="relative flex flex-col items-center cursor-pointer"
              >
                {/* 1. BLOCCO SOPRA LA LINEA */}
                <div
                  className={`min-h-[210px] flex flex-col justify-end transition-all duration-500 ${
                    isTop ? "opacity-100 mb-8" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {isTop && (
                    <div
                      className={`p-5 rounded-2xl  w-[250px] min-h-[200px] border transition-all duration-500 ${
                        isActive
                          ? "bg-white border-accent shadow-2xl scale-105 ring-1 ring-accent/20"
                          : "bg-white/70 border-gray-200/90 shadow-md opacity-80"
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2 transition-colors duration-500 ${
                          isActive
                            ? "bg-accent text-white"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        Step {item.step}
                      </span>
                      <h3
                        className={`text-base font-bold font-cabinet uppercase transition-colors duration-500 mt-2 ${
                          isActive ? "text-accent" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm font-inter text-gray-600 leading-relaxed mt-4">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. PALLINO CENTRALE SULLA LINEA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div
                    className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "border-accent scale-125 shadow-lg ring-4 ring-accent/10"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                        isActive ? "bg-accent" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>

                {/* 3. BLOCCO SOTTO LA LINEA */}
                <div
                  className={`min-h-[210px] flex flex-col justify-start transition-all duration-500 ${
                    !isTop ? "opacity-100 mt-8" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {!isTop && (
                    <div
                      className={`p-5 rounded-2xl  w-[250px] min-h-[200px] border transition-all duration-500 ${
                        isActive
                          ? "bg-white border-accent shadow-2xl scale-105 ring-1 ring-accent/20"
                          : "bg-white/70 border-gray-200/90 shadow-md opacity-80"
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded inline-block mb-2 transition-colors duration-500 ${
                          isActive
                            ? "bg-accent text-white"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        Step {item.step}
                      </span>
                      <h3
                        className={`text-base font-bold font-cabinet uppercase transition-colors duration-500 mt-2 ${
                          isActive ? "text-accent" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm font-inter text-gray-600 leading-relaxed mt-4">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FALLBACK RESPONSIVE PER MOBILE E TABLET */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
        {STEPS.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4"
          >
            <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded">
              {item.step}
            </span>
            <div>
              <h3 className="text-sm font-bold font-cabinet text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-inter text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* SECTION 3: CALL TO ACTION BANNER */}
      {/* <CtaBanner
        title={dict.ctaBanner.title}
        subtitle={dict.ctaBanner.subtitle}
        buttonText={dict.ctaBanner.buttonText}
        buttonHref="/membership"
      /> */}
    </div>
  );
}

function setActiveIndex(arg0: (prevIndex: any) => number) {
  throw new Error('Function not implemented.');
}
