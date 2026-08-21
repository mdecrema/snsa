'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Users, UserCheck, UserPlus, Calendar, Settings } from 'lucide-react';

const navItems = [
  { label: 'Pages', href: '/dashboard/pages', icon: Layout },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Members', href: '/dashboard/members', icon: UserCheck },
  { label: 'Guests', href: '/dashboard/guests', icon: UserPlus },
  { label: 'Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8">
      <div className="max-w-7xl mx-auto flex gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Matches exact route or sub-routes
          const isActive = pathname.startsWith(item.href) || (item.href === '/admin/pages' && pathname === '/admin');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-[#445238] text-[#445238] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}