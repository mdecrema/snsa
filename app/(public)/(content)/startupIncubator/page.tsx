
import { ChevronRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import CompanySupportSection from '@/src/components/ui/CompanySupportSection/page';
import PageHeader from '@/src/components/ui/PageHeader/page';
import { getDictionary } from '@/lib/internalization';

export default async function StartupIncubator() {
  const dict = await getDictionary();

  const title = dict.startUpIncubator?.pageHeader?.title || 'Start-up Incubator';
  const subtitle =
    dict.startUpIncubator?.pageHeader?.subtitle ||
    '';
  const description =
    dict.startUpIncubator?.pageHeader?.description ||
    'Registrati per accedere ai servizi esclusivi e rimanere aggiornato';

  return (
    <>
      <PageHeader
          title={title}
          subtitle={subtitle}
          description={description}
          quickActions={[
            { label: 'Annual Meeting', href: '/annual-meeting', variant: 'outlined' },
            { label: 'Past Events', href: '/past-events', variant: 'outlined' },
            { label: 'Register', href: '/past-events', variant: 'outlined' },
            { label: 'Companies', href: '/past-events', variant: 'outlined' },
          ]}
        />
      <CompanySupportSection dict={dict.startUpIncubator} />
    </>
  );
}