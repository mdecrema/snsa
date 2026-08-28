'use client';

import Link from 'next/link';
import type { Event } from '@/app/generated/prisma'; // Adjust import path according to your Prisma client setup

interface Props {
  events: Event[];
  labels: {
    title: string;
    subtitle?: string;
    viewAll?: string;
    readMore?: string;
    noEvents?: string;
  };
}

export default function FeaturedEventsSection({ events, labels }: Props) {
  // Filter dynamically for featured events (or fallback to empty array)
  const featuredEvents = events?.filter((event) => event.isFeatured) || [];

  return (
    <section className="w-full bg-lightgrey py-16 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl sm:text-3xl tracking-tight">
              {labels.title}
            </h2>
            <p className="text-base sm:text-lg italic text-gray-500 font-light">
              {labels.subtitle}
            </p>
          </div>

          <Link
            href="/events"
            className="text-sm tracking-widest bg-sixth border border-transparent text-white hover:bg-white hover:border-sixth hover:text-sixth transition-colors px-5 py-2.5"
          >
            {labels.viewAll}
          </Link>
        </div>

        {/* 3-Column Events Grid */}
        {featuredEvents.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 p-8 text-center">
            <p className="text-xs text-gray-400 italic font-serif">
              {labels.noEvents}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 p-6 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-sm hover:border-sixth transition-colors duration-200"
              >
                <div className="space-y-4">
                  {/* Date Range Tag */}
                  <span className="inline-block bg-lightgrey border border-gray-200 text-[11px] font-sans font-semibold tracking-wider px-2.5 py-1 uppercase">
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
                    className="inline-block text-xs font-semibold tracking-wider uppercase text-gray-400 hover:text-sixth transition-colors border-b border-transparent hover:border-sixth pb-0.5"
                  >
                    {labels.readMore}
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