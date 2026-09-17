"use client";

import { SocialLink } from "@prisma/client";
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaReddit,
  FaTwitch,
  FaSpotify,
  FaMedium,
  FaTiktok,
} from "react-icons/fa";

import { FaHashnode, FaXTwitter } from "react-icons/fa6";

import { SiThreads } from "react-icons/si";

import { Globe } from "lucide-react";
import {
  AddSocialModal,
  DeleteSocialModal,
  EditSocialModal,
} from "./SocialModal";

interface SocialSectionProps {
  socials: SocialLink[];
  onUpdate: (socials: SocialLink[]) => void;
  onDraftChange?: (draft: Partial<SocialLink> | null) => void;
}

export const SOCIAL_ICONS = {
  WEBSITE: <Globe className="size-5" />,
  GITHUB: <FaGithub className="size-5" />,
  X: <FaXTwitter className="size-5" />,
  LINKEDIN: <FaLinkedin className="size-5" />,
  INSTAGRAM: <FaInstagram className="size-5" />,
  FACEBOOK: <FaFacebook className="size-5" />,
  YOUTUBE: <FaYoutube className="size-5" />,
  DISCORD: <FaDiscord className="size-5" />,
  THREADS: <SiThreads className="size-5" />,
  TIKTOK: <FaTiktok className="size-5" />,
  REDDIT: <FaReddit className="size-5" />,
  TWITCH: <FaTwitch className="size-5" />,
  SPOTIFY: <FaSpotify className="size-5" />,
  MEDIUM: <FaMedium className="size-5" />,
  HASHNODE: <FaHashnode className="size-5" />,
};

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
  onDraftChange,
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
      social.url.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSocialAdded = (newSocial: SocialLink) => {
    const updated = [...socials, newSocial];
    setSocials(updated);
    onUpdate(updated);
  };

  const handleSocialUpdated = (updatedSocial: SocialLink) => {
    const updated = socials.map((s) =>
      s.id === updatedSocial.id ? updatedSocial : s,
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
    <section className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#f0f0f0] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-serif font-semibold text-[#1a1a1a]">
              Social Icons
            </h2>
            <span className="rounded-full bg-[#fafafa] border border-[#f0f0f0] px-3 py-1 text-[11px] font-bold text-[#b4b0a4]">
              {socials.length}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-[#6b6b6b]">
            Manage your social media accounts.
          </p>
        </div>

        <button
          onClick={() => setAddModal(true)}
          className="group flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#333] hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          <Plus className="size-4.5 transition-transform group-hover:rotate-90" />
          Add Social
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-[#f0f0f0] p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-[#b4b0a4]" />
          <input
            type="text"
            placeholder="Search socials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#e5e2dc] bg-[#fafafa] py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-[#b4b0a4] focus:border-[#c2410c] focus:bg-white focus:ring-2 focus:ring-[#f97316]/10 text-[#1a1a1a]"
          />
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#fafafa] border border-[#f0f0f0]">
            <Globe className="size-6 text-[#b4b0a4]" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-[#1a1a1a]">
            No social links yet
          </h3>
          <p className="mt-2 text-sm text-[#6b6b6b]">
            Connect your social media profiles.
          </p>
          {!search && (
            <button
              onClick={() => setAddModal(true)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white hover:bg-[#333] transition-colors active:scale-[0.98] cursor-pointer"
            >
              <Plus className="size-4.5" />
              Add Social
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[#f0f0f0]">
          {filtered.map((social) => (
            <div
              key={social.id}
              className="group flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between transition-colors hover:bg-[#fafafa]/50"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-sm ${
                    PLATFORM_COLORS[social.platform] ||
                    "bg-[#e5e2dc] text-[#6b6b6b]"
                  }`}
                >
                  {SOCIAL_ICONS[social.platform] || (
                    <Globe className="size-5.5" />
                  )}
                </div>
                <div className="min-w-0 ml-1">
                  <h3 className="font-semibold text-[#1a1a1a] capitalize">
                    {social.platform.toLowerCase()}
                  </h3>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block truncate text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
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
                  className="rounded-xl p-2 text-[#d8d5ce] opacity-0 transition-all group-hover:opacity-100 hover:text-[#1a1a1a] hover:bg-[#fafafa]"
                >
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setEditModal(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#e5e2dc] px-3.5 py-2 text-xs font-medium text-[#1a1a1a] transition-all hover:bg-[#fafafa] hover:border-[#d8d5ce]"
                >
                  <Pencil className="size-3" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setDeleteModal(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300"
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
        onChange={onDraftChange}
      />
      <EditSocialModal
        open={editModal}
        social={selectedSocial}
        onClose={() => {
          setEditModal(false);
          setSelectedSocial(null);
        }}
        onSuccess={handleSocialUpdated}
        onChange={onDraftChange}
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
