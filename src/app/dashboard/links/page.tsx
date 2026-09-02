import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import LinksPage from "@/components/LinkPage/Link";

export default async function Page() {
  const { profile } = await requireUserAndProfile();

  const links = await prisma.link.findMany({
    where: {
      profileId: profile.id,
    },
    orderBy: {
      position: "asc",
    },
  });

  return <LinksPage links={links} />;
}
