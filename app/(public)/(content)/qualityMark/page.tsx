'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Search, 
  FileText, 
  Building2, 
  ArrowRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

// Fake Data for Certified Members
const MOCK_CERTIFIED_MEMBERS = [
  {
    id: 1,
    name: 'DermaCare Institute',
    location: 'Zurich, Switzerland',
    certifiedSince: 2019,
    badgeId: 'QM-88401',
    category: 'Dermatology',
    website: 'https://example.com',
  },
  {
    id: 2,
    name: 'BioHealth Labs',
    location: 'London, UK',
    certifiedSince: 2021,
    badgeId: 'QM-99210',
    category: 'Research',
    website: 'https://example.com',
  },
  {
    id: 3,
    name: 'Alpine Clinical Aesthetics',
    location: 'Geneva, Switzerland',
    certifiedSince: 2018,
    badgeId: 'QM-44120',
    category: 'Aesthetic Medicine',
    website: 'https://example.com',
  },
  {
    id: 4,
    name: 'Nova Skincare Solutions',
    location: 'Milan, Italy',
    certifiedSince: 2023,
    badgeId: 'QM-10492',
    category: 'Cosmeceuticals',
    website: 'https://example.com',
  },
];

export default function QualityMark() {
  const [verifyQuery, setVerifyQuery] = useState('');
  const [searchResult, setSearchResult] = useState<'idle' | 'found' | 'not_found'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyQuery.trim()) return;

    const found = MOCK_CERTIFIED_MEMBERS.some(
      (m) =>
        m.badgeId.toLowerCase() === verifyQuery.trim().toLowerCase() ||
        m.name.toLowerCase().includes(verifyQuery.trim().toLowerCase())
    );

    setSearchResult(found ? 'found' : 'not_found');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <section className="bg-[#445238] text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <ShieldCheck size={400} />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 text-white/90 px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <Award size={14} className="text-amber-300" />
              Official Excellence Accreditation
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              The Gold Standard of Industry Excellence
            </h1>

            <p className="text-gray-200 text-sm sm:text-base mb-8 leading-relaxed">
              Our Quality Mark guarantees that accredited network members adhere to rigorous operational standards, independent annual auditing, and strict ethical compliance.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#verify"
                className="bg-white text-[#445238] font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all text-sm shadow-md flex items-center gap-2"
              >
                <Search size={16} />
                <span>Verify a Member</span>
              </a>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                <FileText size={16} />
                <span>Download Guidelines (PDF)</span>
              </button>
            </div>
          </div>
        </section>

        {/* VERIFICATION BAR */}
        <section id="verify" className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Verify Quality Mark Accreditation</h2>
            <p className="text-xs text-gray-500">
              Enter a Member Name or Badge ID (e.g., <span className="font-mono bg-gray-100 px-1 rounded">QM-88401</span>) to check current certification status.
            </p>

            <form onSubmit={handleVerify} className="flex gap-2 max-w-lg mx-auto mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={verifyQuery}
                  onChange={(e) => {
                    setVerifyQuery(e.target.value);
                    setSearchResult('idle');
                  }}
                  placeholder="Enter Name or Badge ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#445238] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#35412b] transition-all text-sm shrink-0"
              >
                Verify
              </button>
            </form>

            {/* Live Search Status Output */}
            {searchResult === 'found' && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mt-4">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Active Accreditation Found! This member holds an authentic Quality Mark.</span>
              </div>
            )}

            {searchResult === 'not_found' && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mt-4">
                <span>No active accreditation found for "{verifyQuery}".</span>
              </div>
            )}
          </div>
        </section>

        {/* CERTIFICATION PILLARS */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Core Quality Pillars</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Every accredited institution must continuously satisfy four key pillars of quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#445238]/10 text-[#445238] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Independent Auditing</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mandatory annual technical and operational inspections carried out by accredited third-party evaluators.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#445238]/10 text-[#445238] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Ethical Compliance</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Strict enforcement of consumer protection, transparent pricing, and sustainable operational protocols.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#445238]/10 text-[#445238] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Continuous Education</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Requirement for staff and executive teams to complete at least 40 hours of accredited annual training.
              </p>
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP PROCESS */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">How to Obtain the Mark</h2>
            <p className="text-xs text-gray-500 mt-1">A transparent 4-step pathway for network members.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { step: '1', title: 'Application', desc: 'Submit organization dossier and initial documentation.' },
              { step: '2', title: 'Audit', desc: 'On-site evaluation by our independent quality committee.' },
              { step: '3', title: 'Review', desc: 'Board evaluation of assessment findings and scoring.' },
              { step: '4', title: 'Certification', desc: 'Issuance of official Quality Badge and public directory listing.' },
            ].map((s, idx) => (
              <div key={idx} className="relative bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-2">
                <span className="text-xs font-bold text-[#445238] uppercase tracking-wider">Step {s.step}</span>
                <h4 className="font-bold text-gray-900 text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED CERTIFIED MEMBERS SHOWCASE */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recently Accredited Members</h2>
              <p className="text-xs text-gray-500 mt-1">Institutions that recently met our gold standard criteria.</p>
            </div>
            <a
              href="/members"
              className="text-xs font-bold text-[#445238] hover:underline flex items-center gap-1"
            >
              <span>View Directory</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_CERTIFIED_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-[#445238] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold bg-[#445238]/10 text-[#445238] px-2.5 py-1 rounded-full uppercase">
                      {member.category}
                    </span>
                    <ShieldCheck className="text-[#445238]" size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-gray-400">{member.location}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-500">
                  <span>Badge: <strong className="text-gray-700">{member.badgeId}</strong></span>
                  <span>Since {member.certifiedSince}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl font-bold">Ready to accredit your organization?</h3>
            <p className="text-xs text-gray-400 mt-1">Apply for evaluation or contact our quality board for guidance.</p>
          </div>
          <button className="bg-[#445238] hover:bg-[#35412b] text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shrink-0">
            Apply for Certification
          </button>
        </section>

      </div>
    </div>
  );
}