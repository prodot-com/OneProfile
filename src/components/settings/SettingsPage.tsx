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
import { Profile } from "@prisma/client";

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
    avatar: string;
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
        checked ? "bg-[#f97316]" : "bg-[#e5e2dc]"
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
  avatar,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
  avatar?: string;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border bg-white/70 backdrop-blur-md shadow-sm overflow-hidden ${
        variant === "danger" ? "border-red-200" : "border-[#e5e2dc]"
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b p-6 ${
          variant === "danger"
            ? "border-red-100/50 bg-red-50/30"
            : "border-[#f0f0f0]"
        }`}
      >
        <div
          className={`flex size-10 items-center justify-center rounded-[1rem] ${
            variant === "danger" ? "bg-red-50" : "bg-[#fafafa]"
          }`}
        >
          <Icon
            className={`size-5 ${
              variant === "danger" ? "text-red-500" : "text-[#1a1a1a]"
            }`}
          />
          {avatar && (
            <img src={avatar} alt="" className="rounded-full size-10" />
          )}
        </div>
        <div>
          <h2
            className={`text-lg font-serif font-semibold ${
              variant === "danger" ? "text-red-600" : "text-[#1a1a1a]"
            }`}
          >
            {title}
          </h2>
          <p className="text-sm font-medium text-[#b4b0a4]">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
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
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Icon className="size-4.5 text-[#1a1a1a]" />
        <span className="text-sm font-semibold text-[#1a1a1a]">{label}</span>
      </div>
      <span className="text-sm font-medium text-[#6b6b6b]">{value}</span>
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
        <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
          Settings
        </h1>
        <p className="mt-2 text-lg text-[#6b6b6b]">
          Manage your account, privacy, and sessions.
        </p>
      </div>

      {/* Account Info */}
      <SettingsCard
        icon={User}
        title="Account"
        description="Your account details."
        avatar={profile.avatar}
      >
        <div className="divide-y divide-[#f0f0f0]">
          <InfoRow icon={User} label="Name" value={user.name} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow
            icon={Globe}
            label="Username"
            value={`@${profile.username}`}
          />
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
          <div className="flex items-center justify-between rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa]/50 p-5">
            <div className="flex items-center gap-4">
              {isPublic ? (
                <Eye className="size-5 text-[#f97316]" />
              ) : (
                <EyeOff className="size-5 text-[#b4b0a4]" />
              )}
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a1a]">
                  Public Profile
                </h3>
                <p className="text-[13px] text-[#6b6b6b]">
                  {isPublic
                    ? "Your profile is visible to everyone."
                    : "Your profile is hidden from public view."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {privacySaved && (
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#10b981]">
                  <Check className="size-3.5" />
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
          <div className="flex items-center justify-between rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa]/50 p-5">
            <div className="flex items-center gap-4">
              <Lock className="size-5 text-[#b4b0a4]" />
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a1a]">
                  Active Sessions
                </h3>
                <p className="text-[13px] text-[#6b6b6b]">
                  You have {sessionCount} active{" "}
                  {sessionCount === 1 ? "session" : "sessions"}.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-bold text-white">
              {sessionCount}
            </span>
          </div>

          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e2dc] bg-[#fafafa] px-5 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-white hover:border-[#1a1a1a] disabled:opacity-50 cursor-pointer"
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
          <p className="text-[13px] font-medium text-red-600/80">
            Deleting your account will permanently remove all your data,
            including links, analytics, and social profiles. This action cannot
            be undone.
          </p>
          <button
            onClick={() => setDeleteModal(true)}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-[0.98] cursor-pointer shadow-sm"
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
        className="w-full max-w-md rounded-[1.5rem] bg-white shadow-2xl border border-[#e5e2dc]"
      >
        <div className="border-b border-[#f0f0f0] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                <AlertTriangle className="size-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-semibold text-red-600">
                  Delete Account
                </h2>
                <p className="text-xs font-medium text-[#6b6b6b]">
                  This cannot be undone.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[#b4b0a4] hover:text-[#1a1a1a] hover:bg-[#fafafa] transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-sm font-medium text-[#6b6b6b]">
            This will permanently delete your account, profile, all links, click
            analytics, and social profiles. There is no way to recover this
            data.
          </p>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">
              Type <span className="font-bold text-red-600">DELETE</span> to
              confirm
            </label>
            <input
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-[1.25rem] border border-red-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-[#b4b0a4] focus:border-red-400 focus:ring-2 focus:ring-red-500/10 text-[#1a1a1a]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#f0f0f0] p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[#e5e2dc] px-5 py-2.5 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#fafafa] disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!canDelete || loading}
            className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
