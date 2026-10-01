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
  description?: string;
  quickActions?: QuickAction[];
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  description,
  quickActions = [],
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-12 ${className}`}>
      
      {/* TOP QUICK ACTION TILES */}
      {/* {quickActions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const isFilled = action.variant === 'filled' || index === 0;

            return (
              <Link
                key={action.href + index}
                href={action.href}
                className={`px-5 py-3 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isFilled
                    ? 'bg-white hover:bg-sixth hover:text-white border border-sixth text-sixth shadow-xs'
                    : 'bg-white hover:bg-sixth hover:text-white border border-sixth text-sixth shadow-xs'
                }`}
              >
                <span className='font-montserrat'>{action.label}</span>
                <ChevronRight className="w-4 h-4 text-sixth shrink-0" />
              </Link>
            );
          })}
        </div>
      )} */}

     {/* TOP QUICK ACTION TILES */}
{quickActions.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
    {quickActions.map((action, index) => {
      const isFilled = action.variant === 'filled' || index === 0;

      return (
        <Link
          key={action.href + index}
          href={action.href}
          className={`group px-6 py-4 flex items-center justify-between transition-all duration-300 rounded-none shadow-sm ${
            isFilled
              ? 'bg-[#F2F2F2] text-sixth hover:bg-sixth hover:text-white border border-transparent'
              : 'bg-[#F2F2F2] text-sixth hover:bg-sixth hover:text-white border border-transparent'
          }`}
        >
          <span className="font-montserrat text-xs uppercase tracking-widest">
            {action.label}
          </span>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
              isFilled ? 'text-sixth' : 'text-sixth group-hover:text-white'
            }`}
          />
        </Link>
      );
    })}
  </div>
)}
      {/* SECTION HEADER */}
      {/* {(title || subtitle) && (
        <div className="space-y-1 my-12 md:my-20 max-w-3xl">
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
          {description && (
            <p className="text-sm sm:text-sm tracking-widest leading-relaxed text-justify my-10 text-gray-500 font-light font-inter">
              {description}
            </p>
          )}
        </div>
      )} */}

      
             <section className="py-20 border-t border-gray-200">
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
     {/* Colonna Sinistra (Titolo) */}
     {(title || subtitle) && (
     <div className="lg:col-span-5">
      {subtitle && (
       <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-[#758156]">
         {subtitle}
       </span>
      )}
       {title && (
       <h2 className="text-3xl font-bold font-cormorant text-gray-900 mt-2">
        {title}
       </h2>
       )}
     </div>
     )}

       {/* Colonna Destra (Lista Formati) */}
       <div className="lg:col-span-7 divide-y divide-gray-200">
          {description && (
           <div className="py-6 first:pt-0 last:pb-0">
             {/* <h3 className="text-xl font-bold font-cormorant text-gray-900 mb-2">
               {item.title}
             </h3> */}
             <p className="text-sm font-inter text-gray-600 leading-relaxed tracking-wider">
               {description}
             </p>
           </div>
          )}
       </div>
     </div>
   </section>

    </div>
  );


}