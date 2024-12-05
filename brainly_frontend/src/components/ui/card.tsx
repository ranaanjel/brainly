import { YtIcon } from "../icons/yt"
import { TweetIcon } from "../icons/tweet"
import { DocIcons } from "../icons/doc"
import {  Link} from "react-router-dom"
import { LinkIcon } from "../icons/links"
import { DeleteIcons } from "../icons/delete"
import { SkeletonDiv } from "./loadingState"
import { ReactElement, Suspense, lazy, ComponentType, useState } from "react"
import TWEmbed from "./TwitterEmbed"

interface cardProps{
    title:string,
    link: string,
    tag?:string[],
    date?:Date,
    type:"yt"| "docs"| "tw"
}

const iconsVariants = {
    "yt":<YtIcon/>,
    "tw":<TweetIcon/>,
    "docs":<DocIcons/>,

}

export  function Card(props:cardProps) {

    let pattern = /watch\?v=/ ;
  
   const LazyYT = lazy(() => import("./YTEmbed"))


    return <div className="bg-white shadow-md rounded-md border border-gray-300 w-96 h-96 min-w-64 p-4 hover:shadow-2xl">
        <div className="flex items-center justify-between ">
            {/* //title - two child -  */}
            <div className="flex gap-3 font-serif items-center text-slate-700">
                <span className="text-slate-500">
                    {iconsVariants[props.type]}
                </span>
                <span className="text-xl font-thin max-w-64 overflow-ellipsis overflow-hidden whitespace-nowrap ">
                    {props.title}
                </span>
                
            </div>
            <div className="flex gap-2 items-center text-slate-400 text-xs">
                    <Link to={props.link}>
                        <span onClick={function () {
                            //console.log(props.link, "clicked clicked")
                        }} className="cursor-pointer">
                    <LinkIcon/>
                </span>
                    </Link>
                
                <span className="cursor-pointer">
                    <DeleteIcons/>
                </span>
            </div>
        </div>
        <div className="w-full my-4 max-h-64 overflow-hidden">
            {/* embedding the twitter, video depending on the link - conditional rendering*/} 

            {
                props.type == "yt" &&  <Suspense fallback={<SkeletonDiv/>}>
                    <LazyYT link={props.link.replace(pattern, "embed/")} /> 
                    
                </Suspense>
            }
            {
                props.type == "tw" && <TWEmbed link={props.link}/>
            }
            {
                props.type == "docs" && <p>{props.title}
                <br/>
                {props.type}
                    <SkeletonDiv/>
                </p>
            }

        </div>
        <div>
            {/*adding tags */}
        </div>
        <div className="text-sm text-gray-400 mt-2">
            {/* added on which date */}
            Added on {"..."}

        </div>
    </div>
} 
