'use client';

import { useState } from 'react';
import { ChevronRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import CompanySupportSection from '@/src/components/ui/CompanySupportSection/page';

export default function StartupIncubator() {
  const [email, setEmail] = useState('');

  return (
    <CompanySupportSection />
  );
}