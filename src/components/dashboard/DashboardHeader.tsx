"use client";

interface Profile {
  displayName: string;
  username: string;
  avatar: string;
}

export default function DashboardHeader({ profile }: { profile: Profile }) {
  const profileUrl = `oneprofile.me/${profile.username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${profileUrl}`);
    // Ideally add a toast notification here
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Welcome back, {profile.displayName.split(" ")[0]}
        </h1>
        <p className="text-zinc-500 mt-1">Manage your profile and links.</p>
      </div>
      
      <div className="bg-white border border-zinc-200/80 p-4 rounded-3xl shadow-sm flex items-center gap-4">
        <img 
          src={profile.avatar} 
          alt={profile.displayName} 
          className="w-12 h-12 rounded-full border border-zinc-100 bg-zinc-50" 
        />
        <div className="flex-1 pr-4">
          <div className="font-medium text-zinc-900">{profile.displayName}</div>
          <div className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
            {profileUrl}
          </div>
        </div>
        <div className="flex items-center gap-2 pl-4 border-l border-zinc-100">
          <button 
            onClick={copyUrl}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all"
            aria-label="Copy URL"
            title="Copy URL"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
          <a 
            href={`https://${profileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            Visit Profile
          </a>
        </div>
      </div>
    </div>
  );
}