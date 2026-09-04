import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function PublicProfile({ params }: Props) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      username,
    },
    include: {
      links: {
        where: {
          active: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      socials: {
        orderBy: {
          platform: "asc",
        },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-black">
      <div className="mx-auto max-w-xl">

        {/* Banner */}
        {/* <div className="relative h-48 bg-gradient-to-r from-zinc-900 to-zinc-700">
          {profile.banner && (
            <Image
              src={profile.banner}
              alt={profile.displayName || "Banner"}
              fill
              className="object-cover"
            />
          )}
        </div> */}

        {/* Profile */}
        <div className="mt-16 flex flex-col items-center px-6">
          <Image
            src={profile.avatar || "/avatar.png"}
            alt={profile.displayName || "Avatar"}
            width={120}
            height={120}
            className="rounded-full border-4 border-white bg-white object-cover"
          />

          <h1 className="mt-4 text-3xl font-bold">
            {profile.displayName}
          </h1>

          <p className="text-zinc-500">@{profile.username}</p>

          {profile.bio && (
            <p className="mt-4 max-w-md text-center text-zinc-700">
              {profile.bio}
            </p>
          )}

          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-600 hover:underline"
            >
              {profile.website}
            </a>
          )}
        </div>

        {/* Socials */}
        {profile.socials.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3 px-6">
            {profile.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-zinc-100"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-10 space-y-4 px-6 pb-16">
          {profile.links.length === 0 ? (
            <div className="rounded-xl border bg-white p-8 text-center text-zinc-500">
              No links available.
            </div>
          ) : (
            profile.links.map((link) => (
              <Link
                key={link.id}
                href={`/r/${link.id}`}
                className="block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {link.title}
                    </h2>

                    {link.description && (
                      <p className="mt-1 text-sm text-zinc-500">
                        {link.description}
                      </p>
                    )}
                  </div>

                  <span className="text-xl">→</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pb-8 text-center text-sm text-zinc-400">
          Powered by OneProfile
        </div>
      </div>
    </main>
  );
}