import { useNavigate } from "react-router-dom";

export function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .glass-effect {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }
        .soft-glow {
          box-shadow: 0 30px 80px rgba(56, 189, 248, 0.15);
        }
        .floating-card {
          animation: floating 6s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/3 right-16 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-16 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-14">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">Discover BrainLink</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
              Learn how the smartest link wallet helps you organize, share and protect every important connection.
            </h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-slate-800"
          >
            Back to Home
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] mb-16">
          <div className="glass-effect rounded-[2rem] p-10 soft-glow border border-white/10">
            <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-4">Designed for clarity</p>
            <h2 className="text-3xl font-bold mb-5">Everything you need to keep links organized and shareable.</h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-8">
              BrainLink is built as a modern link wallet for creators, teams, and individuals who need a fast, secure way to store important content. It brings link tagging, sharing, and collections together in one polished interface.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Secure storage",
                  description: "Encrypted link collections with private access controls.",
                },
                {
                  title: "Share in one click",
                  description: "Create public share links instantly and copy them to clipboard.",
                },
                {
                  title: "Smart tagging",
                  description: "Organize assets with tags, categories, and rich labels.",
                },
                {
                  title: "Cross-device sync",
                  description: "Access your saved links from desktop, mobile, or tablet.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-2">{item.title}</p>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] glass-effect p-8 border border-white/10">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-80"></div>
            <div className="relative space-y-8">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-6 floating-card">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">How it works</p>
                <ol className="space-y-4 text-slate-300">
                  <li className="flex gap-4 items-start">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">1</span>
                    <div>
                      <p className="font-semibold text-white">Add any link</p>
                      <p className="text-sm text-slate-400">Save videos, documents, tweets, and more with a few clicks.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-300">2</span>
                    <div>
                      <p className="font-semibold text-white">Tag and organize</p>
                      <p className="text-sm text-slate-400">Group content by type, topic, or purpose for instant discovery.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">3</span>
                    <div>
                      <p className="font-semibold text-white">Share with confidence</p>
                      <p className="text-sm text-slate-400">Generate secure share links and copy them instantly.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">Designed for modern workflows</p>
                <div className="space-y-4">
                  {[
                    "Minimal interface with fast access to your saved content.",
                    "Responsive layout for mobile and desktop browsing.",
                    "Clear visual feedback for sharing, selection, and status.",
                  ].map((text) => (
                    <p key={text} className="text-slate-300 leading-relaxed">{text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-3">
          {[
            {
              heading: "Streamlined content flow",
              detail: "Keep all your bookmarks, reference links, and resources in one place without clutter.",
            },
            {
              heading: "Collaborative sharing",
              detail: "Share collections with others while keeping your original workspace private.",
            },
            {
              heading: "Built for creators",
              detail: "Perfect for researchers, educators, and professionals who depend on link curation.",
            },
          ].map((card) => (
            <div key={card.heading} className="glass-effect rounded-[2rem] p-8 border border-white/10 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">{card.heading}</p>
              <p className="text-slate-300 leading-relaxed">{card.detail}</p>
            </div>
          ))}
        </section>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 glass-effect flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70 mb-3">Ready to start?</p>
            <h2 className="text-3xl font-bold">See how BrainLink can simplify your link workflow.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-green-600 hover:to-cyan-600"
            >
              Create an account
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-8 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-slate-800"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
