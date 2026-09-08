"use client";

import { SocialLink } from "@prisma/client";
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Globe,
  ExternalLink,
} from "lucide-react";
import {
  AddSocialModal,
  DeleteSocialModal,
  EditSocialModal,
} from "./SocialModal";

interface SocialSectionProps {
  socials: SocialLink[];
  onUpdate: (socials: SocialLink[]) => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  GITHUB: "bg-zinc-900 text-white",
  X: "bg-zinc-900 text-white",
  LINKEDIN: "bg-blue-600 text-white",
  INSTAGRAM: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  FACEBOOK: "bg-blue-500 text-white",
  YOUTUBE: "bg-red-600 text-white",
  DISCORD: "bg-indigo-500 text-white",
  THREADS: "bg-zinc-900 text-white",
  TIKTOK: "bg-zinc-900 text-white",
  REDDIT: "bg-orange-500 text-white",
  TWITCH: "bg-purple-600 text-white",
  SPOTIFY: "bg-green-500 text-white",
  MEDIUM: "bg-zinc-800 text-white",
  HASHNODE: "bg-blue-600 text-white",
  WEBSITE: "bg-emerald-500 text-white",
};

export default function SocialSection({
  socials: initialSocials,
  onUpdate,
}: SocialSectionProps) {
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<SocialLink | null>(null);

  const filtered = socials.filter(
    (social) =>
      social.platform.toLowerCase().includes(search.toLowerCase()) ||
      social.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleSocialAdded = (newSocial: SocialLink) => {
    const updated = [...socials, newSocial];
    setSocials(updated);
    onUpdate(updated);
  };

  const handleSocialUpdated = (updatedSocial: SocialLink) => {
    const updated = socials.map((s) =>
      s.id === updatedSocial.id ? updatedSocial : s
    );
    setSocials(updated);
    onUpdate(updated);
  };

  const handleSocialDeleted = (deletedId: string) => {
    const updated = socials.filter((s) => s.id !== deletedId);
    setSocials(updated);
    onUpdate(updated);
  };

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-semibold text-zinc-900">
              Social Icons
            </h2>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
              {socials.length}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-zinc-500">
            Manage your social media accounts.
          </p>
        </div>

        <button
          onClick={() => setAddModal(true)}
          className="group flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/10"
        >
          <Plus className="size-4 transition-transform group-hover:rotate-90" />
          Add Social
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-zinc-100 p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search socials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/5"
          />
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-zinc-100">
            <Globe className="size-5 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900">
            No social links yet
          </h3>
          <p className="mt-1.5 text-sm text-zinc-500">
            Connect your social media profiles.
          </p>
          {!search && (
            <button
              onClick={() => setAddModal(true)}
              className="mt-5 flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              <Plus className="size-4" />
              Add Social
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {filtered.map((social) => (
            <div
              key={social.id}
              className="group flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between transition-colors hover:bg-zinc-50/50"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                    PLATFORM_COLORS[social.platform] ||
                    "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {social.platform.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-900 capitalize">
                    {social.platform.toLowerCase()}
                  </h3>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block truncate text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
                  >
                    {social.url}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-14 md:pl-0">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-zinc-300 opacity-0 transition-all group-hover:opacity-100 hover:text-zinc-600 hover:bg-zinc-100"
                >
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setEditModal(true);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300"
                >
                  <Pencil className="size-3" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setDeleteModal(true);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="size-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddSocialModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onSuccess={handleSocialAdded}
      />
      <EditSocialModal
        open={editModal}
        social={selectedSocial}
        onClose={() => {
          setEditModal(false);
          setSelectedSocial(null);
        }}
        onSuccess={handleSocialUpdated}
      />
      <DeleteSocialModal
        open={deleteModal}
        social={selectedSocial}
        onClose={() => {
          setDeleteModal(false);
          setSelectedSocial(null);
        }}
        onSuccess={handleSocialDeleted}
      />
    </section>
  );
}
