"use client";

// import Link from "next/link";
import { requireUserAndProfile } from "@/lib/session";
import { useState } from "react";
import { Link } from "@prisma/client";
import { DeleteLinkModal, EditLinkModal } from "./LinkModals";

interface LinksProps {
  links: Link[];
}

export default function LinksPage({ links }: LinksProps) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Links</h1>

          <p className="mt-2 text-zinc-500">
            Manage the links displayed on your public profile.
          </p>
        </div>

        <button className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
          + Add Link
        </button>
      </div>

      {/* Search */}

      <div className="rounded-2xl border bg-white p-5">
        <input
          type="text"
          placeholder="Search links..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Links */}

      <div className="rounded-2xl border bg-white">
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
            <div className="mb-6 text-6xl">🔗</div>

            <h2 className="text-2xl font-semibold">No links yet</h2>

            <p className="mt-3 max-w-md text-zinc-500">
              Start building your OneProfile by adding your first link.
            </p>

            <button className="mt-8 rounded-xl bg-black px-6 py-3 text-white hover:bg-zinc-800">
              Create First Link
            </button>
          </div>
        ) : (
          <div className="divide-y">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex flex-col gap-6 p-6 transition hover:bg-zinc-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl">☰</div>

                  <div>
                    <h3 className="font-semibold">{link.title}</h3>

                    <p className="mt-1 break-all text-sm text-zinc-500">
                      {link.url}
                    </p>

                    {link.description && (
                      <p className="mt-2 text-sm text-zinc-600">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      link.active
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {link.active ? "Active" : "Hidden"}
                  </span>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs">
                    {link.clicks} Clicks
                  </span>

                  <button
                    onClick={() => setEditModal(true)}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-zinc-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLink(link);
                      setDeleteModal(true);
                    }}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
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
      />

      <DeleteLinkModal
        open={deleteModal}
        link={selectedLink}
        onClose={() => {
          setDeleteModal(false);
          setSelectedLink(null);
        }}
      />
    </section>
  );
}
