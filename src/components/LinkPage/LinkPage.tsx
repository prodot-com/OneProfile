"use client";

import { useState, useCallback } from "react";
import { Link, SocialLink } from "@prisma/client";
import {
  Link2,
  GripVertical,
  Search,
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  ExternalLink,
  Eye,
  X,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AddLinkModal, DeleteLinkModal, EditLinkModal } from "./LinkModals";
import SocialSection from "./SocialSection";
import PhonePreview from "./PhonePreview";
import { SortableLinkItem } from "./SortableLinkItem";

interface PreviewProfile {
  displayName: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  website: string | null;
  theme?: any;
  accentColor?: string;
  backgroundColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonStyle?: any;
  fontFamily?: any;
}

interface LinksProps {
  links: Link[];
  socials: SocialLink[];
  profile: PreviewProfile;
}

export default function LinksPage({
  links: initialLinks,
  socials: initialSocials,
  profile,
}: LinksProps) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);

      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);

      try {
        const orderUpdates = newLinks.map((link, index) => ({
          id: link.id,
          position: index,
        }));

        const res = await fetch("/api/links/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ links: orderUpdates }),
        });

        if (!res.ok) {
          throw new Error("Failed to reorder links");
        }
      } catch (error) {
        console.error("Error reordering links:", error);
      }
    }
  };

  const handleLinkAdded = useCallback((newLink: Link) => {
    setLinks((prev) => [...prev, newLink]);
  }, []);

  const handleLinkUpdated = useCallback((updated: Link) => {
    setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }, []);

  const handleLinkDeleted = useCallback((deletedId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== deletedId));
  }, []);

  const handleSocialsChanged = useCallback((newSocials: SocialLink[]) => {
    setSocials(newSocials);
  }, []);

  return (
    <div className="flex-1 w-full h-full min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:overflow-hidden relative">
      <section className="hide-scrollbar py-8 space-y-8 min-w-0 lg:min-h-0 lg:overflow-y-auto lg:h-full lg:pr-4">
        <SocialSection socials={socials} onUpdate={handleSocialsChanged} />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Links
              </h1>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
                {links.length}
              </span>
            </div>
            <p className="mt-1.5 text-zinc-500">
              Manage the links displayed on your public profile.
            </p>
          </div>

          <button
            onClick={() => setAddModal(true)}
            className="group flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/10"
          >
            <Plus className="size-4 transition-transform group-hover:rotate-90" />
            Add Link
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
          />
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden pb-16 lg:pb-0">
          {filteredLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-zinc-100">
                <Link2 className="size-6 text-zinc-400" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900">
                {searchTerm ? "No links match your search" : "No links yet"}
              </h2>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Start building your OneProfile by adding your first link."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setAddModal(true)}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="size-4" />
                  Create First Link
                </button>
              )}
            </div>
          ) : (
            <DndContext
              id="links-dnd-context"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="divide-y divide-zinc-100">
                <SortableContext
                  items={filteredLinks.map((l) => l.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredLinks.map((link) => (
                    <SortableLinkItem
                      key={link.id}
                      link={link}
                      onEdit={(l) => {
                        setSelectedLink(l);
                        setEditModal(true);
                      }}
                      onDelete={(l) => {
                        setSelectedLink(l);
                        setDeleteModal(true);
                      }}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          )}
        </div>

        <EditLinkModal
          open={editModal}
          link={selectedLink}
          onClose={() => {
            setEditModal(false);
            setSelectedLink(null);
          }}
          onSuccess={handleLinkUpdated}
        />

        <DeleteLinkModal
          open={deleteModal}
          link={selectedLink}
          onClose={() => {
            setDeleteModal(false);
            setSelectedLink(null);
          }}
          onSuccess={handleLinkDeleted}
        />

        <AddLinkModal
          open={addModal}
          onClose={() => setAddModal(false)}
          onSuccess={handleLinkAdded}
        />
      </section>

      {/* Floating Preview Button for Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-40">
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="flex items-center gap-2 rounded-full bg-zinc-900/90 backdrop-blur-md px-6 py-3 text-sm font-bold tracking-wide text-white shadow-xl shadow-zinc-900/20 active:scale-95 transition-all"
        >
          {showMobilePreview ? (
            <>
              <X className="size-4" />
              Close Preview 
            </>
          ) : (
            <>
              <Eye className="size-4" />
              Preview
            </>
          )}
        </button>
      </div>

      {/* Mobile Preview Overlay */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-30 bg-zinc-50/95 backdrop-blur-sm lg:hidden flex flex-col items-center pt-24 overflow-y-auto">
           <PhonePreview profile={profile} links={links} socials={socials} />
           <div className="h-32" />{/* padding to avoid button overlap */}
        </div>
      )}

      {/* Right: Phone Preview (Desktop) */}
      <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-start lg:overflow-hidden">
        <PhonePreview profile={profile} links={links} socials={socials} />
      </div>
    </div>
  );
}
