// src/components/ui/FeatureCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  customHeader?: React.ReactNode;
}

export function FeatureCard({
  title,
  description,
  buttonText = 'Find out more',
  buttonHref = '#',
  imageSrc,
  customHeader,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col h-[520px] overflow-hidden border border-accent shadow-sm">
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
      <div className="flex-1 bg-[#F2F2F2] p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed line-clamp-5">
            {description}
          </p>
        </div>

        <Link
          href={buttonHref}
          className="inline-block mt-4 text-center text-sm tracking-widest bg-accent border border-transparent text-accent text-white hover:bg-white hover:border-accent hover:text-accent transition-colors px-5 py-2.5 w-max"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}