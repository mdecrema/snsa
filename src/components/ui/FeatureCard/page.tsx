// src/components/ui/FeatureCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonVisible?: boolean;
  buttonFullWidth?: boolean;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  customHeader?: React.ReactNode;
  size?: 'x1' | 'x2';
  bgColor?: string;
  titleColor? : string;
}

// Config object mapping size variants to Tailwind classes
const SIZE_VARIANTS = {
  x1: {
    containerHeight: 'h-[520px]',
    lineClamp: 'line-clamp-5',
  },
  x2: {
    containerHeight: 'h-[520px]',
    lineClamp: 'line-clamp-10',
  },
};

export function FeatureCard({
  title,
  subtitle,
  description,
  buttonVisible = false,
  buttonFullWidth = false,
  buttonText = 'Find out more',
  buttonHref = '#',
  imageSrc,
  customHeader,
  size = 'x1',
  bgColor = 'lightgrey',
  titleColor = 'accent'
}: FeatureCardProps) {
  const currentVariant = SIZE_VARIANTS[size];

  return (
    <div className={`flex flex-col ${currentVariant.containerHeight} overflow-hidden border border-[#F2F2F2] shadow-sm transition-all duration-300`}
    >
      {/* Top Header Section (Height: 200px) */}
      <div className="relative h-[200px] w-full bg-white flex items-center px-6 overflow-hidden">
        {customHeader ? (
          customHeader
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

     {/* Card Body Section */}
<div className={`flex-1 bg-${bgColor} p-6 flex flex-col justify-between`}>
  <div>
    {/* Sottotitolo / Badge (se presente) */}
    {subtitle && (
      <span className="block font-montserrat text-xs font-bold uppercase tracking-widest text-[#758156] mb-1">
        {subtitle}
      </span>
    )}

    {/* Titolo Principale (Aumentato a 2xl e applicato il font corretto) */}
    <h3 className={`text-2xl font-bold text-${titleColor} font-cormorant leading-tight`}>
      {title}
    </h3>

    {/* Descrizione (Usando Inter o Outfit per massima leggibilità) */}
    <p className={`mt-6 text-sm text-gray-700 text-justify leading-relaxed tracking-wide font-inter ${currentVariant.lineClamp}`}
    >
      {description}
    </p>
  </div>

  {/* Bottone CTA */}
  {buttonVisible && (
    <Link
      href={buttonHref}
      className={`inline-block mt-6 text-center font-montserrat text-xs tracking-widest bg-accent border border-transparent text-white hover:bg-transparent hover:border-accent hover:text-accent transition-colors px-5 py-2.5 ${buttonFullWidth ? 'w-full' : 'w-max'}`}
    >
      {buttonText}
    </Link>
  )}
</div>
    </div>
  );
}