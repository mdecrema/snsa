'use client';

import Link from 'next/link';
import type { Event } from '@/app/generated/prisma'; // Adjust import path according to your Prisma client setup

interface Props {
  events: Event[];
}

export default function FeaturedEventsSection({ events }: Props) {
  // Filter dynamically for featured events (or fallback to empty array)
  const featuredEvents = events?.filter((event) => event.isFeatured) || [];

  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-4 md:px-8 font-sans border-t border-gray-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
              Eventi in Evidenza
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-gray-500 font-light">
              Featured Events
            </p>
          </div>

          <Link
            href="/events"
            className="border border-[#004282] text-[#004282] hover:bg-[#004282] hover:text-white transition-colors duration-200 px-6 py-2 text-xs font-serif italic tracking-wide bg-white"
          >
            More
          </Link>
        </div>

        {/* 3-Column Events Grid */}
        {featuredEvents.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 p-8 text-center">
            <p className="text-xs text-gray-400 italic font-serif">
              Nessun evento in evidenza al momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 p-6 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-sm hover:border-[#004282] transition-colors duration-200"
              >
                <div className="space-y-4">
                  {/* Date Range Tag */}
                  <span className="inline-block bg-[#FAF9F6] border border-gray-200 text-gray-600 text-[11px] font-semibold tracking-wider px-2.5 py-1 uppercase">
                    {event.dateRange}
                  </span>

                  {/* Event Title */}
                  <h3 className="text-base font-serif text-[#1A1A1A] leading-snug line-clamp-3">
                    {event.title}
                  </h3>
                </div>

                {/* Action Link */}
                <div className="pt-4">
                  <Link
                    href={event.linkHref || `/events`}
                    className="inline-block text-xs font-semibold tracking-wider uppercase text-gray-400 hover:text-[#004282] transition-colors border-b border-transparent hover:border-[#004282] pb-0.5"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}