// src/components/ui/QuickLinksList.tsx
import Link from 'next/link';

export interface QuickLink {
  label: string;
  href: string;
}

interface QuickLinksListProps {
  title?: string;
  links: QuickLink[];
}

export function QuickLinksList({ title = 'See More', links }: QuickLinksListProps) {
  return (
    <div className="h-[520px] p-6 flex flex-col">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      <ul className="divide-y divide-gray-200">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex items-center justify-between py-5 text-gray-800 hover:text-accent transition-colors font-medium group font-montserrat"
            >
              <span>{link.label}</span>
              {/* Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 group-hover:translate-x-1 group-hover:text-accent transition-all"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}