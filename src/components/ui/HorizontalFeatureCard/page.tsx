// src/components/ui/HorizontalFeatureCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface HorizontalFeatureCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttonVisible?: boolean;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  customHeader?: React.ReactNode;
  /**
   * Posizione dell'immagine nella card orizzontale
   * - 'right': Testo a sinistra (2/3), Immagine a destra (1/3) [Default]
   * - 'left': Immagine a sinistra (1/3), Testo a destra (2/3)
   */
  imagePosition?: 'left' | 'right';
  /**
   * Proporzione dell'immagine rispetto al contenitore:
   * - '1/3': Immagine 1 colonna, Testo 2 colonne (1/3 vs 2/3) [Default]
   * - '1/2': Immagine 1/2, Testo 1/2
   */
  imageRatio?: '1/3' | '1/2';
  bgColor?: string; // Es. "bg-[#445238]" per lo sfondo scuro della tua foto
  textColor?: string;
}

export function HorizontalFeatureCard({
  title,
  subtitle,
  description,
  buttonVisible = true,
  buttonText = 'Scopri di più',
  buttonHref = '#',
  imageSrc,
  customHeader,
  imagePosition = 'right',
  imageRatio = '1/3',
  bgColor = 'bg-[#445238]', // Verde scuro di default come da screenshot
  textColor = 'text-white',
}: HorizontalFeatureCardProps) {
  // Gestione dinamica del layout di colonna
  const gridCols =
    imageRatio === '1/3'
      ? 'grid-cols-12 md:grid-cols-12'
      : 'grid-cols-12 md:grid-cols-12';

  const imageSpan =
    imageRatio === '1/3'
      ? 'md:col-span-5'
      : 'md:col-span-6';

  const textSpan =
    imageRatio === '1/3'
      ? 'md:col-span-7'
      : 'md:col-span-6';

  return (
    <div
      className={`w-full grid ${gridCols} overflow-hidden min-h-[150px] md:min-h-[150px]`}
    >
      {/* SEZIONE TESTO */}
      <div
        className={`${textSpan} ${bgColor} p-8 md:p-12 pr-0 md:pr-0 flex flex-col text-left ${
          imagePosition === 'left' ? 'md:order-2' : 'md:order-1'
        }`}
      >
        {subtitle && (
          <span className="block font-montserrat text-xs font-bold uppercase tracking-widest text-[#A2B081] mb-2">
            {subtitle}
          </span>
        )}

        <h3 className={`text-base md:text-base font-bold font-montserrat uppercase leading-tight ${textColor}`}>
          {title}
        </h3>

        {description && (
          <p className={`mt-3 text-sm leading-relaxed font-inter opacity-90 ${textColor}`}>
            {description}
          </p>
        )}

        {buttonVisible && (
          <Link
            href={buttonHref}
            className="inline-block mt-6 font-montserrat text-xs font-semibold tracking-widest border border-white text-white hover:bg-white hover:text-black transition-colors px-6 py-3 uppercase"
          >
            {buttonText}
          </Link>
        )}
      </div>

      {/* SEZIONE IMMAGINE */}
      <div
        className={`relative ${imageSpan} w-full min-h-[200px] md:min-h-full ${bgColor} ${
          imagePosition === 'left' ? 'md:order-1' : 'md:order-2'
        }`}
      >
        {customHeader ? (
          customHeader
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </div>
    </div>
  );
}