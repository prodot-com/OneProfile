"use client";

import { useState } from "react";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  visibility: string;
  clicks: number;
}

export default function LinksSection({ initialLinks }: { initialLinks: LinkItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [links] = useState<LinkItem[]>(initialLinks);

  const filteredLinks = links.filter((link) => 
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-900">Your Links</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search links..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
            />
            <svg className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="hidden sm:flex items-center justify-center bg-zinc-900 text-white w-9 h-9 rounded-xl hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-zinc-50/30">
        {filteredLinks.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No links match your search.
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredLinks.map((link) => (
              <div 
                key={link.id}
                className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-all"
              >
                <div className="cursor-grab p-1 text-zinc-300 hover:text-zinc-500 active:cursor-grabbing">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                </div>
                
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-medium text-zinc-900 truncate">{link.title}</h3>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      link.visibility === 'Public' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {link.visibility}
                    </span>
                  </div>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-800 truncate block transition-colors">
                    {link.url}
                  </a>
                </div>

                <div className="hidden sm:flex flex-col items-end px-4 border-r border-zinc-100">
                  <span className="text-sm font-semibold text-zinc-900">{link.clicks}</span>
                  <span className="text-xs text-zinc-400">clicks</span>
                </div>

                <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}