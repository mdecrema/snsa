// app/dashboard/components/AdminNav.tsx (o il percorso corrente del tuo file)
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Users, UserCheck, UserPlus, Calendar, Settings, Gauge, Mail } from 'lucide-react';

interface AdminNavProps {
  unreadMessagesCount: number; // <-- Accettiamo il conteggio dinamico
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Gauge },
  { label: 'Pages', href: '/dashboard/pages', icon: Layout },
  { label: 'Members', href: '/dashboard/members', icon: UserCheck },
  { label: 'Messages', href: '/dashboard/messages', icon: Mail },
  { label: 'Guests', href: '/dashboard/guests', icon: UserPlus },
  { label: 'Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function AdminNav({ unreadMessagesCount }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8">
      <div className="max-w-7xl mx-auto flex gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href);

          // Controlliamo se è la voce "Messages"
          const isMessagesTab = item.href === '/dashboard/messages';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition-all relative ${
                isActive
                  ? 'border-[#445238] text-[#445238] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>

              {/* Badge numerico per i messaggi non letti */}
              {isMessagesTab && unreadMessagesCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-red-500 text-white rounded-full animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}