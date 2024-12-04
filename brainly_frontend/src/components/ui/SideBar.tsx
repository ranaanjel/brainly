import { ReactElement } from "react";
import brainlyLogo from "../../assets/brain.png"
import { YtIcon } from "../icons/yt";
import { TweetIcon } from "../icons/tweet";
import { DocIcons } from "../icons/doc";
import { LinkIcon } from "../icons/links";
import { TagIcon } from "../icons/tags";

export function Sidebar() {
    return <div className="h-screen min-w-48 border-r border-opacity-60 border-gray-500 bg-white top-0 left-0 z-10 p-4 overscroll-contain">
       <SideBarItems variant="header" text="Second Brain" startIcon={brainlyLogo}/>
       <SideBarItems variant="item" text="Tweets" startIcon={<TweetIcon/>}/>
       <SideBarItems variant="item" text="Videos" startIcon={<YtIcon/>}/>
       <SideBarItems variant="item" text="Documents" startIcon={<DocIcons/>}/>
       <SideBarItems variant="item" text="Links" startIcon={<LinkIcon/>}/>
       <SideBarItems variant="item" text="Tags" startIcon={<TagIcon/>}/>
    </div>
}

function SideBarItems({text, startIcon, variant}:{text:string, startIcon:ReactElement | string, variant: "header" | "item" }) {

    return <div >
        {variant == "header"&& <div className="flex gap-2 items-center mb-6"> 
                <img src={startIcon as string} alt="logo" className="size-8" />
               <div className="font-semibold">
                {text}
               </div>
             </div>}
        {variant == "item"&& <div className="text-gray-700 flex gap-2 mb-3 items-center px-2 hover:shadow-md py-2 cursor-pointer select-none"> 
                <div className="w-8">
                    {startIcon}
                </div>
                {text}
             </div>}
    </div>
}