import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";

export default async function LinksPage() {
  const { profile } = await requireUserAndProfile();

  const links = await prisma.link.findMany({
    where: {
      profileId: profile.id,
    },
    orderBy: {
      position: "asc",
    },
  });

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

        <Link
          href="/dashboard/links/new"
          className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          + Add Link
        </Link>
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

            <h2 className="text-2xl font-semibold">
              No links yet
            </h2>

            <p className="mt-3 max-w-md text-zinc-500">
              Start building your OneProfile by adding your first
              link.
            </p>

            <Link
              href="/dashboard/links/new"
              className="mt-8 rounded-xl bg-black px-6 py-3 text-white hover:bg-zinc-800"
            >
              Create First Link
            </Link>
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
                    <h3 className="font-semibold">
                      {link.title}
                    </h3>

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

                  <Link
                    href={`/dashboard/links/${link.id}`}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-zinc-100"
                  >
                    Edit
                  </Link>

                  <button className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}