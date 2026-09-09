"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SocialLink, SocialPlatform } from "@prisma/client";
import { X, AlertTriangle } from "lucide-react";
import { createSocial, updateSocial, deleteSocial } from "@/services/Socials";

const inputClass = "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5";

interface SocialFormProps {
  title: string;
  loading: boolean;
  platform: SocialPlatform;
  setPlatform: React.Dispatch<React.SetStateAction<SocialPlatform>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  submitText: string;
  loadingText: string;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
}

function SocialForm({
  title,
  loading,
  platform,
  setPlatform,
  url,
  setUrl,
  submitText,
  loadingText,
  onSubmit,
  onClose,
}: SocialFormProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-zinc-200/50"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
            <p className="mt-0.5 text-sm text-zinc-500">
              Manage your social profile.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value as SocialPlatform)
              }
              className={inputClass}
            >
              {Object.values(SocialPlatform).map((item) => (
                <option key={item} value={item}>
                  {item
                    .toLowerCase()
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
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
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
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
              {loading ? loadingText : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface AddSocialModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (social: SocialLink) => void;
}

export function AddSocialModal({
  open,
  onClose,
  onSuccess,
}: AddSocialModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState<SocialPlatform>(
    SocialPlatform.GITHUB
  );
  const [url, setUrl] = useState("");

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createSocial({ platform, url });
      if (!res.success) {
        alert(res.message);
        return;
      }
      if (res.social) onSuccess(res.social);
      setPlatform(SocialPlatform.GITHUB);
      setUrl("");
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
    <SocialForm
      title="Add Social"
      loading={loading}
      platform={platform}
      setPlatform={setPlatform}
      url={url}
      setUrl={setUrl}
      submitText="Create Social"
      loadingText="Creating..."
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

/* ─── EDIT SOCIAL MODAL ─── */

interface EditSocialModalProps {
  open: boolean;
  onClose: () => void;
  social: SocialLink | null;
  onSuccess: (social: SocialLink) => void;
}

export function EditSocialModal({
  open,
  onClose,
  social,
  onSuccess,
}: EditSocialModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState<SocialPlatform>(
    SocialPlatform.GITHUB
  );
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!social) return;
    setPlatform(social.platform);
    setUrl(social.url);
  }, [social]);

  if (!open || !social) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!social) return;
    setLoading(true);
    try {
      const res = await updateSocial(social.id, { platform, url });
      if (!res.success) {
        alert(res.message);
        return;
      }
      if (res.social) onSuccess(res.social);
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
    <SocialForm
      title="Edit Social"
      loading={loading}
      platform={platform}
      setPlatform={setPlatform}
      url={url}
      setUrl={setUrl}
      submitText="Save Changes"
      loadingText="Saving..."
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

/* ─── DELETE SOCIAL MODAL ─── */

interface DeleteSocialModalProps {
  open: boolean;
  social: SocialLink | null;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
}

export function DeleteSocialModal({
  open,
  social,
  onClose,
  onSuccess,
}: DeleteSocialModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!open || !social) return null;

  async function handleDelete() {
    if (!social) return;
    setLoading(true);
    try {
      const res = await deleteSocial(social.id);
      if (!res.success) {
        alert(res.message);
        return;
      }
      onSuccess(social.id);
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
                Delete Social
              </h2>
              <p className="text-sm text-zinc-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
            <p className="font-semibold text-zinc-900 capitalize">
              {social.platform.toLowerCase()}
            </p>
            <p className="mt-1 break-all text-sm text-zinc-500">
              {social.url}
            </p>
          </div>
          <p className="text-sm text-zinc-600">
            Are you sure you want to permanently delete this social profile?
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