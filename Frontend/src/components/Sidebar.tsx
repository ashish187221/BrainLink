import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LogoIcon } from "../icons/LogoIcon";
import { SideBarItem } from "./SidebarItem";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagsIcon } from "../icons/TagsIcon";
import { useNavigate } from "react-router-dom";

export function SideBar({
  setFilter,
  isOpen,
  onClose,
}: {
  setFilter: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const handleClick = (filterType: string) => {
    setFilter(filterType);
    onClose();
  };

  const navigate=useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-slate-950/70 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-slate-950 text-slate-100 border-r border-slate-800 shadow-xl flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl cursor-pointer" onClick={()=>{navigate('/')}}>
              <div className="text-cyan-400 size-10">
                <LogoIcon/>
              </div>
              <span className="font-semibold tracking-wide ">BrainLink</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-slate-300 hover:text-white transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-base">
            <button
              onClick={() => handleClick("all")}
              className="text-left"
            >
              <SideBarItem text="All" icon={<DocumentIcon />} />
            </button>
            <button
              onClick={() => handleClick("twitter")}
              className="text-left"
            >
              <SideBarItem text="Twitter" icon={<TwitterIcon />} />
            </button>
            <button
              onClick={() => handleClick("youtube")}
              className="text-left"
            >
              <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
            </button>
            <button
              onClick={() => handleClick("document")}
              className="text-left"
            >
              <SideBarItem text="Documents" icon={<DocumentIcon />} />
            </button>
            <button
              onClick={() => handleClick("link")}
              className="text-left"
            >
              <SideBarItem text="Links" icon={<LinkIcon />} />
            </button>
            <button
              onClick={() => handleClick("tag")}
              className="text-left"
            >
              <SideBarItem text="Tags" icon={<TagsIcon />} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-3xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <span className="text-2xl">⎋</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
