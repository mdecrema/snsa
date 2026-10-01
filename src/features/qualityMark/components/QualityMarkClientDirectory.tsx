'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import type { Member, MemberCategory } from '@/app/generated/prisma';
import CtaBanner from '@/src/components/ui/CtaBanner/page';
import PageHeader from '@/src/components/ui/PageHeader/page';
import { HorizontalFeatureCard } from '@/src/components/ui/HorizontalFeatureCard/page';
import { AssessmentSectionSplit } from '@/src/components/ui/AssessmentSectionSplit/page';

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
              Certification Standard
            </span>
            <h1 className="text-xl md:text-xl font-bold font-cormorant text-gray-900 leading-tight">
              The Quality Mark
            </h1>
          </div>

          {/* Testo Introduttivo */}
          <div className="lg:col-span-7 space-y-6 lg:pt-2">
            <p className="text-sm font-inter text-gray-700 leading-relaxed tracking-wide">
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


      {/* 3. THREE LEVELS OF RECOGNITION */}
      <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6 border-t border-gray-200 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
            Three Levels
          </span>
          <h2 className="text-3xl font-bold font-cormorant text-gray-900">
            Three Levels of Recognition
          </h2>
        </div>

        {/* 3 Level Cards Progressive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Level 1: Basic */}
          <div className="bg-white border border-gray-200 p-8 flex flex-col justify-between space-y-6 hover:border-gray-400 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-gray-400 uppercase tracking-widest block">
                Level 01
              </span>
              <h3 className="text-2xl font-bold font-cormorant text-gray-900">
                Basic
              </h3>
              <p className="text-xs font-inter text-gray-600 leading-relaxed pt-3 border-t border-gray-100">
                Meets the essential requirements of the SNSA Quality Mark.
              </p>
            </div>
            <div className="w-full h-1 bg-gray-200" />
          </div>

          {/* Level 2: Advanced */}
          <div className="bg-[#FBFBFB] border border-second p-8 flex flex-col justify-between space-y-6 shadow-xs relative">
            <div className="space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-second uppercase tracking-widest block">
                Level 02
              </span>
              <h3 className="text-2xl font-bold font-cormorant text-gray-900">
                Advanced
              </h3>
              <p className="text-xs font-inter text-gray-600 leading-relaxed pt-3 border-t border-gray-200">
                Demonstrates a higher level of commitment across the assessment criteria.
              </p>
            </div>
            <div className="w-full h-1 bg-second/60" />
          </div>

          {/* Level 3: Excellence */}
          <div className="bg-white border-2 border-second p-8 flex flex-col justify-between space-y-6 shadow-md relative">
            <span className="absolute -top-3 right-6 bg-second text-white text-[9px] font-montserrat font-bold uppercase tracking-widest px-3 py-1">
              Top Tier
            </span>
            <div className="space-y-3">
              <span className="text-[10px] font-montserrat font-bold text-second uppercase tracking-widest block">
                Level 03
              </span>
              <h3 className="text-2xl font-bold font-cormorant text-gray-900">
                Excellence
              </h3>
              <p className="text-xs font-inter text-gray-600 leading-relaxed pt-3 border-t border-gray-100">
                Recognises outstanding performance and a comprehensive approach to natural skincare quality and responsibility.
              </p>
            </div>
            <div className="w-full h-1.5 bg-second" />
          </div>

        </div>

      </section>


      {/* 4. PROCESS: HOW IT WORKS */}
      <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6 border-t border-gray-200 space-y-12">
        
        {/* Section Header */}
  <div className="text-center max-w-xl mx-auto space-y-2">
    <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-accent">
      Process
    </span>
    <h2 className="text-3xl md:text-4xl font-bold font-cormorant text-gray-900">
      How It Works
    </h2>
    <p className="text-xs font-inter text-gray-500 tracking-wide pt-1">
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
            className={`relative flex flex-col lg:flex-row items-start lg:items-center ${
              isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* 1. CONTENUTO DELLO STEP (Card o Blocco Testo) */}
            <div className="w-full lg:w-1/2 pl-14 lg:pl-0 lg:px-10">
              <div
                className={`bg-[#FBFBFB] border border-gray-200 p-6 space-y-2 hover:border-accent transition-all duration-300 group shadow-2xs ${
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
                <h3 className="text-xl font-bold font-cormorant text-gray-900 group-hover:text-accent transition-colors">
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