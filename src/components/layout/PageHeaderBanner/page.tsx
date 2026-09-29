// src/components/layout/PageHeaderBanner.tsx
'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getLocalizedField } from '@/lib/utils';
import { useLanguage } from '@/src/context/LanguageContext';
import { NavItem } from '@/app/generated/prisma';
import "../PageHeaderBanner/page.scss";
import Link from 'next/link';

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
    <div className="relative w-full ">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
       <section className="relative w-full min-h-[360px] bg-[#0B2545] text-white overflow-hidden border-b border-slate-200">
      {/* Optional Background Image with Subtle Dark Overlay */}
      {bgImageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageSrc}
            alt={activeTitle || 'Banner'}
            fill
            className="object-cover object-center filter grayscale"  
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#917f5c] via-[#917f5c]/90 to-[#917f5c]/70" /> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#776DA9] via-[#5F3F4E]/90 to-[#5F3F4E]/70" />
        </div>
      )}

      {/* Main Banner Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 ">
        <div className="max-w-3xl space-y-4">
          
          {/* Breadcrumb / Tag */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white font-montserrat">
            <Link href="/" className="text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className=" text-white">{activeTitle}</span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {activeTitle}
            </h1>
            <p className="text-base sm:text-xl text-white italic">
              {activeSubtitle}
            </p>
          </div>

          {/* Description Body */}
          {activeDesc && (
            <p className="text-xs sm:text-sm text-white leading-relaxed pt-2 font-light max-w-3xl tracking-widest font-inter">
              {activeDesc}
            </p>
          )}

        </div>
      </div>
    </section>




    </div>
  );
}