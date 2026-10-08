'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User as UserIcon, ChevronDown, LogOut, Home, LayoutDashboard, LogIn } from 'lucide-react';
import { logout } from '@/src/features/auth/actions/logout';
import { Layout, Users, UserCheck, UserPlus, Calendar, Settings, Gauge } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface UserData {
  firstName?: string | null;
  email?: string | null;
  role?: string | null;
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Gauge },
  { label: 'Pages', href: '/dashboard/pages', icon: Layout },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Members', href: '/dashboard/members', icon: UserCheck },
  { label: 'Guests', href: '/dashboard/guests', icon: UserPlus },
  { label: 'Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function MobileUserMenu({ user }: { user: UserData | null }) {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const pathname = usePathname();

    if (!user) {
        return (
        <div className="border-b border-white/10 py-3">
            <Link
            href="/user/login"
            className="flex items-center gap-3 text-sm font-medium text-white hover:text-white/80"
            >
            <LogIn size={20} className="text-white/80" />
            <span>Login</span>
            </Link>
        </div>
        );
    }

    const displayName = user.firstName || user.email?.split('@')[0] || 'Utente';

    return (
        <div className="border-b border-white/10 py-3">
        <button
            onClick={() => setIsUserOpen(!isUserOpen)}
            className="flex items-center justify-between w-full text-white font-medium text-sm focus:outline-none"
        >
            <div className="flex items-center gap-3">
            <UserIcon size={20} className="text-white/80" />
            <span>Ciao, <strong className="text-white font-semibold">{displayName}</strong></span>
            </div>
            <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${isUserOpen ? 'rotate-180' : ''}`}
            />
        </button>

        {isUserOpen && (
            <div className="pl-8 pt-2 flex flex-col gap-3">
            <Link
                href="/"
                onClick={() => setIsUserOpen(false)}
                className="flex items-center gap-3 text-base text-white/80 hover:text-white py-1 transition-colors"
            >
                <Home size={18} />
                <span>Home</span>
            </Link>


            {navItems.map((item) => {
            const Icon = item.icon;
            
            // Require exact match for root '/dashboard', prefix match for sub-routes
            const isActive = item.href === '/dashboard' 
                ? pathname === '/dashboard' 
                : pathname.startsWith(item.href);

            return (
                <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 text-base text-white/80 hover:text-white py-1 transition-colors`}
                >
                <Icon size={16} />
                <span>{item.label}</span>
                </Link>
            );
            })}

            <form action={logout} className="pt-1">
                <button
                type="submit"
                className="flex items-center gap-3 text-base text-red-300 hover:text-red-200 py-1 transition-colors w-full text-left"
                >
                <LogOut size={18} />
                <span>Logout</span>
                </button>
            </form>
            </div>
        )}
        </div>
    );
}