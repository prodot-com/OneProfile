"use client";

import { useState, useCallback } from "react";
import { Link, SocialLink } from "@prisma/client";
import {
  Link2,
  GripVertical,
  Search,
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { AddLinkModal, DeleteLinkModal, EditLinkModal } from "./LinkModals";
import SocialSection from "./SocialSection";
import PhonePreview from "./PhonePreview";

interface PreviewProfile {
  displayName: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  website: string | null;
}

interface LinksProps {
  links: Link[];
  socials: SocialLink[];
  profile: PreviewProfile;
}

export default function LinksPage({
  links: initialLinks,
  socials: initialSocials,
  profile,
}: LinksProps) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ─── Callbacks for live preview updates ─── */

  const handleLinkAdded = useCallback((newLink: Link) => {
    setLinks((prev) => [...prev, newLink]);
  }, []);

  const handleLinkUpdated = useCallback((updated: Link) => {
    setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }, []);

  const handleLinkDeleted = useCallback((deletedId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== deletedId));
  }, []);

  const handleSocialsChanged = useCallback((newSocials: SocialLink[]) => {
    setSocials(newSocials);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
      {/* Left: Editor */}
      <section className="space-y-8 min-w-0">
        <SocialSection socials={socials} onUpdate={handleSocialsChanged} />

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Links
              </h1>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
                {links.length}
              </span>
            </div>
            <p className="mt-1.5 text-zinc-500">
              Manage the links displayed on your public profile.
            </p>
          </div>

          <button
            onClick={() => setAddModal(true)}
            className="group flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/10"
          >
            <Plus className="size-4 transition-transform group-hover:rotate-90" />
            Add Link
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
          />
        </div>

        {/* Links List */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
          {filteredLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-zinc-100">
                <Link2 className="size-6 text-zinc-400" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900">
                {searchTerm ? "No links match your search" : "No links yet"}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Start building your OneProfile by adding your first link."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setAddModal(true)}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="size-4" />
                  Create First Link
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {filteredLinks.map((link) => (
                <div
                  key={link.id}
                  className="group flex flex-col gap-4 p-5 transition-colors hover:bg-zinc-50/50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 cursor-grab p-0.5 text-zinc-300 transition-colors hover:text-zinc-500 active:cursor-grabbing">
                      <GripVertical className="size-4.5" />
                    </div>
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-200/70">
                      <Link2 className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-semibold text-zinc-900 truncate">
                          {link.title}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            link.active
                              ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                              : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
                          }`}
                        >
                          {link.active ? "Active" : "Hidden"}
                        </span>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block truncate text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
                      >
                        {link.url}
                      </a>
                      {link.description && (
                        <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-9 md:pl-0">
                    <span className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-600 ring-1 ring-violet-100">
                      <BarChart3 className="size-3" />
                      {link.clicks}
                    </span>
                    <button
                      onClick={() => {
                        setEditModal(true);
                        setSelectedLink(link);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300"
                    >
                      <Pencil className="size-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLink(link);
                        setDeleteModal(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </button>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-zinc-300 opacity-0 transition-all group-hover:opacity-100 hover:text-zinc-600 hover:bg-zinc-100"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <EditLinkModal
          open={editModal}
          link={selectedLink}
          onClose={() => {
            setEditModal(false);
            setSelectedLink(null);
          }}
          onSuccess={handleLinkUpdated}
        />

        <DeleteLinkModal
          open={deleteModal}
          link={selectedLink}
          onClose={() => {
            setDeleteModal(false);
            setSelectedLink(null);
          }}
          onSuccess={handleLinkDeleted}
        />

        <AddLinkModal
          open={addModal}
          onClose={() => setAddModal(false)}
          onSuccess={handleLinkAdded}
        />
      </section>

      {/* Right: Phone Preview */}
      <div className="hidden lg:block">
        <PhonePreview profile={profile} links={links} socials={socials} />
      </div>
    </div>
  );
}
