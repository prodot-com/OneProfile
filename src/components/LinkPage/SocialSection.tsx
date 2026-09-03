"use client";

import { SocialLink } from "@prisma/client";
import { useState } from "react";
import { AddSocialModal, DeleteSocialModal, EditSocialModal } from "./SocialModal";

interface SocialSectionProps {
  socials: SocialLink[];
}

export default function SocialSection({ socials }: SocialSectionProps) {
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

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Social Icons</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your social media accounts.
          </p>
        </div>

        <button 
        onClick={()=>setAddModal(true)}
        className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800">
          + Add Social
        </button>
      </div>

      {/* Search */}
      <div className="border-b p-5">
        <input
          type="text"
          placeholder="Search socials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-5xl mb-5">🌐</div>

          <h3 className="text-xl font-semibold">No social links yet</h3>

          <p className="mt-2 text-zinc-500">
            Connect your social media profiles.
          </p>

          <button
            onClick={() => setAddModal(true)}
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            + Add Social
          </button>
        </div>
      ) : (
        <div className="divide-y">
          {filtered.map((social) => (
            <div
              key={social.id}
              className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between hover:bg-zinc-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-lg font-semibold">
                  {social.platform.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold capitalize">
                    {social.platform.toLowerCase()}
                  </h3>

                  <p className="mt-1 break-all text-sm text-zinc-500">
                    {social.url}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setEditModal(true);
                  }}
                  className="rounded-lg border px-4 py-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedSocial(social);
                    setDeleteModal(true);
                  }}
                  className="rounded-lg border border-red-200 px-4 py-2 text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddSocialModal open={addModal} onClose={() => setAddModal(false)} />

      <EditSocialModal
        open={editModal}
        social={selectedSocial}
        onClose={() => {
          setEditModal(false);
          setSelectedSocial(null);
        }}
      />

      <DeleteSocialModal
        open={deleteModal}
        social={selectedSocial}
        onClose={() => {
          setDeleteModal(false);
          setSelectedSocial(null);
        }}
      />
    </section>
  );
}
