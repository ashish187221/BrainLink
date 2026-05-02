import type { ReactElement } from "react";

interface ButtonProps{
    variant : "primary" | "secondary",
    text : string;
    startIcon? :  ReactElement;
    onClick?: () => void;
    fullWidth ?: boolean;
    loading ? : boolean
}
const variantClasses = {
    "primary": "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white border border-transparent shadow-lg shadow-fuchsia-500/20 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400",
    "secondary": "bg-slate-900/90 text-slate-100 border border-slate-700 shadow-sm shadow-slate-950/30 hover:bg-slate-800/95"
}
const defaultStyles = "px-4 py-2 rounded-2xl font-medium flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 focus:ring-offset-2 focus:ring-offset-slate-950";
export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading
}: ButtonProps) {

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={
        `${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full justify-center" : ""} ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`
      }
    >
      {!loading && startIcon && (
        <div className="pr-2 flex items-center">
          {startIcon}
        </div>
      )}

      {loading ? "Loading..." : text}
    </button>
  );
}