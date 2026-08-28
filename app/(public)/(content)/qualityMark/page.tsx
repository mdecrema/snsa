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
    <></>
  );}