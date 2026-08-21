// src/components/layout/PageHeaderBanner.tsx
'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getLocalizedField } from '@/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { NavItem } from '@/app/generated/prisma';
import "../PageHeaderBanner/page.scss";

interface PageHeaderBannerProps {
  navItems: NavItem[];
  children?: React.ReactNode; // Optional custom details to render inside the white card
}

export default function PageHeaderBanner({ navItems, children }: PageHeaderBannerProps) {
  const pathname = usePathname();
  const { locale } = useLanguage();

  // Hide on homepage if you are using a dedicated Jumbotron there
  if (pathname === '/') return null;

  const currentRoute = navItems.find((item: any) => item.href === pathname);
  if (!currentRoute) return null;

    // Live draft override state for Admin Preview
  const [liveDraft, setLiveDraft] = useState<{
    title?: Record<string, string>;
    subtitle?: Record<string, string>;
    description?: Record<string, string>;
    image?: string;
  } | null>(null);

  // Listen for real-time postMessage events from Admin Iframe parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ADMIN_LIVE_PREVIEW_UPDATE') {
        setLiveDraft(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // const title = getLocalizedField(currentRoute.title, locale, 'en');
  // const subtitle = getLocalizedField(currentRoute.subtitle, locale, 'en');
  // const description = getLocalizedField(currentRoute.description, locale, 'en');
  // const bgImageSrc = currentRoute.image || '/images/hero-default.jpg';

  // Use live draft state if present; otherwise fall back to DB values
  const activeTitle = liveDraft?.title 
    ? liveDraft.title[locale] || liveDraft.title['en'] 
    : getLocalizedField(currentRoute.title, locale, 'en');

  const activeSubtitle = liveDraft?.subtitle 
    ? liveDraft.subtitle[locale] || liveDraft.subtitle['en'] 
    : getLocalizedField(currentRoute.subtitle, locale, 'en');

  const activeDesc = liveDraft?.description 
    ? liveDraft.description[locale] || liveDraft.description['en'] 
    : getLocalizedField(currentRoute.description, locale, 'en');

  const bgImageSrc = liveDraft?.image || currentRoute.image || '/images/hero-default.jpg';

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative w-full min-h-[360px] md:min-h-[420px] flex items-center pt-12 pb-32 px-6 md:px-12 overflow-hidden">
        {/* Background Image */}
        <Image
          src={bgImageSrc}
          alt={activeTitle || 'Banner'}
          fill
          priority
          className="object-cover object-center"
        />

        {/* Brand Tint / Opacity Overlay */}
        <div className="absolute inset-0 bg-[#445238]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content (Title & Subtitle) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {activeTitle}
          </h1>
          {activeSubtitle && (
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl font-light leading-relaxed">
              {activeSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* 2. OVERLAPPING WHITE CONTAINER */}
      <section className="page-header-banner-description-box max-w-6xl mx-auto px-6 relative z-20 -mt-20 md:-mt-24 mb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          {activeDesc && (
            <p className="drop-cap text-gray-600 leading-relaxed">
              {activeDesc}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}