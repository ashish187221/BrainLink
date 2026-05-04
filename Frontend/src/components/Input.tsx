
interface InputProps {
    placeholder: string;
    type?: string;
    ref?: any;
}

export function Input({ placeholder, type = "text", ref }: InputProps) {
    return (
        <div className="w-full">
            <input
                ref={ref}
                placeholder={placeholder}
                type={type}
                className="w-full px-4 py-3 border border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
            />
        </div>
    );
}

