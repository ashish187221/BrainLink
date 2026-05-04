import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreatecontentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { LogoIcon } from '../icons/LogoIcon'
import { SideBar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { useSoonerToast } from '../components/SoonerToastProvider'
import { DeleteModal } from "../components/DeleteModal"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../config";


function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const [filter, setFilter] = useState<
    "all" | "youtube" | "twitter" | "document" | "link" | "tag"
  >("all");

  const [selected, setSelected] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { contents, refresh } = useContent();
  const { showToast } = useSoonerToast();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };


  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          contentId: deleteId
        }
      });

      setDeleteId(null);
      refresh();
      showToast("Deleted successfully", "success"); 

    } catch (err) {
      showToast("Delete failed", "error");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .glass-effect {
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(148, 163, 184, 0.12);
        }
      `}</style>

      <SideBar setFilter={setFilter} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex items-center justify-between gap-4 px-4 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-20 lg:ml-72'>
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/") }>
          <div className='inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700 text-cyan-300'>
            <LogoIcon className='w-6 h-6' />
          </div>
          <div className='text-lg font-semibold text-white'>BrainLink</div>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-sm text-slate-300 whitespace-nowrap'>Hi, {username || "there"}</p>
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className='inline-flex items-center justify-center w-12 h-12 rounded-3xl border border-slate-700 bg-slate-900/90 text-slate-100 lg:hidden'
              aria-label='Toggle menu'
            >
              ☰
            </button>
          )}
        </div>
      </div>

      <div className='p-4 lg:p-6 min-h-screen lg:ml-72 '>
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className='grid gap-6'>
          <div className='glass-effect rounded-4xl p-6 shadow-2xl border border-white/10'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
              <div>
                <p className='text-sm uppercase tracking-[0.3em] text-cyan-300/90 mb-2'>Link Wallet Dashboard</p>
                <h1 className='text-3xl lg:text-4xl font-bold text-white'>Manage your shared links with ease</h1>
                <p className='mt-2 text-slate-400 max-w-2xl'>Quickly review your saved collections, share selected items, and keep all your link wallets organized in one secure place.</p>
              </div>
              <div className='flex gap-3 flex-wrap'>
                <div className='rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center'>
                  <p className='text-sm text-slate-400'>Total links</p>
                  <p className='text-2xl font-semibold text-white'>{contents.length}</p>
                </div>
                <div className='rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center'>
                  <p className='text-sm text-slate-400'>Selected</p>
                  <p className='text-2xl font-semibold text-white'>{selected.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row items-stretch justify-between'>
            <div className='glass-effect rounded-4xl p-5 flex-1 border border-white/10 shadow-xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-400 mb-4'>Quick Actions</p>
              <div className='flex flex-col sm:flex-row gap-4'>
            <Button
              onClick={() => setModalOpen(true)}
              variant='primary'
              text='Add Content'
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={async () => {
                if (!isSelecting) {
                  setIsSelecting(true);
                  return;
                }

                try {
                  if (selected.length === 0) {
                    showToast("Please select at least one item", "warning");
                    return;
                  }

                  const { data } = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { contentIds: selected },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token")
                      }
                    }
                  );

                  const shareUrl = `https://brain-link-rho.vercel.app/share/${data.hash}`;
                  await navigator.clipboard.writeText(shareUrl);

                  showToast("Link copied to clipboard", "success");

                  setIsSelecting(false);
                  setSelected([]);

                } catch (err) {
                  showToast("Error creating share link", "error");
                }
              }}
              variant='secondary'
              text={isSelecting ? "Generate Link" : "Share Selected"}
              startIcon={<ShareIcon />}
            />
          </div>
        </div>
            <div className='glass-effect rounded-4xl p-5 w-full sm:w-72 border border-white/10 shadow-xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-400 mb-4'>Current Filter</p>
              <p className='text-xl font-semibold text-white capitalize'>{filter}</p>
              <p className='mt-3 text-slate-400 text-sm'>Use the sidebar to switch between your content types.</p>
            </div>
          </div>

          <div className='glass-effect rounded-4xl p-6 border border-white/10 shadow-2xl'>
            <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
              <div>
                <p className='text-sm uppercase tracking-[0.3em] text-slate-400 mb-2'>Saved Content</p>
                <h2 className='text-2xl font-bold text-white'>Your links and collections</h2>
              </div>
              <p className='text-slate-400'>Showing {contents.filter((item: any) => filter === 'all' ? true : item.type === filter).length} items</p>
            </div>
            <div className='flex flex-wrap gap-6'>
              {contents
                .filter((item: any) => {
                  if (filter === "all") return true;
                  return item.type === filter;
                })
                .map(({ _id, type, link, title }: any) => (
                  <Card
                    key={_id}
                    id={_id}
                    type={type}
                    link={link}
                    title={title}
                    selected={selected.includes(_id)}
                    onSelect={(id: string) => {
                      if (!isSelecting) return;

                      setSelected((prev) =>
                        prev.includes(id)
                          ? prev.filter((x) => x !== id)
                          : [...prev, id]
                      );
                    }}
                    onDelete={handleDeleteClick} 
                  />
                ))}
            </div>
          </div>
          <DeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;