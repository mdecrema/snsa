'use client';

import {
  Compass,
  GraduationCap,
  Users,
  Info,
  ShieldCheck,
  Handshake,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import CtaBanner from '../CtaBanner/page';

const SERVICES = [
  {
    icon: Compass,
    title: 'Consulenza e orientamento',
    description:
      'Un primo punto di riferimento per individuare soluzioni e professionisti in grado di rispondere alle esigenze dell’impresa.',
  },
  {
    icon: GraduationCap,
    title: 'Formazione',
    description:
      'Corsi, seminari e momenti di aggiornamento per sviluppare competenze e mantenere l’azienda al passo con i cambiamenti.',
  },
  {
    icon: Users,
    title: 'Networking e relazioni',
    description:
      'Occasioni di incontro con altre imprese, professionisti e istituzioni per creare collaborazioni e nuove opportunità.',
  },
  {
    icon: Info,
    title: 'Informazioni e opportunità',
    description:
      'Aggiornamenti su bandi, normative, iniziative e strumenti utili alle aziende.',
  },
  {
    icon: ShieldCheck,
    title: 'Rappresentanza degli interessi',
    description:
      'Diamo voce alle esigenze delle imprese nei confronti delle istituzioni e degli interlocutori del territorio.',
  },
  {
    icon: Handshake,
    title: 'Servizi e convenzioni',
    description:
      'Accesso a servizi dedicati e condizioni agevolate grazie alla rete di partner dell’associazione.',
  },
];

export default function CompanySupportSection() {
  return (
    <div className="lightgrey min-h-screen pb-20 text-slate-800">
      
      {/* TOP HERO HEADER */}
      {/* <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Company Support
            </h1>
            <p className="text-base sm:text-lg italic text-slate-500 font-light">
              We are focused on company needs
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed max-w-3xl pt-2">
            Al fianco delle imprese per affrontare le sfide, cogliere le opportunità e sviluppare nuove competenze. La nostra associazione offre alle aziende associate un insieme di servizi, strumenti e opportunità pensati per accompagnarle nella gestione quotidiana e nei percorsi di crescita.
          </p>
        </div>
      </section> */}

      {/* SERVICES GRID CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 space-y-8 my-20">
        
        {/* SECTION TITLE */}
        <div className="border-b border-slate-300 pb-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            I Nostri Servizi Dedicati
          </h2>
        </div>

        {/* 2 & 3 COLUMN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="cursor-pointer bg-[#F8F9FA] border border-slate-200 p-6 rounded-xs shadow-2xs hover:border-accent transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Icon Header */}
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-xs flex items-center justify-center text-slate-800 shadow-2xs">
                    <Icon size={22} />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl sm:text-2xl tracking-tight font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-[14px] text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BOX */}
      <CtaBanner
        title="Vuoi saperne di più sulle opportunità per la tua impresa?"
        subtitle="Diventa un'azienda associata o richiedi maggiori dettagli al nostro team"
        buttonText="Diventa Socio"
        buttonHref="/membership"
      />
    </div>
  );
}