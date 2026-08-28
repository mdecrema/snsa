'use client';

import { useState, useRef, useEffect } from 'react';
import { updateNavItemAction } from '../actions/navItems';
import { getLocalizedField } from '@/lib/utils';
import type { NavItem, Language } from '@/app/generated/prisma';

interface Props {
  navItems: NavItem[];
  languages: Language[];
}

type DeviceView = 'mobile' | 'tablet' | 'desktop';

export default function NavItemsManager({ navItems: initialNavItems, languages }: Props) {
  const [items, setItems] = useState<NavItem[]>(initialNavItems);
  const [selectedId, setSelectedId] = useState<number>(initialNavItems[0]?.id || 0);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Active language tab for localized inputs
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'en');
  
  // Active responsive preview view
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const selectedItem = items.find((i) => i.id === selectedId);

  // Form States
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [subtitles, setSubtitles] = useState<Record<string, string>>({});
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [image, setImage] = useState<string>('');
  const [href, setHref] = useState<string>('');

  const populateFormFields = (item: NavItem) => {
    const titleObj = (item.title as Record<string, string>) || {};
    const subtitleObj = (item.subtitle as Record<string, string>) || {};
    const descObj = (item.description as Record<string, string>) || {};

    const initialTitles: Record<string, string> = {};
    const initialSubtitles: Record<string, string> = {};
    const initialDescs: Record<string, string> = {};

    languages.forEach((lang) => {
      initialTitles[lang.code] = titleObj[lang.code] || '';
      initialSubtitles[lang.code] = subtitleObj[lang.code] || '';
      initialDescs[lang.code] = descObj[lang.code] || '';
    });

    setTitles(initialTitles);
    setSubtitles(initialSubtitles);
    setDescriptions(initialDescs);
    setImage(item.image || '');
    setHref(item.href || '');
  };

  const handleSelect = (item: NavItem) => {
    setSelectedId(item.id);
    setMessage(null);
    populateFormFields(item);
  };

  // Populate form fields cleanly on initial mount or item change
  useEffect(() => {
    if (selectedItem) {
      populateFormFields(selectedItem);
    }
  }, [selectedId]);

  // Broadcast typed changes to iframe in real time
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'ADMIN_LIVE_PREVIEW_UPDATE',
          payload: { title: titles, description: descriptions, image },
        },
        '*'
      );
    }
  }, [titles, descriptions, image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setIsSaving(true);
    setMessage(null);

    const res = await updateNavItemAction(selectedItem.id, {
      title: titles,
      subtitle: subtitles,
      description: descriptions,
      image,
      href,
    });

    setIsSaving(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Changes saved successfully!' });
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, title: titles, subtitle: subtitles, description: descriptions, image, href }
            : item
        )
      );
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to save changes.' });
    }
  };

  // Standardized device viewport styling
  const deviceStyles = {
    mobile: 'w-[375px] h-[667px] rounded-[32px] border-[10px] border-gray-900 shadow-2xl my-auto',
    tablet: 'w-[768px] h-[85%] rounded-[20px] border-[8px] border-gray-800 shadow-xl my-auto',
    desktop: 'w-full h-full border-none rounded-none shadow-none',
  };

  return (
    <div className="flex bg-gray-100 h-[calc(100vh-2rem)] rounded-2xl overflow-hidden border border-gray-200">
      
      {/* LEFT COLUMN: EDITING PANEL */}
      <aside className="w-[420px] bg-white flex flex-col border-r border-gray-200 shrink-0 shadow-sm z-30 relative">
        
        {/* 1. Page Selector Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Select Page to Edit
          </label>
          <select
            value={selectedId}
            onChange={(e) => {
              const item = items.find((i) => i.id === Number(e.target.value));
              if (item) handleSelect(item);
            }}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238] shadow-sm cursor-pointer"
          >
            {items.map((item) => {
              const displayTitle = getLocalizedField(item.title, 'en', 'en') || item.href;
              return (
                <option key={item.id} value={item.id}>
                  {displayTitle} ({item.href})
                </option>
              );
            })}
          </select>
        </div>

        {/* 2. Scrollable Form Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {selectedItem ? (
            <form id="nav-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Status Alert Message */}
              {message && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium border ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* General Route & Banner Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Page Settings
                </h3>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Route URL
                  </label>
                  <input
                    type="text"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Banner Image Path
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238]"
                  />
                </div>
              </div>

              {/* Language Tabs Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Localized Content
                  </h3>
                  
                  {/* Language Tab Switcher */}
                  <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setActiveLang(lang.code)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all uppercase cursor-pointer ${
                          activeLang === lang.code
                            ? 'bg-white text-[#445238] shadow-sm'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {lang.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Language Form Card */}
                {languages.map(
                  (lang) =>
                    activeLang === lang.code && (
                      <div
                        key={lang.code}
                        className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4"
                      >
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                          <span className="bg-[#445238] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {lang.code}
                          </span>
                          <span className="text-xs font-bold text-gray-700">{lang.name} Content</span>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                          <input
                            type="text"
                            value={titles[lang.code] || ''}
                            onChange={(e) => setTitles({ ...titles, [lang.code]: e.target.value })}
                            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={subtitles[lang.code] || ''}
                            onChange={(e) => setSubtitles({ ...subtitles, [lang.code]: e.target.value })}
                            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={descriptions[lang.code] || ''}
                            onChange={(e) =>
                              setDescriptions({ ...descriptions, [lang.code]: e.target.value })
                            }
                            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#445238]"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </form>
          ) : (
            <p className="text-gray-400 text-sm">Select a page from the dropdown to start editing.</p>
          )}
        </div>

        {/* 3. Sticky Bottom Action Footer */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            type="submit"
            form="nav-form"
            disabled={isSaving}
            className="w-full bg-[#445238] hover:bg-[#35412b] text-white font-bold text-sm py-2.5 rounded-xl shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </aside>

      {/* RIGHT COLUMN: PREVIEW VIEWPORT */}
      <section className="flex-1 bg-gray-200/70 flex flex-col overflow-hidden relative z-10">
        
        {/* Preview Toolbar */}
        <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold text-xs text-gray-700 uppercase tracking-wider">
              Live Preview
            </span>
          </div>

          {/* Viewport Resize Toggles */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceView === 'mobile'
                  ? 'bg-white text-[#445238] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceView === 'tablet'
                  ? 'bg-white text-[#445238] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Tablet
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceView === 'desktop'
                  ? 'bg-white text-[#445238] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Laptop
            </button>
          </div>

          <span className="font-mono text-xs bg-gray-50 border border-gray-200 text-gray-500 px-3 py-1 rounded-md">
            {href}
          </span>
        </div>

        {/* Resizable Canvas Area */}
        <div className="flex-1 w-full h-full flex items-center justify-center p-6 overflow-auto">
          <div
            className={`relative transition-all duration-300 ease-in-out bg-white overflow-hidden ${deviceStyles[deviceView]}`}
          >
            {/* CLICK SHIELD OVERLAY (Properly contained & non-blocking) */}
            <div 
              className="absolute inset-0 z-20 bg-transparent pointer-events-auto"
              onWheel={(e) => {
                if (iframeRef.current?.contentWindow) {
                  iframeRef.current.contentWindow.scrollBy(0, e.deltaY);
                }
              }}
            />
            <iframe
              ref={iframeRef}
              src={href}
              key={href}
              title="Page Live Preview"
              className="w-full h-full border-none pointer-events-none select-none relative z-10"
              onLoad={() => {
                iframeRef.current?.contentWindow?.postMessage(
                  {
                    type: 'ADMIN_LIVE_PREVIEW_UPDATE',
                    payload: { title: titles, description: descriptions, image },
                  },
                  '*'
                );
              }}
            />
          </div>
        </div>
      </section>

    </div>
  );
}