import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useSoonerToast } from "../components/SoonerToastProvider";

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function SharePage() {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { showToast } = useSoonerToast();
  const [contents, setContents] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`)
      .then((res) => {
        setContents(res.data.content || []);
        setUsername(res.data.username || null);
      })
      .catch(() => {
        showToast("Invalid share link", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hash]);

  const ownerLabel = username ? `${username}'s Brain Link` : "Shared Brain Link";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <style>{`
        .glass-effect {
          background: rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(148, 163, 184, 0.16);
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/4 right-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-16 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">Shared link collection</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{ownerLabel}</h1>
            <p className="mt-5 text-slate-300 text-lg">This collection was shared with you.</p>
          </div>
          <button onClick={() => navigate("/")} className="rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100">Back Home</button>
        </div>

        {loading ? (
          <div className="glass-effect rounded-2xl p-10 text-center text-slate-300">Loading...</div>
        ) : contents.length === 0 ? (
          <div className="glass-effect rounded-2xl p-10 text-center text-slate-300">No items found</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {contents.map((item: any) => (
              <div key={item._id || item.link} className="glass-effect rounded-2xl border border-white/10 p-6 hover:-translate-y-2 transition">
                <p className="text-xs uppercase text-slate-400 mb-2">{item.type}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{item.link}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full block text-center rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">Open</a>
                {item.type === "youtube" && <div className="mt-4 rounded-lg overflow-hidden"><iframe className="w-full aspect-video" src={getYouTubeEmbedUrl(item.link)} allowFullScreen></iframe></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
