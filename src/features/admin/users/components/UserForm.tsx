'use client';

import { useState } from 'react';
import { User, Mail, Shield, Lock, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { createUserAction, updateUserAction } from '../actions/UserActions';

interface UserData {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: string;
}

export default function UserForm({ 
  user, 
  onSuccess 
}: { 
  user?: UserData | null; 
  onSuccess?: () => void; 
}) {
  const isEditing = Boolean(user?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const result = isEditing && user?.id 
      ? await updateUserAction(user.id, formData)
      : await createUserAction(formData);

    setIsLoading(false);

    if (result?.error) {
      setFeedback({ type: 'error', text: result.error });
    } else if (result?.success) {
      setFeedback({
        type: 'success',
        text: isEditing ? 'User updated successfully!' : 'User created successfully!',
      });
      if (!isEditing) (e.target as HTMLFormElement).reset();
      if (onSuccess) setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditing ? `Edit User: ${user?.firstName} ${user?.lastName}` : 'Create New User'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {isEditing
            ? 'Update administrator credentials and system access privileges.'
            : 'Add a new administrative user to access the dashboard.'}
        </p>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border transition-all ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="shrink-0 text-green-600" size={18} />
          ) : (
            <AlertCircle className="shrink-0 text-red-600" size={18} />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First & Last Name side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              First Name *
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <input
                name="firstName"
                type="text"
                required
                defaultValue={user?.firstName || ''}
                placeholder="John"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Last Name *
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <input
                name="lastName"
                type="text"
                required
                defaultValue={user?.lastName || ''}
                placeholder="Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Email Address *
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <input
              name="email"
              type="email"
              required
              defaultValue={user?.email || ''}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Role *
          </label>
          <div className="relative flex items-center">
            <Shield className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <select
              name="role"
              defaultValue={user?.role || 'ADMIN'}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all appearance-none"
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            {isEditing ? 'New Password (Leave blank to keep current)' : 'Password *'}
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <input
              name="password"
              type="password"
              required={!isEditing}
              minLength={8}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#445238] hover:bg-[#35412b] text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md mt-6 text-sm disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>{isEditing ? 'Update User' : 'Create User'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}