"use client";

import { useMemo, useState } from "react";

const TOTAL_STEPS = 7;

const themes = ["Default", "Dark", "Glass", "Minimal", "Gradient"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    bio: "",
    website: "",
    location: "",
    avatar: "",
    theme: "Default",

    github: "",
    x: "",
    linkedin: "",
    instagram: "",
  });

  const username = useMemo(() => {
    return form.username.toLowerCase().replace(/[^a-z0-9-]/g, "");
  }, [form.username]);

  const usernameValid = username.length >= 3 && username.length <= 30;

  function next() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function finishOnboarding() {
    setLoading(true);

    try {
      /*
      Replace with your server action later.

      Example:

      await createProfile({
          username: username,
          displayName: form.displayName,
          ...
      })
    */

      console.log(form);

      window.location.href = "/dashboard";
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold">OneProfile</h1>

          <span className="text-sm text-zinc-500">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Progress */}

      <div className="mx-auto mt-8 max-w-5xl px-6">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-black transition-all"
            style={{
              width: `${(step / TOTAL_STEPS) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-6">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          {/* STEP 1 */}

          {step === 1 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold">👋 Welcome to OneProfile</h2>

                <p className="mt-4 text-lg text-zinc-600">
                  Let's build your public profile. It only takes a minute.
                </p>
              </div>

              <div className="rounded-2xl border bg-zinc-50 p-6">
                <h3 className="font-semibold">You'll set up</h3>

                <ul className="mt-4 space-y-3 text-zinc-600">
                  <li>✓ Your username</li>

                  <li>✓ Basic profile</li>

                  <li>✓ Theme</li>

                  <li>✓ Social links</li>
                </ul>
              </div>

              <button
                onClick={next}
                className="w-full rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-zinc-800"
              >
                Get Started
              </button>
            </section>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">Choose your username</h2>

                <p className="mt-2 text-zinc-600">
                  This becomes your public profile URL.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Username
                </label>

                <div className="flex overflow-hidden rounded-xl border">
                  <div className="border-r bg-zinc-100 px-5 py-3">@</div>

                  <input
                    value={form.username}
                    onChange={(e) => update("username", e.target.value)}
                    placeholder="probal"
                    className="w-full px-4 outline-none"
                  />
                </div>

                <div className="mt-3 rounded-lg bg-zinc-100 p-4">
                  <p className="text-sm text-zinc-500">Public URL</p>

                  <p className="mt-1 font-medium">
                    oneprofile.app/
                    {username || "username"}
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p
                    className={
                      usernameValid ? "text-green-600" : "text-red-500"
                    }
                  >
                    {usernameValid
                      ? "✓ Username format looks good"
                      : "Username must be 3–30 characters."}
                  </p>

                  <p className="text-zinc-500">
                    Availability will be checked after submission.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  disabled={!usernameValid}
                  onClick={next}
                  className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Tell us about yourself</h2>

                <p className="mt-2 text-zinc-600">
                  This information appears on your profile.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Display Name
                  </label>

                  <input
                    value={form.displayName}
                    onChange={(e) => update("displayName", e.target.value)}
                    placeholder="Probal Ghosh"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Bio</label>

                  <textarea
                    rows={4}
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    placeholder="Building open-source products."
                    className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Website
                  </label>

                  <input
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>

                  <input
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="India"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  onClick={next}
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">
                  Upload your profile picture
                </h2>

                <p className="mt-2 text-zinc-600">
                  This helps people recognize you.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-6 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-zinc-300 bg-zinc-100">
                  {form.avatar ? (
                    <img
                      src={form.avatar}
                      alt="Avatar Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-zinc-500">No Image</span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    update("avatar", URL.createObjectURL(file));
                  }}
                />

                <button
                  type="button"
                  onClick={() => update("avatar", "")}
                  className="mt-3 text-sm text-zinc-500 hover:text-black"
                >
                  Skip for now
                </button>
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  onClick={next}
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* STEP 5 */}

          {step === 5 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">Choose your theme</h2>

                <p className="mt-2 text-zinc-600">
                  You can change this anytime.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => update("theme", theme)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      form.theme === theme
                        ? "border-black bg-black text-white"
                        : "hover:border-black"
                    }`}
                  >
                    <h3 className="font-semibold">{theme}</h3>

                    <p className="mt-2 text-sm opacity-80">
                      Preview of the {theme} theme.
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  onClick={next}
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* STEP 6 */}

          {step === 6 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">Connect your socials</h2>

                <p className="mt-2 text-zinc-600">
                  These are optional. You can edit them later.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    GitHub
                  </label>

                  <input
                    value={form.github}
                    onChange={(e) => update("github", e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    LinkedIn
                  </label>

                  <input
                    value={form.linkedin}
                    onChange={(e) => update("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    X (Twitter)
                  </label>

                  <input
                    value={form.x}
                    onChange={(e) => update("x", e.target.value)}
                    placeholder="https://x.com/username"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Instagram
                  </label>

                  <input
                    value={form.instagram}
                    onChange={(e) => update("instagram", e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  onClick={next}
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Review
                </button>
              </div>
            </section>
          )}

          {/* STEP 7 */}

          {step === 7 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold">Review your profile</h2>

                <p className="mt-2 text-zinc-600">
                  Everything looks good! Here's a preview before we publish your
                  profile.
                </p>
              </div>

              <div className="rounded-2xl border bg-zinc-50 p-6">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
                    {form.avatar ? (
                      <img
                        src={form.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {form.displayName || "Your Name"}
                    </h3>

                    <p className="text-zinc-500">@{username}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-zinc-700">{form.bio || "No bio yet."}</p>
                </div>

                <div className="mt-6 rounded-xl bg-white p-4">
                  <p className="text-sm text-zinc-500">Public URL</p>

                  <p className="mt-1 font-medium">oneprofile.app/{username}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase text-zinc-500">Theme</p>

                    <p className="font-medium">{form.theme}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-500">Website</p>

                    <p className="font-medium break-all">
                      {form.website || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={back} className="rounded-xl border px-5 py-3">
                  Back
                </button>

                <button
                  disabled={loading}
                  onClick={finishOnboarding}
                  className="rounded-xl bg-black px-8 py-3 font-medium text-white disabled:opacity-60"
                >
                  {loading ? "Creating Profile..." : "Finish"}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
