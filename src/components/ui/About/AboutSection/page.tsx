// src/components/ui/AboutSection.tsx
'use client';

import PageHeader from "../../PageHeader/page";
import { 
  Award,          // per Quality
  ShieldCheck,    // per Scientific Integrity
  Eye,            // per Transparency
  Leaf,           // per Sustainability
  Users,          // per Collaboration
  Sparkles        // per Innovation & Tradition
} from 'lucide-react';

export interface Values {
  num: string,
  icon: string,
  title: string,
  description: string
}

interface AboutSectionDict {
  pageHeader: {
    title: string,
    subtitle: string,
    description: string
  },
  ourValues: {
    title: string,
    subtitle: string,
    listItem: {
      item1: {
        title: string,
        description: string
      },
      item2: {
        title: string,
        description: string
      },
      item3: {
        title: string,
        description: string
      },
      item4: {
        title: string,
        description: string
      },
      item5: {
        title: string,
        description: string
      },
      item6: {
        title: string,
        description: string
      }   
    }
  },
  governance: {
    title: string,
    subtitle: string,
    description: string,
    buttonText: string,
    commetees: {
      card1: {
        title: string,
        subtitle: string,
        description: string
      },
      card2: {
        title: string,
        subtitle: string,
        description: string
      },
    }
  }
}

interface Props {
  dict: AboutSectionDict;
}

export default function AboutSection({dict}: Props) {
   const VALUES = [
    {
      num: "01",
      icon: Award,
      title: dict.ourValues.listItem.item1.title,
      description: dict.ourValues.listItem.item1.description
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: dict.ourValues.listItem.item2.title,
      description: dict.ourValues.listItem.item2.description
    },
    {
      num: "03",
      icon: Eye,
      title: dict.ourValues.listItem.item3.title,
      description: dict.ourValues.listItem.item3.description
    },
    {
      num: "04",
      icon: Leaf,
      title: dict.ourValues.listItem.item4.title,
      description: dict.ourValues.listItem.item4.description
    },
    {
      num: "05",
      icon: Users,
      title: dict.ourValues.listItem.item5.title,
      description: dict.ourValues.listItem.item5.description
    },
    {
      num: "06",
      icon: Sparkles,
      title: dict.ourValues.listItem.item6.title,
      description: dict.ourValues.listItem.item6.description
    },
  ];


  return (
    <div className="min-h-screen pb-20">
      <PageHeader
            title={dict.pageHeader.title}
            subtitle={dict.pageHeader.subtitle}
            description={dict.pageHeader.description}
            quickActions={[
              { label: 'Home', href: '/', variant: 'filled' },
              { label: 'Members', href: '/members', variant: 'outlined' },
            ]}
          />
            
          {/* SECTION: OUR VALUES - EDITORIAL LIST */}
          <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 border-t border-gray-200">
            
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
    
    {/* Colonna Sinistra: Sticky Header + Immagine Editoriale */}
    <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full min-h-0">
      
      {/* Header */}
      <div className="space-y-2 shrink-0">
        <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#758156]">
          {dict.ourValues.subtitle}
        </span>
        <h2 className="text-3xl font-bold font-cormorant text-gray-900">
          {dict.ourValues.title}
        </h2>
      </div>

      {/* Immagine Editoriale sotto al Titolo */}
      <div className="relative w-auto flex-1 min-h-[220px] overflow-hidden group">
        <img
          src="/images/ricercaAbout.jpg" // Sostituisci col tuo percorso immagine
          alt="SNSA Values - Nature & Science"
          className="absolute inset-0 w-auto h-full"
        />
        {/* Sovrapposizione o piccola caption opzionale in stile Swiss */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-700">
            SNSA / Ethical Standards
          </span>
        </div>
      </div>

    </div>

    {/* Colonna Destra (Listato Orizzontale) */}
    <div className="lg:col-span-7 divide-y divide-gray-200 border-b border-gray-200">
      {VALUES.map((value, idx) => {
            const IconComponent = value.icon;

            return (
              <div 
                key={idx} 
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:bg-gray-50/50 transition-colors px-2 -mx-2"
              >
                {/* 1. Spazio Icona / Numero (2 colonne su desktop) */}
                <div className="md:col-span-1 flex items-center space-x-3">
                  {/* Contenitore Icona Minimal */}
                  <div className="flex items-center justify-center text-gray-900 group-hover:text-second transition-all duration-300">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>
                  
                  {/* Numero Discreto */}
                  {/* <span className="font-mono text-xs text-gray-400 font-semibold md:hidden">
                    {value.num}
                  </span> */}
                </div>

                {/* 2. Titolo (4 colonne su desktop) */}
                <div className="md:col-span-5">
                  <h3 className="text-xl font-bold font-cormorant text-gray-900 group-hover:text-second transition-colors">
                    {value.title}
                  </h3>
                </div>

                {/* 3. Descrizione (6 colonne su desktop) */}
                <div className="md:col-span-6">
                  <p className="text-sm font-inter text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
    </div>

  </div>

      </section>

      {/* SECTION: GOVERNANCE */}
<section className="max-w-6xl mx-auto py-20 px-4 sm:px-6">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    
    {/* Colonna Sinistra: Titolo & CTA */}
    <div className="lg:col-span-5 space-y-6">
      <div className="space-y-2">
        <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#758156]">
          {dict.governance.subtitle}
        </span>
        <h2 className="text-3xl font-bold font-cormorant text-gray-900">
          {dict.governance.title}
        </h2>
      </div>

      <p className="text-sm font-inter text-gray-600 leading-relaxed">
          {dict.governance.description}
      </p>

      {/* Button Desktop / Tablet */}
      <div className="pt-2">
        <a
          href="/committees" // o la rotta corrispondente
          className="inline-block bg-accent text-white hover:bg-white hover:text-accent border border-accent px-8 py-3 text-xs font-medium font-inter uppercase tracking-widest transition-colors cursor-pointer"
        >
          {dict.governance.buttonText}
        </a>
      </div>
    </div>

    {/* Colonna Destra: I 2 Comitati */}
    <div className="lg:col-span-7 space-y-6">
      
      {/* Steering Committee Card */}
      <div className="bg-[#FBFBFB] border-y border-r border-gray-200 border-l-4 border-l-accent p-8 space-y-3 hover:bg-white hover:shadow-xs transition-all">
        <span className="text-[10px] font-montserrat font-bold text-accent uppercase tracking-widest block">
          {dict.governance.commetees.card1.subtitle}
        </span>
        <h3 className="text-2xl font-bold font-cormorant text-gray-900">
          {dict.governance.commetees.card1.title}
        </h3>
        <p className="text-sm font-inter text-gray-600 leading-relaxed">
          {dict.governance.commetees.card1.description}
        </p>
      </div>

      {/* Scientific Committee Card */}
      <div className="bg-[#FBFBFB] border-y border-r border-gray-200 border-l-4 border-l-accent p-8 space-y-3 hover:bg-white hover:shadow-xs transition-all">
        <span className="text-[10px] font-montserrat font-bold text-accent uppercase tracking-widest block">
          {dict.governance.commetees.card2.subtitle}
        </span>
        <h3 className="text-2xl font-bold font-cormorant text-gray-900">
          {dict.governance.commetees.card2.title}
        </h3>
        <p className="text-sm font-inter text-gray-600 leading-relaxed">
          {dict.governance.commetees.card2.description}
        </p>
      </div>

    </div>

  </div>
</section>

    </div>
  );
}