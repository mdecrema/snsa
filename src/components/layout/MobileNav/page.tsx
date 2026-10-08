'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Icone per il pulsante

interface NavItem {
  id: string;
  title: string;
  url: string;
}

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between">
      {/* Menu Desktop (visibile da 'md' in poi) */}
      <div className="hidden md:flex items-center gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="hover:text-gray-200 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Pulsante Hamburger per Mobile (visibile fino a 'md') */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-white focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dropdown Menu Mobile (a comparsa sotto lo schermo md) */}
      {isOpen && (
        <div className="absolute top-[210px] left-0 w-full bg-second border-t border-white/10 flex flex-col p-6 gap-4 md:hidden z-50 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={() => setIsOpen(false)} // Chiudi il menu al click
              className="text-white text-lg hover:opacity-80 transition-opacity"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}