// src/app/events/EventsClientDirectory.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Download, MapPin } from 'lucide-react';
import type { Event } from '@/app/generated/prisma';

interface Props {
  initialEvents: Event[];
}

export default function EventsClientDirectory({ initialEvents }: Props) {
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

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 space-y-12">

        {/* TOP QUICK ACTION TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* <Link
            href="/venue-hire"
            className="bg-[#EAEAEA] hover:bg-gray-200 text-[#1A1A1A] p-5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Venue Hire</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>

          <Link
            href="/submit-event"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-[#1A1A1A] p-5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span className="leading-tight">
              Request your event to be added to the calendar
            </span>
            <Download className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
          </Link> */}

          <Link
            href="/annual-meeting"
            className="bg-[#EAEAEA] hover:bg-gray-200 text-[#1A1A1A] p-5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Annual Meeting</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>

          <Link
            href="/past-events"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-[#1A1A1A] p-5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>Past Events</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>
        </div>

        {/* SECTION HEADER & SEARCH FILTER CONTAINER */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
              Calendario Eventi
            </h1>
            <p className="text-xl font-serif italic text-gray-500 font-light">
              Upcoming Events Calendar
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 space-y-4 shadow-sm">
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cerca evento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[#FAF9F6] border border-gray-200 text-xs font-light text-[#1A1A1A] focus:outline-none focus:border-[#004282]"
                />
              </div>
              <button className="bg-[#004282] text-white px-8 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#003366] transition-colors">
                Search
              </button>
            </div>

            {/* Select Filters Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="font-semibold text-[#1A1A1A] tracking-wider uppercase">
                Filter:
              </span>

              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-[#FAF9F6] border border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-[#004282]"
              >
                <option value="All">Event Topic (All)</option>
                <option value="Dermoscopy">Dermoscopy</option>
                <option value="Paediatric">Paediatric</option>
                <option value="Genomics">Genomics</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-[#FAF9F6] border border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-[#004282]"
              >
                <option value="All">Location (All)</option>
                <option value="Online">Online</option>
                <option value="Cardiff">Cardiff</option>
                <option value="Zurich">Zurich</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-[#FAF9F6] border border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-[#004282]"
              >
                <option value="All">Filter By Month</option>
                <option value="September">September</option>
                <option value="January">January</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#FAF9F6] border border-gray-200 px-3 py-2 text-xs font-light text-gray-700 focus:outline-none focus:border-[#004282]"
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
              <p className="text-gray-500 font-serif italic text-base">
                Nessun evento trovato per i filtri selezionati.
              </p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row hover:border-[#004282] transition-colors overflow-hidden"
              >
                {/* Left Body Section */}
                <div className="flex-1 p-6 md:p-8 space-y-3">
                  <div className="text-xs font-light text-gray-500 uppercase tracking-wider">
                    {event.dateRange}
                  </div>

                  <h3 className="text-xl font-serif text-[#1A1A1A]">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#004282] font-medium italic">
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

                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed pt-2">
                    {event.description}
                  </p>
                </div>

                {/* Right Accreditation Sidebar Section */}
                <div className="w-full md:w-64 bg-[#FAF9F6] md:bg-white border-t md:border-t-0 md:border-l border-gray-200 p-6 flex flex-col items-center justify-between text-center space-y-4 shrink-0">
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
                      <div className="text-[10px] font-serif text-gray-400 uppercase tracking-widest">
                        Partner Institution
                      </div>
                    )}
                  </div>

                  {/* Accreditation Footer Badge */}
                  <div className="w-full pt-2 border-t border-gray-200 text-center">
                    <span className="block text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                      Educational Content Accredited
                    </span>
                    <span className="block text-[10px] font-serif italic text-gray-600">
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