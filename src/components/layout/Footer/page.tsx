import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebook, FaEnvelope, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-sixth text-white pt-10 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP SECTION: Logo + Contact Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 bg-white/10 rounded-full p-2 flex items-center justify-center shrink-0">
              <Image
                src="/images/image_logo_1_edited_white.png" // Your logo path
                alt="SNSA Logo"
                width={48}
                height={48}
                className="object-contain brightness-0 invert"
              />
            </div>
            <div>
              <p className="font-bold text-sm tracking-widest font-serif">
                Swiss Natural <br /> Skincare Association
              </p>
            </div>
          </div>

          {/* Contact Details with Dividers */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm tracking-wider">
            {/* <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white" />
              <span>+41 (0)22 123 45 67</span>
            </div>

            <span className="hidden sm:inline text-white/40">|</span> */}

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" />
              <a href="mailto:info@snsa.ch" className="hover:underline">
                info@swissnaturalskincare.ch
              </a>
            </div>

            <span className="hidden sm:inline text-white/40">|</span>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white shrink-0" />
              <span>Switzerland</span>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: Social Icons (Aligned Right) */}
        <div className="flex justify-end items-center gap-3 pt-2">
          <a
            href="https://www.linkedin.com/company/swiss-natural-skincare-association/home/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white text-[#445238] flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Linkedin"
          >
            <FaLinkedin className="w-4 h-4 fill-current stroke-none" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61595892236106"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white text-[#445238] flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-4 h-4 fill-current stroke-none" />
          </a>
          <a
            href="https://www.instagram.com/snsa_association?dlrf=MTZmamZmMHFjZWZjYw=="
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white text-[#445238] flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* HORIZONTAL DIVIDER */}
        <div className="border-t border-white/20" />

        {/* BOTTOM SECTION: Copyright & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-200">
          <p>©2026 Swiss Natural Skincare Association</p>

          <div className="flex flex-wrap items-center gap-4 font-medium">
            <span>Registered Association No. CHE-123.456.789</span>
            <span className="text-white/40">|</span>
            <Link href="/privacy" className="hover:underline">
              Privacy & Legal
            </Link>
            <span className="text-white/40">|</span>
            <span>Site managed by SNSA Tech</span>
          </div>
        </div>

      </div>
    </footer>
  );
}