import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link2, GripVertical, Pencil, Trash2, BarChart3, ExternalLink } from "lucide-react";
import { Link as DBLink } from "@prisma/client";

interface SortableLinkItemProps {
  link: DBLink;
  onEdit: (link: DBLink) => void;
  onDelete: (link: DBLink) => void;
}

export function SortableLinkItem({ link, onEdit, onDelete }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" : undefined,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 10 : 1,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex flex-col gap-4 p-5 transition-colors bg-white hover:bg-[#fafafa]/50 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-start gap-3.5">
        <div
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab p-0.5 text-[#d8d5ce] transition-colors hover:text-[#6b6b6b] active:cursor-grabbing hover:bg-[#f0f0f0] rounded touch-none flex items-center justify-center shrink-0"
        >
          <GripVertical className="size-4.5" />
        </div>
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fafafa] border border-[#f0f0f0] text-[#1a1a1a] transition-colors group-hover:bg-[#f0f0f0]/70">
          <Link2 className="size-4.5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="font-semibold text-[#1a1a1a] truncate">
              {link.title}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                link.active
                  ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                  : "bg-[#fafafa] text-[#b4b0a4] ring-1 ring-[#e5e2dc]"
              }`}
            >
              {link.active ? "Active" : "Hidden"}
            </span>
          </div>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => isDragging && e.preventDefault()}
            className="mt-0.5 block truncate text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            {link.url}
          </a>
          {link.description && (
            <p className="mt-1 text-sm text-[#b4b0a4] line-clamp-1">
              {link.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pl-9 md:pl-0">
        <span className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-600 ring-1 ring-violet-100">
          <BarChart3 className="size-3" />
          {link.clicks}
        </span>
        <button
          onClick={() => onEdit(link)}
          className="flex items-center gap-1.5 rounded-xl border border-[#e5e2dc] px-3.5 py-2 text-xs font-medium text-[#1a1a1a] transition-all hover:bg-[#fafafa] hover:border-[#d8d5ce] active:scale-[0.98]"
        >
          <Pencil className="size-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete(link)}
          className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300 active:scale-[0.98]"
        >
          <Trash2 className="size-3" />
          Delete
        </button>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => isDragging && e.preventDefault()}
          className="rounded-xl p-2 text-[#d8d5ce] opacity-0 transition-all group-hover:opacity-100 hover:text-[#1a1a1a] hover:bg-[#fafafa] hidden md:block"
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
