"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, AlertTriangle } from "lucide-react";
import { createLink, deleteLink, updateLink } from "@/services/Links";
import { Link } from "@prisma/client";

/* ─── Shared form input styling ─── */
const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5";

/* ─── Custom Toggle ─── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-emerald-500" : "bg-zinc-200"
      }`}
    >
      <span
        className={`inline-block size-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ─── ADD LINK MODAL ─── */

interface AddLinkModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (link: Link) => void;
  onChange?: (draft: Partial<Link> | null) => void;
}

export function AddLinkModal({ open, onClose, onSuccess, onChange }: AddLinkModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (open && onChange) {
      onChange({ title, url, description, icon, active, id: "temp" });
    }
  }, [open, title, url, description, icon, active, onChange]);

  useEffect(() => {
    if (!open && onChange) onChange(null);
  }, [open, onChange]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createLink({ title, url, description, icon, active });
      if (!res.success) {
        alert(res.message);
        return;
      }
      if (res.data) onSuccess(res.data);
      setTitle("");
      setUrl("");
      setDescription("");
      setIcon("");
      setActive(true);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-zinc-200/50"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Add New Link
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500">
              Add a new link to your profile.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="GitHub"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              URL
            </label>
            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Icon
            </label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="github"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-zinc-400">
              Identifier for the link icon (e.g. github, twitter)
            </p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-900">Active</h3>
              <p className="text-xs text-zinc-500">
                Display this link on your profile.
              </p>
            </div>
            <Toggle checked={active} onChange={setActive} />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── EDIT LINK MODAL ─── */

interface EditLinkModalProps {
  open: boolean;
  onClose: () => void;
  link: Link | null;
  onSuccess: (link: Link) => void;
  onChange?: (draft: Partial<Link> | null) => void;
}

export function EditLinkModal({
  open,
  onClose,
  link,
  onSuccess,
  onChange
}: EditLinkModalProps) {
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

  useEffect(() => {
    if (open && onChange && link) {
      onChange({ title, url, description, icon, active, id: link.id });
    }
  }, [open, title, url, description, icon, active, link, onChange]);

  useEffect(() => {
    if (!open && onChange) onChange(null);
  }, [open, onChange]);

  if (!open || !link) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!link) return;
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
      if (res.data) onSuccess(res.data);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-zinc-200/50"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Edit Link</h2>
            <p className="mt-0.5 text-sm text-zinc-500">
              Update your link information.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              URL
            </label>
            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Icon
            </label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="github"
              className={inputClass}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-900">Active</h3>
              <p className="text-xs text-zinc-500">
                Show this link on your profile.
              </p>
            </div>
            <Toggle checked={active} onChange={setActive} />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── DELETE LINK MODAL ─── */

interface DeleteLinkModalProps {
  open: boolean;
  link: Link | null;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
}

export function DeleteLinkModal({
  open,
  link,
  onClose,
  onSuccess,
}: DeleteLinkModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!open || !link) return null;

  async function handleDelete() {
    setLoading(true);
    if (!link) return;
    try {
      const res = await deleteLink(link.id);
      if (!res.success) {
        alert(res.message);
        return;
      }
      onSuccess(link.id);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-zinc-200/50"
      >
        <div className="border-b border-zinc-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle className="size-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-red-600">
                Delete Link
              </h2>
              <p className="text-sm text-zinc-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
            <p className="font-medium text-zinc-900">{link.title}</p>
            <p className="mt-1 break-all text-sm text-zinc-500">{link.url}</p>
          </div>
          <p className="text-sm text-zinc-600">
            Are you sure you want to permanently delete this link? All click
            analytics for this link will also be removed.
          </p>
        </div>
        <div className="flex justify-end gap-3 border-t border-zinc-100 p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
