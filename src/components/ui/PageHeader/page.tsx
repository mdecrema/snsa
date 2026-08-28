import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface QuickAction {
  label: string;
  href: string;
  variant?: 'filled' | 'outlined'; // Allows switching tile styles
}

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  quickActions?: QuickAction[];
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  quickActions = [],
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`max-w-6xl mx-auto my-10 px-4 md:px-8 pt-10 space-y-12 ${className}`}>
      
      {/* TOP QUICK ACTION TILES */}
      {quickActions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const isFilled = action.variant === 'filled' || index === 0;

            return (
              <Link
                key={action.href + index}
                href={action.href}
                className={`p-5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isFilled
                    ? 'bg-[#EAEAEA] hover:bg-gray-200 text-[#1A1A1A]'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 text-[#1A1A1A] shadow-xs'
                }`}
              >
                <span>{action.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
              </Link>
            );
          })}
        </div>
      )}

      {/* SECTION HEADER */}
      {(title || subtitle) && (
        <div className="space-y-1 text-center my-12 md:my-20">
          {title && (
            <h2 className="text-2xl sm:text-3xl text-dark font-bold">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base sm:text-xl text-gray-500 font-light italic">
              {subtitle}
            </p>
          )}
        </div>
      )}

    </div>
  );
}