'use client'; // Diventa un Client Component per gestire lo stato della selezione

import { useState } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Building, Phone, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { markMessageAsRead } from '@/src/features/contacts/actions/submitContactForm';

// Definiamo il tipo del messaggio
interface ContactMessage {
  id: string;
  name: string;
  surname: string;
  company: string | null;
  email: string;
  phone: string | null;
  subject: string;
  privacyConsent: boolean;
  createdAt: Date;
  isRead: boolean;
}

interface Props {
  initialMessages: ContactMessage[];
}

export default function AdminMessagesPage({ initialMessages }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const router = useRouter();

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);

    // Se il messaggio non è stato ancora letto, aggiorniamo il DB e l'UI
    if (!msg.isRead) {
      const res = await markMessageAsRead(msg.id);
      if (res.success) {
        // Aggiorna lo stato locale della lista per rimuovere l'evidenziazione
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        );
        // Aggiorna la route di Next.js per rinfrescare il badge nella Navbar superiore
        router.refresh();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-cabinet text-gray-900">Richieste di Contatto</h1>
          <p className="text-xs font-inter text-gray-500 mt-1">Gestisci i messaggi ricevuti dal form del sito.</p>
        </div>
        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-mono font-bold">
          {messages.length} Messaggi Totali
        </span>
      </div>

      {/* Layout Inbox a due colonne */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm p-4 min-h-[600px]">
        
        {/* Elenco Messaggi (Sinistra) */}
        <div className="lg:col-span-5 divide-y divide-gray-100 overflow-y-auto max-h-[700px] pr-2">
          {messages.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-12">Nessun messaggio ricevuto.</p>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-xl transition-all cursor-pointer mb-2 hover:bg-white/80 ${
                  selectedMessage?.id === msg.id ? 'bg-accent/10 border border-accent/30' : ''
                } ${!msg.isRead ? 'bg-accent/5 border-l-4 border-accent' : 'bg-transparent'}`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold font-inter text-gray-900">{msg.name} {msg.surname}</h4>
                  <span className="text-[10px] font-mono text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs font-semibold text-accent mt-1">{msg.subject}</p>
                <p className="text-xs font-inter text-gray-600 truncate mt-0.5">{msg.email} {msg.company ? `- ${msg.company}` : ''}</p>
              </div>
            ))
          )}
        </div>

        {/* Dettaglio del Messaggio Selezionato (Destra) */}
        <div className="lg:col-span-7 bg-white/80 rounded-xl border border-gray-200/80 p-6 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedMessage.subject}
                  </span>
                  <h2 className="text-xl font-bold font-cabinet text-gray-900 mt-2">
                    {selectedMessage.name} {selectedMessage.surname}
                  </h2>
                </div>
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Informazioni di contatto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-1 font-mono uppercase text-[10px]">Email</span>
                  <a href={`mailto:${selectedMessage.email}`} className="font-bold text-accent hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block mb-1 font-mono uppercase text-[10px]">Telefono</span>
                  <span className="font-semibold text-gray-800">{selectedMessage.phone || 'Non specificato'}</span>
                </div>
                {selectedMessage.company && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                    <span className="text-gray-400 block mb-1 font-mono uppercase text-[10px]">Azienda / Organizzazione</span>
                    <span className="font-semibold text-gray-800">{selectedMessage.company}</span>
                  </div>
                )}
              </div>

              {/* Azione rapida per rispondere via mail */}
              <div className="pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Risposta a richiesta: ${selectedMessage.subject}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md"
                >
                   {selectedMessage.subject}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <Mail className="w-12 h-12 text-gray-300 mb-3" />
              <h2 className="text-lg font-bold font-cabinet text-gray-900">Seleziona un messaggio</h2>
              <p className="text-xs font-inter text-gray-500 mt-1">Clicca su un elemento a sinistra per leggerne i dettagli.</p>
            </div>
          )}
          
          <div className="text-xs text-gray-400 font-mono pt-4 border-t border-gray-100 flex items-center gap-2 mt-6">
            <Clock className="w-3.5 h-3.5" /> Consenso Privacy nLPD/GDPR registrato con successo al momento dell'invio.
          </div>
        </div>

      </div>
    </div>
  );
}