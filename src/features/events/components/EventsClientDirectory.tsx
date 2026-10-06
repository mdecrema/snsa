// src/app/events/EventsClientDirectory.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Download, MapPin } from 'lucide-react';
import type { Event } from '@/app/generated/prisma';
import PageHeader from '@/src/components/ui/PageHeader/page';
import { FeatureCard } from '@/src/components/ui/FeatureCard/page';
import { HorizontalFeatureCard } from '@/src/components/ui/HorizontalFeatureCard/page';

export interface Services {
  title: string,
  description: string
}

interface EventsClientDirectoryDict {
  // ourCustomServices: string,
  title1: string,
  cards: {
    card1: { title: string; description: string; };
    card2: { title: string; description: string; };
    card3: { title: string; description: string; };
    card4: { title: string; description: string; };
    card5: { title: string; description: string; };
    card6: { title: string; description: string; };
  },
  title2: string,
  text2: string,
  title3: string
  // ctaBanner: {
  //   title: string,
  //   subtitle: string,
  //   buttonText: string
  // }
}

interface Props {
  initialEvents: Event[];
  dict: EventsClientDirectoryDict;
}

export default function EventsClientDirectory({ initialEvents, dict }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Dynamic filter lists from database
  const topicOptions = useMemo(() => {
    return Array.from(new Set(initialEvents.map((evt) => evt.topic).filter(Boolean))).sort();
  }, [initialEvents]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(initialEvents.map((evt) => evt.location).filter(Boolean))).sort();
  }, [initialEvents]);

  const monthOptions = useMemo(() => {
    return Array.from(new Set(initialEvents.map((evt) => evt.month).filter(Boolean))).sort();
  }, [initialEvents]);

  const yearOptions = useMemo(() => {
    return Array.from(new Set(initialEvents.map((evt) => evt.year).filter(Boolean))).sort();
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic = selectedTopic === 'All' || event.topic === selectedTopic;
      const matchesLocation = selectedLocation === 'All' || event.location.includes(selectedLocation);
      const matchesMonth = selectedMonth === 'All' || event.month === selectedMonth;
      const matchesYear = selectedYear === 'All' || event.year === selectedYear;

      return matchesSearch && matchesTopic && matchesLocation && matchesMonth && matchesYear;
    });
  }, [initialEvents, searchQuery, selectedTopic, selectedLocation, selectedMonth, selectedYear]);

  const EVENT_TYPES = [
    {
      title: dict.cards.card1.title,
      description: dict.cards.card1.description
    },
    {
      title: dict.cards.card2.title,
      description: dict.cards.card2.description
    },
    {
      title: dict.cards.card3.title,
      description: dict.cards.card3.description
    },
    {
      title: dict.cards.card4.title,
      description: dict.cards.card4.description
    },
    {
      title: dict.cards.card5.title,
      description: dict.cards.card5.description
    },
    {
      title: dict.cards.card6.title,
      description: dict.cards.card6.description
    },
  ];

  return (
    <div className="min-h-screen pb-20">
        {/* TOP QUICK ACTION TILES */}
        <PageHeader
          title={dict.title2}
          subtitle="Our Formats"
          description={dict.text2}
          quickActions={[
            { label: 'Annual Meeting', href: '/annual-meeting', variant: 'filled' },
            { label: 'Past Events', href: '/past-events', variant: 'outlined' },
          ]}
        />

        
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 space-y-12">

      
                         

          {/* SECTION: OUR FORMATS */}
<section className="pb-12">

  <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
  {EVENT_TYPES.map((item, index) => (
    <details
      key={index}
      className="group py-4 transition-colors cursor-pointer [&_summary::-webkit-details-marker]:none"
    >
      <summary className="flex items-center justify-between font-cormorant text-xl md:text-2xl font-bold text-gray-900 group-hover:text-accent transition-colors">
        <div className="flex items-center gap-4">
          <span className="font-montserrat text-xs font-semibold text-accent/70 tracking-widest">
            0{index + 1}
          </span>
          <span className="uppercase font-montserrat text-base">{item.title}</span>
        </div>
        <span className="font-sans text-sm text-gray-400 group-open:rotate-45 transition-transform">
          +
        </span>
      </summary>

      <div className="pl-9 pt-3 pb-2 text-sm font-inter text-gray-600 leading-relaxed tracking-wider max-w-3xl">
        {item.description}
      </div>
    </details>
  ))}
</div>

  {/* Griglia a 2 colonne su Desktop / 1 su Mobile */}
 {/* {EVENT_TYPES.map((item, index) => (
    <div
      key={index}
      className="group relative bg-[#FBFBFB] border border-gray-200/80 p-6 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all duration-300"
    >
    
      <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-80 group-hover:w-1.5 transition-all" />

      <div className="pl-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-montserrat font-bold text-accent tracking-widest uppercase">
            Format 0{index + 1}
          </span>
        </div>

        <h3 className="text-2xl font-bold font-cormorant text-gray-900 group-hover:text-accent transition-colors mb-2">
          {item.title}
        </h3>

        <p className="text-xs font-inter text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div> */}
</section>


{/* SECTION HEADER FOR SEARCH */}
<div className="pt-6 space-y-2">
  <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-accent">
    // Event Directory
  </span>
  <h2 className="text-3xl font-bold font-cormorant text-gray-900">
    {dict.title3}
  </h2>
</div>
      
                   



        {/* SECTION HEADER & SEARCH FILTER CONTAINER */}
        <div className="space-y-6">

          <div className="bg-white border rounded-2xl border-gray-200 p-6 space-y-4 shadow-sm">
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cerca evento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5  border border-gray-200 text-xs font-light text-[#1A1A1A] focus:outline-none focus:border-accent"
                />
              </div>
              <button className="cursor-pointer font-montserrat border border-transparent text-white bg-accent hover:border-accent hover:bg-white hover:text-accent px-8 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors">
                Search
              </button>
            </div>

            {/* Select Filters Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="font-semibold font-montserrat text-[#1A1A1A] tracking-wider uppercase">
                Filter:
              </span>

              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className=" border font-inter border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-accent"
              >
                <option value="All">Event Topic (All)</option>
                <option value="Dermoscopy">Dermoscopy</option>
                <option value="Paediatric">Paediatric</option>
                <option value="Genomics">Genomics</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className=" border font-inter border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-accent"
              >
                <option value="All">Location (All)</option>
                <option value="Online">Online</option>
                <option value="Cardiff">Cardiff</option>
                <option value="Zurich">Zurich</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className=" border font-inter border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-accent"
              >
                <option value="All">Filter By Month</option>
                <option value="September">September</option>
                <option value="January">January</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className=" border border-gray-200 font-inter px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-accent"
              >
                <option value="All">Filter By Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH EVENT CARDS LIST */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-500 font-inter italic text-base">
                Nessun evento trovato per i filtri selezionati.
              </p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-2xl border-gray-200 shadow-sm flex flex-col md:flex-row hover:border-accent transition-colors overflow-hidden"
              >
                {/* Left Body Section */}
                <div className="flex-1 p-6 md:p-8 space-y-3">
                  <div className="text-xs font-montserrat font-light text-gray-500 uppercase tracking-wider">
                    {event.dateRange}
                  </div>

                  <h3 className="text-xl font-cormorant text-[#1A1A1A]">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-accent font-inter font-medium italic">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                    {event.accreditationText && (
                      <>
                        <span className="text-gray-300 font-normal">|</span>
                        <span className="text-blue-900 font-light">
                          {event.accreditationText}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-light font-inter leading-relaxed pt-2">
                    {event.description}
                  </p>
                </div>

                {/* Right Accreditation Sidebar Section */}
                <div className="w-full md:w-64  md:bg-white border-t md:border-t-0 md:border-l border-gray-200 p-6 flex flex-col items-center justify-between text-center space-y-4 shrink-0">
                  {/* Institution Logo Placeholder */}
                  <div className="w-full h-20 flex items-center justify-center border border-gray-100 bg-white p-2">
                    {event.logoUrl ? (
                      <Image
                        src={event.logoUrl}
                        alt="Institution Logo"
                        width={180}
                        height={60}
                        className="object-contain max-h-full"
                      />
                    ) : (
                      <div className="text-[10px] font-inter text-gray-400 uppercase tracking-widest">
                        Partner Institution
                      </div>
                    )}
                  </div>

                  {/* Accreditation Footer Badge */}
                  <div className="w-full pt-2 border-t border-gray-200 text-center font-inter">
                    <span className="block text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                      Educational Content Accredited
                    </span>
                    <span className="block text-[10px] italic text-gray-600">
                      Standard SNSA / CME
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}