'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Se non viene passato un URL specifico, usa l'URL corrente della pagina
  const shareUrl = url 
    ? (url.startsWith('http') ? url : `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`)
    : typeof window !== 'undefined' ? window.location.href : '';

  const shareData = {
    title,
    text: text || title,
    url: shareUrl,
  };

  const handleShare = async () => {
    // 1. Prova prima l'API nativa Mobile/Browser (funziona benissimo su iOS/Android)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // L'utente ha annullato la condivisione
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
        return;
      }
    }

    // 2. Se non c'è navigator.share (es. Desktop), apre il menu custom
    setIsOpen((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title}\n${shareUrl}`);

  return (
    <div className="relative inline-block">
      {/* Icona Trigger Condivisione */}
      <button
        type="button"
        onClick={handleShare}
        className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-gray-800 hover:bg-white hover:text-accent shadow-md transition-all focus:outline-none"
        title="Condividi"
        aria-label="Condividi notizia"
        >
        <Share2 size={16} />
    </button>

      {/* Popover Fallback per Desktop */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50 flex flex-col gap-1 text-xs font-inter">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <span>LinkedIn</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <span>Facebook</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <span>X (Twitter)</span>
          </a>

          <hr className="my-1 border-gray-100" />

          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium w-full text-left"
          >
            <span>{copied ? 'Copiato!' : 'Copia link'}</span>
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}