'use client';

import { useState, useTransition } from 'react';
import { Plus, Search, Trash2, Calendar, MapPin, Star, Loader2, Link as LinkIcon, Users } from 'lucide-react';
import type { Event } from '@/app/generated/prisma'; // Adjust import according to your generated client
import { createEvent, deleteEvent, toggleFeaturedEvent } from '../actions/EventActions';

interface Props {
  initialEvents: Event[];
}

export default function EventsManager({ initialEvents }: Props) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'add'>('all');
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    title: '',
    dateRange: '',
    location: '',
    accreditationText: '',
    description: '',
    topic: 'Dermoscopy',
    month: 'September',
    year: '2026',
    logoUrl: '',
    linkHref: '',
    isFeatured: false,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createEvent(formData);
      setActiveTab('all');
      setFormData({
        title: '',
        dateRange: '',
        location: '',
        accreditationText: '',
        description: '',
        topic: 'Dermoscopy',
        month: 'September',
        year: '2026',
        logoUrl: '',
        linkHref: '',
        isFeatured: false,
      });
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      startTransition(async () => {
        await deleteEvent(id);
      });
    }
  };

  const handleToggleFeatured = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleFeaturedEvent(id, currentStatus);
    });
  };

  const filteredEvents = initialEvents.filter(
    (evt) =>
      evt.title.toLowerCase().includes(search.toLowerCase()) ||
      evt.location.toLowerCase().includes(search.toLowerCase()) ||
      evt.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-[#F4F6F8] min-h-screen font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR CONTROL PANEL */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
          <div className="px-2 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              EVENT MANAGEMENT
            </span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#3F4E3A] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All Events</span>
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'add'
                  ? 'bg-[#3F4E3A] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
            
            {/* HEADER WITH TITLE & INLINE SEARCH */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Events Directory ({initialEvents.length})
                </h1>
                <p className="text-xs text-slate-400 font-normal">
                  Manage event records, categories, and visibility.
                </p>
              </div>

              {activeTab === 'all' && (
                <div className="relative min-w-[280px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search title, location, or topic..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-all"
                  />
                </div>
              )}
            </div>

            {/* TAB 1: ALL EVENTS TABLE */}
            {activeTab === 'all' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      <th className="pb-3 pt-1 px-2">EVENT</th>
                      <th className="pb-3 pt-1 px-2">TOPIC</th>
                      <th className="pb-3 pt-1 px-2">DATE & LOCATION</th>
                      <th className="pb-3 pt-1 px-2 text-center">FEATURED</th>
                      <th className="pb-3 pt-1 px-2 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {filteredEvents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                          No events available.
                        </td>
                      </tr>
                    ) : (
                      filteredEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-2 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-900">{evt.title}</span>
                              {evt.linkHref && (
                                <a
                                  href={evt.linkHref}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-slate-400 hover:text-slate-600"
                                >
                                  <LinkIcon className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{evt.description}</p>
                          </td>

                          <td className="py-4 px-2">
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full">
                              {evt.topic}
                            </span>
                          </td>

                          <td className="py-4 px-2 space-y-1 text-slate-500">
                            <div className="flex items-center gap-1 text-[11px]">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.dateRange}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{evt.location}</span>
                            </div>
                          </td>

                          <td className="py-4 px-2 text-center">
                            <button
                              disabled={isPending}
                              onClick={() => handleToggleFeatured(evt.id, evt.isFeatured)}
                              className={`p-1 transition-colors rounded-lg ${
                                evt.isFeatured ? 'text-amber-500' : 'text-slate-300 hover:text-slate-400'
                              }`}
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </button>
                          </td>

                          <td className="py-4 px-2 text-right">
                            <button
                              disabled={isPending}
                              onClick={() => handleDelete(evt.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: ADD EVENT FORM */}
            {activeTab === 'add' && (
              <form onSubmit={handleCreate} className="space-y-5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Event Title *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Introduction to Dermoscopy"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Date Range *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 1 Sept 2026 - 24 Nov 2026"
                      value={formData.dateRange}
                      onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Location *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Online, Zurich"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">Topic *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dermoscopy"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-600">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Event details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#3F4E3A] accent-[#3F4E3A]"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-medium text-slate-600 cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 bg-[#3F4E3A] hover:bg-[#323f2e] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Event</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}