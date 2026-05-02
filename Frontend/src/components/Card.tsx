
import { DeleteIcon } from '../icons/DeleteIcon';
import { GlobeIcon } from '../icons/GlobeIcon';



interface CardProps {
    id: string;    
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document" | "link" | "tag";
    selected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;   
}


function getYouTubeEmbedUrl(url: string) {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname.includes("youtube.com")) {
            const videoId = parsedUrl.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
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

export function Card({id, title, link, type , selected , onSelect , onDelete}: CardProps) {
    return (
        <div>
            <div onClick={() => onSelect(id)}
            className={`p-5 rounded-3xl border shadow-2xl max-w-72 min-w-72 min-h-48 cursor-pointer
            ${selected ? "border-cyan-400" : "border-slate-700 bg-slate-900/90"}`}>
                
                <div className="flex justify-between items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                          {title}
                      </p>
                      <p className="text-xs text-slate-400 uppercase mt-1">{type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                            }}
                            className=" hover:text-gray-600 cursor-pointer"
                        >
                            <DeleteIcon/>
                        </div >
                          <div className='hover:text-gray-600'>
                            <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()
                            }
                      >
                          <GlobeIcon />
                      </a>
                      </div>
                    </div>
                </div>

                <div className='pt-4'>
                    {type === "youtube" && (
                        <iframe
                            className='w-full h-48 rounded'
                            src={getYouTubeEmbedUrl(link)}
                        />
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}

                    {type === "document" &&
                    <p>Document Link</p>}
                    
                    {type === "link" && 
                    <a href={link}>Open Link
                    </a>}

                    {type === "tag" && 
                    <p>{title}</p>}
                </div>

            </div>
        </div>
    );
}