'use client';

import { useState } from 'react';
import { Building2, PlusCircle, Pencil, Search, MapPin, ExternalLink, Calendar } from 'lucide-react';
import MemberForm, { CategoryOption, MemberData } from './MemberForm';

export interface MemberRecord extends MemberData {
  id: number;
  category: { name: string };
  createdAt: string;
}

export default function MembersManager({
  initialMembers,
  categories,
}: {
  initialMembers: MemberRecord[];
  categories: CategoryOption[];
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'create' | 'edit'>('all');
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditMember = (member: MemberRecord) => {
    setSelectedMember(member);
    setActiveTab('edit');
  };

  const handleFormSuccess = () => {
    setActiveTab('all');
    setSelectedMember(null);
  };

  const filteredMembers = initialMembers.filter((m) => {
    const query = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.location.toLowerCase().includes(query) ||
      m.category.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      {/* Sidebar Navigation */}
      <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-2xl p-4 h-fit shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Member Management
        </h3>
        <nav className="space-y-1">
          <button
            onClick={() => {
              setActiveTab('all');
              setSelectedMember(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-[#445238] text-white font-bold shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 size={18} />
            <span>All Members</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('create');
              setSelectedMember(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-[#445238] text-white font-bold shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PlusCircle size={18} />
            <span>Add Member</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0">
        {activeTab === 'all' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Members Directory ({initialMembers.length})
                </h1>
                <p className="text-xs text-gray-500">Manage directory records, categories, and visibility.</p>
              </div>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search name, location, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none"
                />
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                No members found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 px-2">Member</th>
                      <th className="pb-3 px-2">Category</th>
                      <th className="pb-3 px-2">Certified</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                            {m.name}
                            {m.website && (
                              <a
                                href={m.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-[#445238]"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={12} />
                            {m.location}
                          </div>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {m.category.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-xs text-gray-600">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            {m.certifiedSince}
                          </span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              m.published
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {m.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => handleEditMember(m)}
                            className="p-2 text-gray-500 hover:text-[#445238] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Member"
                          >
                            <Pencil size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <MemberForm categories={categories} onSuccess={handleFormSuccess} />
        )}
        {activeTab === 'edit' && (
          <MemberForm
            member={selectedMember}
            categories={categories}
            onSuccess={handleFormSuccess}
          />
        )}
      </main>
    </div>
  );
}