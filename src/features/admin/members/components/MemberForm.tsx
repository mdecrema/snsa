'use client';

import { useState } from 'react';
import { Building2, MapPin, Globe, Calendar, Image as ImageIcon, Save, Loader2, CheckCircle, AlertCircle, Eye, Tag } from 'lucide-react';
import { createMemberAction, updateMemberAction } from '../actions/memberActions';

export interface CategoryOption {
  id: number;
  name: string;
}

export interface MemberData {
  id?: number;
  name: string;
  location: string;
  description: string;
  website: string;
  certifiedSince: number;
  imageUrl?: string | null;
  published: boolean;
  categoryId: number;
}

export default function MemberForm({
  member,
  categories,
  onSuccess,
}: {
  member?: MemberData | null;
  categories: CategoryOption[];
  onSuccess?: () => void;
}) {
  const isEditing = Boolean(member?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const result = isEditing && member?.id
      ? await updateMemberAction(member.id, formData)
      : await createMemberAction(formData);

    setIsLoading(false);

    if (result?.error) {
      setFeedback({ type: 'error', text: result.error });
    } else if (result?.success) {
      setFeedback({
        type: 'success',
        text: isEditing ? 'Member updated successfully!' : 'Member created successfully!',
      });
      if (!isEditing) (e.target as HTMLFormElement).reset();
      if (onSuccess) setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditing ? `Edit Member: ${member?.name}` : 'Add New Member'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {isEditing ? 'Update member directory listing and classification.' : 'Register a new organisation or member into the network.'}
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
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Member / Company Name *
          </label>
          <div className="relative flex items-center">
            <Building2 className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <input
              name="name"
              type="text"
              required
              defaultValue={member?.name ?? ''}
              placeholder="e.g. Acme Corp"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
            />
          </div>
        </div>

        {/* Location & Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Location *
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <input
                name="location"
                type="text"
                required
                defaultValue={member?.location ?? ''}
                placeholder="Zurich, Switzerland"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Category *
            </label>
            <div className="relative flex items-center">
              <Tag className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <select
                name="categoryId"
                required
                defaultValue={member?.categoryId ?? (categories[0]?.id || '')}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Website & Certified Since Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Website URL *
            </label>
            <div className="relative flex items-center">
              <Globe className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <input
                name="website"
                type="url"
                required
                defaultValue={member?.website ?? ''}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Certified Since (Year) *
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
              <input
                name="certifiedSince"
                type="number"
                required
                min="1900"
                max={new Date().getFullYear()}
                defaultValue={member?.certifiedSince ?? new Date().getFullYear()}
                placeholder="2020"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Image / Logo URL
          </label>
          <div className="relative flex items-center">
            <ImageIcon className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <input
              name="imageUrl"
              type="text"
              defaultValue={member?.imageUrl ?? ''}
              placeholder="https://example.com/logo.png"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Description *
          </label>
          <textarea
            name="description"
            rows={4}
            required
            defaultValue={member?.description ?? ''}
            placeholder="Brief overview of the member organization..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all"
          />
        </div>

        {/* Status / Visibility */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Visibility Status
          </label>
          <div className="relative flex items-center">
            <Eye className="absolute left-3.5 text-gray-400 pointer-events-none" size={18} />
            <select
              name="published"
              defaultValue={member?.published !== undefined ? String(member.published) : 'true'}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#445238] outline-none transition-all appearance-none"
            >
              <option value="true">Published (Visible on site)</option>
              <option value="false">Draft (Hidden)</option>
            </select>
          </div>
        </div>

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
              <span>{isEditing ? 'Update Member' : 'Save Member'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}