'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import type { Member, MemberCategory } from '@/app/generated/prisma';
import CtaBanner from '@/src/components/ui/CtaBanner/page';
import PageHeader from '@/src/components/ui/PageHeader/page';

const MEMBERSHIPS = [
  {
    title: 'Ordinary Member',
    badge: 'Individual',
    price: 'CHF 450',
    desc: 'For individuals who wish to actively participate in and support the Association.',
    btnText: 'Apply Now',
  },
  {
    title: 'Supporting Member',
    badge: 'Corporate & Brands',
    price: 'CHF 190',
    desc: 'For companies, skincare brands, beauty institutes, distributors, retailers, associations and other organisations that support SNSA’s mission.',
    btnText: 'Apply as Organization',
  },
  {
    title: 'Honorary Member',
    badge: 'By Recognition',
    price: 'CHF 120',
    desc: 'For experts, professionals and other individuals or organisations recognised for their contribution to the Association’s mission.',
    btnText: 'Inquire Eligibility',
  },
];

interface MembershipClientDirectoryDict {
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
  dict: MembershipClientDirectoryDict;
}

export default function MembershipClientDirectory({
  dict
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      
    {/* SECTION 1: SEARCH & FILTER BAR */}
    <section className="max-w-6xl mx-auto py-15 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-accent">
            Join the Network
          </span>
          <h2 className="text-3xl md:text-3xl font-bold font-cormorant text-gray-900">
            Membership Types
          </h2>
        </div>

        {/* 
          Container Griglia: 
          onMouseLeave ripristina lo stato a null per far tornare attiva la card centrale
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {MEMBERSHIPS.map((item, index) => {
            // Calcolo dinamicamente se QUESTA specifica card deve essere attiva
            const isActive =
              hoveredIndex === null ? index === 1 : hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative border-2 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#FBFBFB] border-second shadow-md -translate-y-1'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Top Badge (Visibile solo se la card è attiva) */}
                {isActive && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-second text-white text-[9px] font-montserrat font-bold uppercase tracking-widest px-3 py-1 transition-opacity duration-300">
                    {index === 1 ? 'Corporate & Brands' : 'Selected Option'}
                  </span>
                )}

                <div className="space-y-4 pt-2">
                  <span
                    className={`text-[10px] font-montserrat font-bold uppercase tracking-widest block ${
                      isActive ? 'text-second' : 'text-gray-400'
                    }`}
                  >
                    {item.badge}
                  </span>

                  <h3 className="text-2xl font-bold font-cormorant text-gray-900">
                    {item.title}
                  </h3>

                  <div className="pt-2">
                    <span
                      className={`text-3xl font-bold font-cormorant transition-colors ${
                        isActive ? 'text-second' : 'text-gray-900'
                      }`}
                    >
                      {item.price}
                    </span>
                    <span className="text-xs font-inter text-gray-500"> / year</span>
                  </div>

                  <p className="text-xs font-inter text-gray-600 leading-relaxed pt-4 border-t border-gray-100">
                    {item.desc}
                  </p>
                </div>

                {/* Bottone dinamico */}
                <button
                  className={`mt-8 w-full py-3 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer font-montserrat ${
                    isActive
                      ? 'bg-second text-white border border-second hover:bg-opacity-90'
                      : 'border border-gray-400 text-gray-400 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {item.btnText}
                </button>
              </div>
            );
          })}
        </div>

      </div>

      </section>

      {/* SECTION 2: MEMBER CARDS GRID */}
      {/* <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200 my-12">
  {[
    {
      title: "Ordinary Member",
      target: "Individuals",
      price: "CHF 450",
      period: "/ year",
      desc: "For individuals who wish to actively participate in and support the Association."
    },
    {
      title: "Supporting Member",
      target: "Companies & Brands",
      price: "CHF 190",
      period: "/ year",
      desc: "For companies, skincare brands, beauty institutes, distributors, retailers, associations and other organisations that support SNSA’s mission."
    },
    {
      title: "Honorary Member",
      target: "Experts & Professionals",
      price: "CHF 120",
      period: "/ year",
      desc: "For experts, professionals and other individuals or organisations recognised for their contribution to the Association’s mission."
    }
  ].map((item, idx) => (
    <div key={idx} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-4 space-y-1">
        <span className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-accent block">
          {item.target}
        </span>
        <h3 className="text-2xl font-bold font-cormorant text-gray-900">
          {item.title}
        </h3>
      </div>
      
      <div className="md:col-span-5">
        <p className="text-xs font-inter text-gray-600 leading-relaxed">
          {item.desc}
        </p>
      </div>

      <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-2">
        <div>
          <span className="text-2xl font-bold font-cormorant text-gray-900">{item.price}</span>
          <span className="text-xs font-inter text-gray-500">{item.period}</span>
        </div>
        <button className="border border-gray-900 px-5 py-2 text-[11px] font-medium uppercase tracking-wider hover:bg-accent hover:border-accent hover:text-white transition-colors cursor-pointer">
          Apply
        </button>
      </div>
    </div>
  ))}
</div>
      </section> */}

      {/* SECTION 3: CALL TO ACTION BANNER */}
      <CtaBanner
        title={dict.ctaBanner.title}
        subtitle={dict.ctaBanner.subtitle}
        buttonText={dict.ctaBanner.buttonText}
        buttonHref="/membership"
        bgColor="second"
      />
    </div>
  );
}