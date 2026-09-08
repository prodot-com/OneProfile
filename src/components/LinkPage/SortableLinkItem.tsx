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
      className="group flex flex-col gap-4 p-5 transition-colors bg-white hover:bg-zinc-50/50 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-start gap-3.5">
        <div
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab p-0.5 text-zinc-300 transition-colors hover:text-zinc-500 active:cursor-grabbing hover:bg-zinc-100 rounded touch-none flex items-center justify-center shrink-0"
        >
          <GripVertical className="size-4.5" />
        </div>
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-200/70">
          <Link2 className="size-4.5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="font-semibold text-zinc-900 truncate">
              {link.title}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                link.active
                  ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                  : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
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
            className="mt-0.5 block truncate text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            {link.url}
          </a>
          {link.description && (
            <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
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
          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300"
        >
          <Pencil className="size-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete(link)}
          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 hover:border-red-300"
        >
          <Trash2 className="size-3" />
          Delete
        </button>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => isDragging && e.preventDefault()}
          className="rounded-lg p-1.5 text-zinc-300 opacity-0 transition-all group-hover:opacity-100 hover:text-zinc-600 hover:bg-zinc-100 hidden md:block"
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
