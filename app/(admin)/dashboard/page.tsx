// app/admin/dashboard/page.tsx
import { db } from '@/lib/db';
import { Users, Globe, Eye, UserCheck, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  // 1. Fetch Real Stats in Parallel
  const [
    totalUsers,
    adminUsers,
    activeLanguages,
    totalPageViews,
    recentUsers,
    recentEvents,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: 'ADMIN' } }),
    db.language.count({ where: { active: true } }),
    db.analyticsEvent.count({ where: { type: 'PAGE_VIEW' } }).catch(() => 0),
    db.user.findMany({
      take: 5,
      orderBy: { id: 'desc' }, // Adjust to createdAt if present in schema
      select: { id: true, email: true, firstName: true, role: true },
    }),
    db.analyticsEvent.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }).catch(() => []),
  ]);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Admins',
      value: adminUsers,
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Active Languages',
      value: activeLanguages,
      icon: Globe,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Total Page Views',
      value: totalPageViews,
      icon: Eye,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Panoramica delle statistiche di sistema e attività utenti
          </p>
        </div>
      </div>

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMN GRID FOR RECENT ACTIVITY & USERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RECENTLY REGISTERED USERS */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Ultimi Utenti Registrati
            </h2>
            <Link
              href="/dashboard/users"
              className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Vedi Tutti</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentUsers.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Nessun utente trovato</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {u.firstName ? u.firstName : 'Senza Nome'}
                    </p>
                    <p className="text-slate-500 text-[11px]">{u.email}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT SYSTEM LOGS / EVENTS */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-slate-500" />
              <span>Attività Recenti</span>
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEvents.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                Nessun evento registrato.
              </p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">{event.type}</p>
                    <p className="text-slate-400 text-[11px]">{event.path || '-'}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(event.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}