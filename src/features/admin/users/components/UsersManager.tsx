'use client';

import { useState } from 'react';
import { Users, UserPlus, Pencil, Shield, Search } from 'lucide-react';
import UserForm from './UserForm';

export interface UserRecord {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersManager({ initialUsers }: { initialUsers: UserRecord[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'create' | 'edit'>('all');
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditUser = (user: UserRecord) => {
    setSelectedUser(user);
    setActiveTab('edit');
  };

  const handleFormSuccess = () => {
    setActiveTab('all');
    setSelectedUser(null);
  };

  const filteredUsers = initialUsers.filter((u) => {
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    return fullName.includes(query) || u.email.toLowerCase().includes(query);
  });

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      {/* Sidebar Sub-Menu */}
      <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-2xl p-4 h-fit shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">
          User Management
        </h3>
        <nav className="space-y-1">
          <button
            onClick={() => {
              setActiveTab('all');
              setSelectedUser(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-[#445238] text-white font-bold shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={18} />
            <span>All Users</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('create');
              setSelectedUser(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-[#445238] text-white font-bold shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <UserPlus size={18} />
            <span>Create User</span>
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
                  System Users ({initialUsers.length})
                </h1>
                <p className="text-xs text-gray-500">
                  Manage dashboard administrators and access levels.
                </p>
              </div>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none"
                />
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                No users found matching your search query.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 px-2">User</th>
                      <th className="pb-3 px-2">Role</th>
                      <th className="pb-3 px-2">Joined</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <div className="font-semibold text-gray-900">
                            {user.firstName || user.lastName
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : 'Unnamed User'}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            <Shield size={12} className="text-[#445238]" />
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-xs text-gray-500">{user.createdAt}</td>
                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-gray-500 hover:text-[#445238] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit User"
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

        {activeTab === 'create' && <UserForm onSuccess={handleFormSuccess} />}
        {activeTab === 'edit' && <UserForm user={selectedUser} onSuccess={handleFormSuccess} />}
      </main>
    </div>
  );
}