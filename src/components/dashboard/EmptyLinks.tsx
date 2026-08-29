export default function EmptyLinks() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full">
      <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">No links yet</h3>
      <p className="text-zinc-500 max-w-sm mb-8 text-sm">
        Start building your profile by adding your first link. Share your portfolio, social profiles, or latest content.
      </p>
      <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Your First Link
      </button>
    </div>
  );
}