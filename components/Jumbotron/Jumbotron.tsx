"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styles from "./Jumbotron.module.scss";

const slides = [
  {
    category: "Report",
    title: "Integrating Innovation: Charting the course for AI in Dermatology",
    image:
      "/images/nurse_img.webp",
    alt: "Dermatology AI",
    href: "#",
  },
  {
    category: "News",
    title: "Natural Skincare Accreditation Standards for 2026",
    image: "/images/nurse_img.webp",
    alt: "Skincare",
    href: "#",
  },
];

export default function Jumbotron() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.heroRow}>
        <Swiper
          modules={[
            Autoplay,
            EffectFade,
            Navigation,
            Pagination,
          ]}
          className={styles.Jumbotron}
          loop={true}
          speed={600}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slideRow}>
                {/* Left: Text */}
                <div className={styles.textColumn}>
                  <span className={styles.category}>
                    {slide.category}
                  </span>

                  <h2>{slide.title}</h2>

                  <div>
                    <a
                      href={slide.href}
                      className={styles.readMore}
                    >
                      Read more
                    </a>
                  </div>
                </div>

                {/* Right: Image */}
                <div className={styles.imageColumn}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className={styles.slideImage}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

