"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SocialLink, SocialPlatform } from "@prisma/client";

import {
  createSocial,
  updateSocial,
  deleteSocial,
} from "@/services/Socials";

interface SocialProps {
  open: boolean;
  onClose: () => void;
  social: SocialLink | null;
}

interface AddSocialModalProps {
  open: boolean;
  onClose: () => void;
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your social profile.
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

        <form
          onSubmit={onSubmit}
          className="space-y-6 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Platform
            </label>

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(
                  e.target.value as SocialPlatform
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            >
              {Object.values(SocialPlatform).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item
                    .toLowerCase()
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              URL
            </label>

            <input
              required
              type="url"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://github.com/probal"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-60"
            >
              {loading
                ? loadingText
                : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddSocialModal({
  open,
  onClose,
}: AddSocialModalProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] =
    useState<SocialPlatform>(SocialPlatform.GITHUB);

  const [url, setUrl] = useState("");

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await createSocial({
        platform,
        url,
      });

      if (!res.success) {
        alert(res.message);
        return;
      }

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

export function EditSocialModal({
  open,
  onClose,
  social,
}: SocialProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] =
    useState<SocialPlatform>(SocialPlatform.GITHUB);

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!social) return;

    setPlatform(social.platform);
    setUrl(social.url);
  }, [social]);

  if (!open || !social) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if(!social) return

    setLoading(true);

    try {
      const res = await updateSocial(social.id, {
        platform,
        url,
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

export function DeleteSocialModal({
  open,
  social,
  onClose,
}: SocialProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  if (!open || !social) return null;

  async function handleDelete() {

    if(!social) return
    setLoading(true);

    try {
      const res = await deleteSocial(social.id);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}

        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-red-600">
            Delete Social
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold">
              {social.platform}
            </p>

            <p className="mt-1 break-all text-sm text-zinc-500">
              {social.url}
            </p>
          </div>

          <p className="text-sm text-zinc-600">
            Are you sure you want to permanently delete this
            social profile?
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