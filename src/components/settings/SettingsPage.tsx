"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  Eye,
  EyeOff,
  LogOut,
  AlertTriangle,
  Mail,
  Calendar,
  Monitor,
  Globe,
  Lock,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { updateProfile } from "@/services/profile";

interface SettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  profile: {
    username: string;
    isPublic: boolean;
  };
  sessionCount: number;
}

/* ─── Custom Toggle ─── */
function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
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

/* ─── Section Card ─── */
function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
  variant = "default",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm overflow-hidden ${
        variant === "danger" ? "border-red-200" : "border-zinc-200/80"
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b p-5 ${
          variant === "danger" ? "border-red-100" : "border-zinc-100"
        }`}
      >
        <div
          className={`flex size-10 items-center justify-center rounded-xl ${
            variant === "danger" ? "bg-red-50" : "bg-zinc-100"
          }`}
        >
          <Icon
            className={`size-5 ${
              variant === "danger" ? "text-red-500" : "text-zinc-500"
            }`}
          />
        </div>
        <div>
          <h2
            className={`font-semibold ${
              variant === "danger" ? "text-red-600" : "text-zinc-900"
            }`}
          >
            {title}
          </h2>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─── Info Row ─── */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-zinc-400" />
        <span className="text-sm text-zinc-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-zinc-900">{value}</span>
    </div>
  );
}

/* ─── MAIN SETTINGS PAGE ─── */

export default function SettingsPage({
  user,
  profile,
  sessionCount,
}: SettingsProps) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(profile.isPublic);
  const [privacyLoading, setPrivacyLoading] = useState(false);
  const [privacySaved, setPrivacySaved] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handlePrivacyToggle(value: boolean) {
    setIsPublic(value);
    setPrivacyLoading(true);
    setPrivacySaved(false);
    try {
      const res = await updateProfile({ isPublic: value });
      if (!res.success) {
        setIsPublic(!value); // revert
        alert(res.error || "Failed to update.");
        return;
      }
      setPrivacySaved(true);
      setTimeout(() => setPrivacySaved(false), 2000);
      router.refresh();
    } catch {
      setIsPublic(!value);
      alert("Something went wrong.");
    } finally {
      setPrivacyLoading(false);
    }
  }

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await signOut();
      router.push("/");
    } catch {
      alert("Failed to sign out.");
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Settings
        </h1>
        <p className="mt-1.5 text-zinc-500">
          Manage your account, privacy, and sessions.
        </p>
      </div>

      {/* Account Info */}
      <SettingsCard
        icon={User}
        title="Account"
        description="Your account details."
      >
        <div className="divide-y divide-zinc-100">
          <InfoRow icon={User} label="Name" value={user.name} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow icon={Globe} label="Username" value={`@${profile.username}`} />
          <InfoRow icon={Calendar} label="Joined" value={createdDate} />
        </div>
      </SettingsCard>

      {/* Privacy */}
      <SettingsCard
        icon={Shield}
        title="Privacy"
        description="Control who can see your profile."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Eye className="size-5 text-emerald-500" />
              ) : (
                <EyeOff className="size-5 text-zinc-400" />
              )}
              <div>
                <h3 className="text-sm font-medium text-zinc-900">
                  Public Profile
                </h3>
                <p className="text-xs text-zinc-500">
                  {isPublic
                    ? "Your profile is visible to everyone."
                    : "Your profile is hidden from public view."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {privacySaved && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <Check className="size-3" />
                  Saved
                </span>
              )}
              <Toggle
                checked={isPublic}
                onChange={handlePrivacyToggle}
                disabled={privacyLoading}
              />
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Sessions */}
      <SettingsCard
        icon={Monitor}
        title="Sessions"
        description="Manage your active sessions."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
            <div className="flex items-center gap-3">
              <Lock className="size-5 text-zinc-400" />
              <div>
                <h3 className="text-sm font-medium text-zinc-900">
                  Active Sessions
                </h3>
                <p className="text-xs text-zinc-500">
                  You have {sessionCount} active{" "}
                  {sessionCount === 1 ? "session" : "sessions"}.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
              {sessionCount}
            </span>
          </div>

          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {logoutLoading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </SettingsCard>

      {/* Danger Zone */}
      <SettingsCard
        icon={AlertTriangle}
        title="Danger Zone"
        description="Irreversible and destructive actions."
        variant="danger"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">
            Deleting your account will permanently remove all your data,
            including links, analytics, and social profiles. This action cannot
            be undone.
          </p>
          <button
            onClick={() => setDeleteModal(true)}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <Trash2 className="size-4" />
            Delete Account
          </button>
        </div>
      </SettingsCard>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <DeleteAccountModal onClose={() => setDeleteModal(false)} />
      )}
    </section>
  );
}

/* ─── DELETE ACCOUNT MODAL ─── */

function DeleteAccountModal({ onClose }: { onClose: () => void }) {
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const canDelete = confirmation === "DELETE";

  async function handleDelete() {
    if (!canDelete) return;
    setLoading(true);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Failed to delete account.");
        return;
      }
      router.push("/");
    } catch {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="size-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-600">
                  Delete Account
                </h2>
                <p className="text-sm text-zinc-500">
                  This cannot be undone.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm text-zinc-600">
            This will permanently delete your account, profile, all links, click
            analytics, and social profiles. There is no way to recover this
            data.
          </p>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Type <span className="font-bold text-red-600">DELETE</span> to
              confirm
            </label>
            <input
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-red-400 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
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
            disabled={!canDelete || loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
