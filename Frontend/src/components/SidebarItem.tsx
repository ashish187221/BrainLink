import type { ReactElement } from "react";

export function SideBarItem({ text, icon }: {
    text: string;
    icon?: ReactElement;
}) {
    return (
        <div className="flex text-slate-200 py-3 px-3 cursor-pointer hover:bg-slate-800 rounded-3xl max-w-48 items-center gap-3 duration-150">
            {icon && (
                <div className="text-cyan-300">
                    {icon}
                </div>
            )}
            <div>
                {text}
            </div>
        </div>
    );
}