'use client';

import { useState } from 'react';
import { ChevronRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import ImpactMetricsSection from '@/src/components/ui/ImpactMetricsSection/page';

export default function StartupIncubator() {
  const [email, setEmail] = useState('');

  return (
    <ImpactMetricsSection />
  );
}