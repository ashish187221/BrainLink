import { useNavigate } from "react-router-dom";
import { TwitterIcon } from "../icons/TwitterIcon";

export function LandingPage() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(168, 85, 247, 0.3); }
          50% { text-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-glow {
          position: relative;
          transition: all 0.3s ease;
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>


      <nav className="relative z-50 px-6 py-4 sm:px-12 border-b border-slate-800 glass-effect sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 animate-slideInLeft">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold">
              BL
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              BrainLink
            </div>
          </div>
          <div className="flex gap-4 animate-slideInRight">
            <button
              onClick={() => navigate("/signin")}
              className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors duration-300 whitespace-nowrap"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg hover:from-green-600 hover:to-cyan-600 font-medium transition-all duration-300 btn-glow whitespace-nowrap"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      
      <section className="relative z-10 px-4 sm:px-12 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="animate-slideInLeft">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full text-sm text-green-300 border border-green-500/30 mb-4">
                  ✨ Organize Smarter
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Smart{" "}
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-glow">
                  Link Wallet
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Organize, share, and manage all your important links in one secure place. 
                Create shareable link collections and collaborate seamlessly with your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleTryNow}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg hover:from-green-600 hover:to-cyan-600 text-lg font-semibold shadow-lg btn-glow flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <span>🚀 Try Now</span>
                </button>
                <button
                  onClick={() => navigate("/learn-more")}
                  className="px-8 py-4 glass-effect text-white rounded-lg hover:bg-white/10 text-lg font-semibold transition-all duration-300 border border-slate-700 hover:border-slate-600"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="flex justify-center animate-slideInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative glass-effect rounded-3xl p-8 w-full max-w-sm space-y-4">
                  {[
                    { icon: "🔗", title: "My Links", count: "245 links" },
                    { icon: "📤", title: "Shared Collections", count: "12 shared" },
                    { icon: "🏷️", title: "Tagged Content", count: "89 tags" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-float"
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="text-sm text-slate-400">{item.count}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-12 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400">Everything you need to manage links efficiently</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔐",
                title: "Secure & Private",
                description: "Your links are encrypted and stored safely in the cloud",
              },
              {
                icon: "🎯",
                title: "Smart Organization",
                description: "Auto-categorize and tag your links for easy discovery",
              },
              {
                icon: "👥",
                title: "Easy Sharing",
                description: "Share collections with one click, control access levels",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="relative z-10 border-t border-slate-800 glass-effect px-4 sm:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">About Us</h3>
              <p className="text-slate-400 leading-relaxed">
                BrainLink is your ultimate link management solution. Organize, share, and discover links effortlessly with a secure and intuitive platform. Designed for individuals and growing teams who value efficiency and seamless organization.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Connect With Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://x.com/ashishrana6065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 min-h-[56px] rounded-2xl border border-slate-700 bg-white/5 px-4 py-3 text-slate-300 hover:border-cyan-400/40 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <TwitterIcon />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://github.com/ashish187221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 min-h-[56px] rounded-2xl border border-slate-700 bg-white/5 px-4 py-3 text-slate-300 hover:border-cyan-400/40 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/ranaashish85/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 min-h-[56px] rounded-2xl border border-slate-700 bg-white/5 px-4 py-3 text-slate-300 hover:border-cyan-400/40 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.609.007 6.298.037 4.987.067 4.114.134 3.34.26c-.772.126-1.45.294-2.122.59C.547.946.294 1.618.12 2.39c-.126.772-.193 1.645-.223 2.956C-.007 6.659 0 7.446 0 11.067s-.007 4.408.037 5.719c.03 1.311.097 2.184.223 2.956.174.772.427 1.444.99 2.116.672.296 1.35.464 2.122.59.772.126 1.645.193 2.956.223C7.609 23.993 8.396 24 12.017 24s4.408-.007 5.719-.037c1.311-.03 2.184-.097 2.956-.223.772-.126 1.45-.294 2.122-.59.563-.672.816-1.344.99-2.116.126-.772.193-1.645.223-2.956C23.993 15.475 24 14.688 24 11.067s.007-4.408-.037-5.719c-.03-1.311-.097-2.184-.223-2.956-.174-.772-.427-1.444-.99-2.116C22.547.294 21.869.126 21.097 0c-.772-.126-1.645-.193-2.956-.223C16.408.007 15.621 0 12.017 0zm0 2.163c3.574 0 4.005.014 5.417.08.688.033 1.063.146 1.31.242.32.124.554.272.79.508.236.236.384.47.508.79.096.247.209.622.242 1.31.066 1.412.08 1.843.08 5.417s-.014 4.005-.08 5.417c-.033.688-.146 1.063-.242 1.31-.124.32-.272.554-.508.79-.236.236-.47.384-.79.508-.247.096-.622.209-1.31.242-1.412.066-1.843.08-5.417.08s-4.005-.014-5.417-.08c-.688-.033-1.063-.146-1.31-.242-.32-.124-.554-.272-.79-.508-.236-.236-.384-.47-.508-.79-.096-.247-.209-.622-.242-1.31C2.177 15.472 2.163 15.041 2.163 11.467s.014-4.005.08-5.417c.033-.688.146-1.063.242-1.31.124-.32.272-.554.508-.79.236-.236.47-.384.79-.508.247-.096.622-.209 1.31-.242 1.412-.066 1.843-.08 5.417-.08zm0 3.836c-3.654 0-6.621 2.967-6.621 6.621s2.967 6.621 6.621 6.621 6.621-2.967 6.621-6.621-2.967-6.621-6.621-6.621zm0 10.904c-2.376 0-4.283-1.907-4.283-4.283s1.907-4.283 4.283-4.283 4.283 1.907 4.283 4.283-1.907 4.283-4.283 4.283zm8.472-11.36c-.85 0-1.538-.688-1.538-1.538s.688-1.538 1.538-1.538 1.538.688 1.538 1.538-.688 1.538-1.538 1.538z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ashish-rana-2170a5305/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 min-h-[56px] rounded-2xl border border-slate-700 bg-white/5 px-4 py-3 text-slate-300 hover:border-cyan-400/40 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-500">
            <p>&copy; 2026 BrainLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
