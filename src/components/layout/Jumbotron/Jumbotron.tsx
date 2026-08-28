'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 1. Direct SCSS import (non-module)
import './Jumbotron.scss';

const SLIDES = [
  {
    id: 1,
    badge: 'Report',
    title: 'Integrating Innovation: Charting the course for AI in Dermatology',
    link: '/news',
    image: '/images/doctor.avif',
    alt: 'Dermatology AI',
  },
  {
    id: 2,
    badge: 'News',
    title: 'Natural Skincare Accreditation Standards for 2026',
    link: '/about',
    image: '/images/nurse_img.webp',
    alt: 'Skincare',
  },
];

export default function Jumbotron() {
  return (
    <section className="w-full pt-20">
      {/* 2. Plain string ID */}
      <div id="heroSwiper" className="w-full h-[530px]">
        <Swiper
          id="heroCarousel"
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="w-full h-full text-white"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className="w-full h-full">
              <div className="grid grid-cols-1 md:grid-cols-12 h-full w-full">
                {/* Text Side */}
                <div className="md:col-span-5 bg-sixth flex flex-col justify-center px-8 md:pl-[100px] md:pr-[50px] text-white h-full">
                  <span className="inline-block self-start mb-3 text-white text-xs font-semibold uppercase tracking-wider py-2.5">
                    {slide.badge}
                  </span>

                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-[1.3] border-t border-white py-5">
                    {slide.title}
                  </h2>

                  <div>
                    <Link
                      href={slide.link}
                      className="tracking-widest inline-block border border-white text-white px-5 py-2.5 hover:bg-white hover:text-sixth text-sm transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="md:col-span-7 relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={slide.id === 1}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}