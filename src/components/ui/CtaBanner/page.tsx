import Link from 'next/link';

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref?: string;
  className?: string;
  bgColor?: string;
}

export default function CtaBanner({
  title,
  subtitle,
  buttonText,
  buttonHref = '/membership',
  className = '',
  bgColor = 'accent',
}: CtaBannerProps) {
  return (
    <section className={`max-w-6xl mx-auto px-4 sm:px-6 py-20 ${className}`}>
      <div className={`bg-${bgColor} text-white p-8 md:p-12 border border-transparent shadow-md flex flex-col md:flex-row items-center justify-between gap-8`}>
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h2 className="text-2xl md:text-2xl">
            {title}
          </h2>
          <p className="text-white text-xs md:text-sm font-light leading-relaxed font-inter">
            {subtitle}
          </p>
        </div>

        <Link
          href={buttonHref}
          className={`shrink-0 bg-white text-${bgColor} border border-transparent hover:border-white hover:bg-${bgColor} hover:text-white font-semibold px-6 py-3.5 text-xs tracking-widest uppercase transition-colors font-montserrat`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}