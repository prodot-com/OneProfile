"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteLink, updateLink } from "@/services/Links";
import { Link } from "@prisma/client";

// interface LinkData {
//   id: string;
//   title: string;
//   url: string;
//   description: string | null;
//   icon: string | null;
//   active: boolean;
// }

interface LinkProps {
  open: boolean;
  onClose: () => void;
  link: Link | null;
}

export function EditLinkModal({ open, onClose, link }: LinkProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!link) return;

    setTitle(link.title);
    setUrl(link.url);
    setDescription(link.description || "");
    setIcon(link.icon || "");
    setActive(link.active);
  }, [link]);

  if (!open || !link) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await updateLink(link.id, {
        title,
        url,
        description,
        icon,
        active,
      });

      if (!res.success) {
        alert(res.message);
        return;
      }

      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-bold">Edit Link</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Update your link information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-100"
          >
            ✕
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>

            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">URL</label>

            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Icon</label>

            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="github"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h3 className="font-medium">Active</h3>

              <p className="text-sm text-zinc-500">
                Show this link on your profile.
              </p>
            </div>

            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface DeleteLinkModalProps {
  open: boolean;
  link: Link | null;
  onClose: () => void;
}

export function DeleteLinkModal({ open, link, onClose }: DeleteLinkModalProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  if (!open || !link) return null;

  async function handleDelete() {
    setLoading(true);

    try {
      const res = await deleteLink(link.id);

      if (!res.success) {
        alert(res.message);
        return;
      }

      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}

        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-red-600">Delete Link</h2>

          <p className="mt-2 text-sm text-zinc-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-medium">{link.title}</p>

            <p className="mt-1 break-all text-sm text-zinc-500">{link.url}</p>
          </div>

          <p className="text-sm text-zinc-600">
            Are you sure you want to permanently delete this link?
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-5 py-2 hover:bg-zinc-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
