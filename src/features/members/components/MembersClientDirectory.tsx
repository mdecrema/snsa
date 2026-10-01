'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import type { Member, MemberCategory } from '@/app/generated/prisma';
import CtaBanner from '@/src/components/ui/CtaBanner/page';
import PageHeader from '@/src/components/ui/PageHeader/page';

export type MemberWithCategory = Member & {
  category: MemberCategory;
};

interface MembersClientDirectoryDict {
  pageHeader: {
    title: string,
    subtitle: string,
    description: string
  },
  memberList: {
    searchBar: {
      [key: string]: string;
      filterBy: string
      all: string
      brands: string
      laboratories: string
      professionals: string
      retailers: string
      partners: string
    }
  },
  ctaBanner: {
    title: string
    subtitle: string
    buttonText: string
  }
}

interface Props {
  initialCategories: MemberCategory[];
  initialMembers: MemberWithCategory[];
  dict: MembersClientDirectoryDict;
}

export default function MembersClientDirectory({
  initialCategories,
  initialMembers,
  dict
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');

  const filteredMembers = useMemo(() => {
    return initialMembers.filter((member) => {
      const matchesCategory =
        selectedCategory === 'Tutti' || member.category.name === selectedCategory;

      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialMembers, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-20">
      
    <PageHeader
      title={dict.pageHeader.title}
      subtitle={dict.pageHeader.subtitle}
      description={dict.pageHeader.description}
      quickActions={[
        { label: 'Home', href: '/', variant: 'filled' },
        { label: 'Membership', href: '/membership', variant: 'outlined' },
      ]}
    />
      
      {/* SECTION 1: SEARCH & FILTER BAR */}
      <section className="max-w-6xl mx-auto pt-10 pb-6 px-6">
        <div className="bg-white p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 font-inter" />
            <input
              type="text"
              placeholder="Cerca per nome, città (es. Zürich, Lugano) o parola chiave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-[#1A1A1A] placeholder-gray-400 font-inter focus:outline-none focus:border-[#004282] transition-all text-sm font-light"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mr-2 font-montserrat">
              {dict.memberList.searchBar.filterBy}
            </span>

            <button
              onClick={() => setSelectedCategory(`${dict.memberList.searchBar.all}`)}
              className={`px-4 py-2 text-xs font-medium font-inter tracking-wider transition-all cursor-pointer ${
                selectedCategory === `${dict.memberList.searchBar.all}`
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dict.memberList.searchBar.all}
            </button>

            {initialCategories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 text-xs font-medium font-inter tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dict.memberList.searchBar[cat.name] || cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: MEMBER CARDS GRID */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-light font-inter">
            Trovati <span className="text-accent font-semibold">{filteredMembers.length}</span> soci certificati
          </p>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="bg-white p-12 text-center border border-dashed border-gray-300">
            <p className="text-gray-500 font-inter italic text-lg">
              Nessun socio trovato per la ricerca effettuata.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tutti');
              }}
              className="mt-4 text-xs font-semibold text-[#004282] hover:underline uppercase tracking-wider font-inter"
            >
              Reset Filtri
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[500px]"
              >
                <div>
                  {/* Card Header Image Area */}
                  <div className="relative w-full h-52 bg-accent flex items-center justify-center overflow-hidden border-b border-gray-200">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white/80 select-none p-4 text-center">
                        <span className="text-3xl font-inter tracking-widest uppercase text-blue-100/40">
                          {member.name.substring(0, 2)}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-light mt-1 text-blue-200/60">
                          SNSA Certified Member
                        </span>
                      </div>
                    )}

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-semibold font-montserrat tracking-widest uppercase text-white bg-accent 90 backdrop-blur-md px-3 py-1 border border-white/20 shadow-sm">
                        {member.category.name}
                      </span>
                    </div>

                    {/* Member Since Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="text-[10px] font-montserrat italic text-accent bg-white/95 backdrop-blur-md px-2.5 py-1 border border-gray-200 shadow-sm">
                        Socio dal {member.certifiedSince}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-inter text-[#1A1A1A] tracking-tight">
                        {member.name}
                      </h3>

                      <div className="flex items-center gap-1.5 font-inter text-xs text-gray-500 font-light">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{member.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 font-inter font-light leading-relaxed line-clamp-4">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-gray-200 font-inter flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-light text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span className="text-[11px] uppercase tracking-wider">Standard SNSA</span>
                  </div>

                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-transparent text-white bg-accent hover:border-accent hover:bg-white hover:text-accent transition-colors"
                      aria-label={`Visita il sito di ${member.name}`}
                    >
                      <span>Sito</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: CALL TO ACTION BANNER */}
      <CtaBanner
        title={dict.ctaBanner.title}
        subtitle={dict.ctaBanner.subtitle}
        buttonText={dict.ctaBanner.buttonText}
        buttonHref="/membership"
      />
    </div>
  );
}