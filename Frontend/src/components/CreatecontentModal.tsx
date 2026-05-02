import { CrossIcon } from "../icons/CrossIcon";
import { Button } from '../components/Button'
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSoonerToast } from "../components/SoonerToastProvider";


const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Document: "document",
  Link: "link",
  Tag: "tag"
} as const;

interface CreateContentModalProps {
    open: boolean;
    onClose?: () => void;
}
export function CreateContentModal({open , onClose} : CreateContentModalProps){

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    type ContentType = (typeof ContentType)[keyof typeof ContentType];
    const [type ,setType] = useState<ContentType>(ContentType.Youtube)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { showToast } = useSoonerToast();

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value

        if (!title || !link) {
        showToast("Please fill all fields", "warning");
        return;
        }

        try{
        
            setLoading(true)
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        },{
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        });
        setSuccess(true);

        setTimeout(() => {
            onClose?.();
            setLoading(false);
            setSuccess(false);
        }, 800);
        
    } catch(e){
        showToast("Error adding content", "error");

        }


}


return <div>
  {open && (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-lg flex justify-center items-center px-4 py-8">
      <div className="max-w-2xl w-full rounded-4xl border border-slate-700/70 p-8 shadow-2xl text-slate-100 bg-slate-950/90 backdrop-blur-xl">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="justify-center items-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Add new content</p>
            <h2 className="text-3xl font-bold text-white">Create a link wallet item</h2>
          </div>
          <div onClick={onClose} className="rounded-full bg-slate-900/80 p-3 cursor-pointer transition hover:bg-slate-800 text-slate-300 hover:text-white">
            <CrossIcon />
          </div>
        </div>

        <div className="grid gap-4 mb-6 justify-center items-center">
          <Input ref={titleRef} placeholder="Enter title" />
          <Input ref={linkRef} placeholder="Enter link" />
        </div>

        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-5 flex justify-center items-center">Content type</p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Button 
              text="Youtube" 
              variant={type === ContentType.Youtube ? "primary" : "secondary"} 
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button 
              text="Twitter" 
              variant={type === ContentType.Twitter ? "primary" : "secondary"} 
              onClick={() => setType(ContentType.Twitter)}
            />
            <Button 
              text="Document" 
              onClick={() => setType(ContentType.Document)} 
              variant={type === ContentType.Document ? "primary" : "secondary"} 
            />
            <Button 
              text="Link" 
              onClick={() => setType(ContentType.Link)} 
              variant={type === ContentType.Link ? "primary" : "secondary"} 
            />
            <Button 
              text="Tag" 
              onClick={() => setType(ContentType.Tag)} 
              variant={type === ContentType.Tag ? "primary" : "secondary"} 
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={addContent} 
            variant="primary" 
            text={
              success 
                ? "Submitted" 
                : loading 
                ? "Submitting..." 
                : "Submit"
            } 
          />
        </div>
      </div>
    </div>
  )}
</div>
}
