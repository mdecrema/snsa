'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ExternalLink, CheckCircle2, ChevronRight, Sparkles, Shield, Check } from 'lucide-react';
import type { Member, MemberCategory } from '@/app/generated/prisma';
import CtaBanner from '@/src/components/ui/CtaBanner/page';
import PageHeader from '@/src/components/ui/PageHeader/page';
import { HorizontalFeatureCard } from '@/src/components/ui/HorizontalFeatureCard/page';
import { AssessmentSectionSplit } from '@/src/components/ui/AssessmentSectionSplit/page';
import { ShieldCheck, Award, Crown } from "lucide-react";

const levels = [
    {
      id: 0,
      code: "LEVEL 01",
      title: "Basic",
      subtitle: "Essential Natural Certification",
      desc: "Garantisce il rispetto dei criteri base di formulazione naturale, assenza di sostanze dannose e tracciabilità minima degli ingredienti.",
      features: ["Controllo ingredienti chiave", "Packaging a norma", "Audit documentale base"],
      image: "/images/skincare_2.jpg",
      icon: ShieldCheck,
      badgeText: "Conformità Base",
    },
    {
      id: 1,
      code: "LEVEL 02",
      title: "Advanced",
      subtitle: "Enhanced Sustainable Quality",
      desc: "Dimostra uno standard superiore di filiera sostenibile, approvvigionamento responsabile ed elevata percentuale di ingredienti biologici.",
      features: ["Tutti i requisiti Basic", "Verifica della filiera sostenibile", "Packaging riciclabile > 80%"],
      image: "/images/laboratory-technician.jpg",
      icon: Award,
      badgeText: "Standard Avanzato",
    },
    {
      id: 2,
      code: "LEVEL 03",
      title: "Excellence",
      subtitle: "The Gold Standard of Natural Skincare",
      desc: "Il livello più elevato di riconoscimento SNSA. Riservato ai prodotti che eccellono in ogni parametro scientifico, etico e di packaging circolare.",
      features: ["Tutti i requisiti Advanced", "Impatto carbonio neutro o positivo", "Formula 100% biodegradabile", "Priorità di consulenza annuale"],
      image: "/images/consulenza.webp",
      icon: Crown,
      badgeText: "Massima Eccellenza",
    },
  ];

interface QualityMarkClientDirectoryDict {
  pageHeader: {
    title: string,
    subtitle: string,
    description: string
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

const current = levels[selectedLevel];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen pb-20">
      
    <PageHeader
      title={dict.pageHeader.title}
      subtitle={dict.pageHeader.subtitle}
      description={dict.pageHeader.description}
      quickActions={[
        { label: 'Home', href: '/', variant: 'filled' },
        { label: 'Membership', href: '/membership', variant: 'outlined' },
      ]}
    />
      
    {/* 1. HERO / INTRODUCTION: THE LABEL */}
      <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
        {/* Titolo e Badge */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
            // Certification Standard
          </span>
          <h1 className="text-3xl font-bold font-cormorant text-gray-900 leading-tight">
            The Label
          </h1>
        </div>

        {/* Testo Introduttivo */}
        <div className="lg:col-span-7 space-y-6 lg:pt-2">
          <p className="text-sm font-inter text-gray-700 leading-relaxed tracking-wide">
            Everything is transparent: the people behind the assessment are publicly identified, and the association is an open organisation committed to sharing its results and evaluations.
            The Quality Mark is awarded based on specific requirements established with a pragmatic approach, designed to assess the product’s actual impact on the environment and on well-being.
          </p>
          <div className="p-6 bg-[#FBFBFB] border-l-4 border-l-second border-y border-r border-gray-200 space-y-2">
            <span className="text-xs font-montserrat font-bold text-second uppercase tracking-widest block">
              Transparent & Independent
            </span>
            <p className="text-sm font-inter text-gray-600 leading-relaxed">
              The assessment protocol is fully public and transparent. The members of the scientific committee, responsible for the evaluation, are also publicly identified and are carefully selected by the association based on their expertise across a wide range of fields.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 2. WHAT WE ASSESS (I 5 CRITERI DI VALUTAZIONE) */}
    <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6">
        
      <AssessmentSectionSplit></AssessmentSectionSplit>

    </section>

   <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 border-t border-gray-100">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
          // Interactive Guide
        </span>
        <h2 className="text-3xl font-bold font-cormorant text-gray-900">
          Three Levels of Recognition
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
              {current.features.map((feat, idx) => (
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
      <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6 border-t border-gray-200 space-y-12">
        
        {/* Section Header */}
  <div className="text-center mx-auto space-y-2">
    <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-accent">
      // Process
    </span>
    <h2 className="text-3xl md:text-4xl font-bold font-cormorant text-gray-900">
      How It Works
    </h2>
    <p className="text-sm font-inter text-gray-500 tracking-wide pt-1">
      A rigorous, multi-stage evaluation process ensuring complete compliance and transparency.
    </p>
  </div>

  {/* TIMELINE CONTAINER */}
  <div className="relative max-w-4xl mx-auto px-4">
    
    {/* 
      LINEA VERTICALE DEL TEMPO:
      - Su Mobile (default): posizionata a sinistra (left-6)
      - Su Desktop (lg): posizionata esattamente al centro (lg:left-1/2)
    */}
    <div className="absolute top-3 bottom-3 left-6 lg:left-1/2 -translate-x-1/2 w-px bg-gray-300" />

    {/* LISTA DEGLI STEP */}
    <div className="space-y-12 lg:space-y-16">
      {[
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
      ].map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`relative flex flex-col lg:flex-row items-start lg:items-center  ${
              isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* 1. CONTENUTO DELLO STEP (Card o Blocco Testo) */}
            <div className="w-full lg:w-1/2 pl-14 lg:pl-0">
              <div
                className={`bg-[#FBFBFB] p-6 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl  space-y-2 hover:border-accent transition-all duration-300 group  ${
                  isEven ? "lg:text-right" : "lg:text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isEven ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 inline-block">
                    Step {item.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-inter uppercase mt-5 text-gray-900 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-inter text-gray-600 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* 2. PALLINO CENTRALE SULLA LINEA */}
            <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center z-10">
              {/* Cerchietto Esterno con Bordo */}
              <div className="w-5 h-5 rounded-full bg-white border-2 border-accent flex items-center justify-center">
                {/* Pallino Interno */}
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
            </div>

            {/* 3. BLOCCO VUOTO DI BILANCIAMENTO PER DESKTOP */}
            <div className="hidden lg:block lg:w-1/2" />
          </div>
        );
      })}
    </div>

  </div>

      </section>

      {/* SECTION 3: CALL TO ACTION BANNER */}
      <CtaBanner
        title={dict.ctaBanner.title}
        subtitle={dict.ctaBanner.subtitle}
        buttonText={dict.ctaBanner.buttonText}
        buttonHref="/membership"
      />
    </div>
  );
}