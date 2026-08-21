// src/components/ui/MembershipBanner.tsx
import Image from 'next/image';
import Link from 'next/link';

interface MembershipBannerProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
}

export function MembershipBanner({
  title = 'Become a Member of the SNSA',
  buttonText = 'Find out more',
  buttonHref = '/membership',
  imageSrc = '/images/community_3.jpg',
}: MembershipBannerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[258px] shadow-sm">
      {/* Left Text Block (8 Columns) */}
      <div className="md:col-span-8 bg-[#445238] p-8 md:px-10 md:py-12 flex flex-col justify-center items-start text-white">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
          {title}
        </h2>
        <Link
          href={buttonHref}
          className="mt-5 inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-sm rounded-md uppercase hover:bg-white hover:text-[#445238] transition-colors"
        >
          {buttonText}
        </Link>
      </div>

      {/* Right Image Block (4 Columns) */}
      <div className="md:col-span-4 relative min-h-[200px] md:min-h-full w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}