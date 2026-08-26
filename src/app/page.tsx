export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-mono text-zinc-900">
      <main className="flex flex-col w-full min-h-screen items-center justify-center bg-linear-to-br from-white via-zinc-50 to-zinc-700 p-4">
        <div className="flex flex-col gap-6 w-full items-center justify-center text-center">
          
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 pb-2">
              OneProfile
            </h1>
          </div>
          
          <div>
            
            <p className="text-sm md:text-base font-semibold text-zinc-500 uppercase tracking-[0.3em]">
              Coming Soon
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}