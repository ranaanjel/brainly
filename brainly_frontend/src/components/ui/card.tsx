import { YtIcon } from "../icons/yt"
import { TweetIcon } from "../icons/tweet"
import { DocIcons } from "../icons/doc"
import {  Link} from "react-router-dom"
import { LinkIcon } from "../icons/links"
import { DeleteIcons } from "../icons/delete"
import { SkeletonDiv } from "./loadingState"
import { ReactElement, Suspense, lazy, ComponentType, useState } from "react"
import TWEmbed from "./TwitterEmbed"
import { UnknownIcon } from "../icons/question"

export interface cardProps{
    title:string,
    link: string,
    tag?:{title:string}[],
    date?:Date,
    type:"yt"| "docs"| "tw"| "unknown",
    contentId:string;
    deleteHandler:() => void;
}

const iconsVariants = {
    "yt":<YtIcon/>,
    "tw":<TweetIcon/>,
    "docs":<DocIcons/>,
    "unknown": <UnknownIcon/>

}

export  function Card(props:cardProps) {

    let pattern = /watch\?v=/ ;
  
   const LazyYT = lazy(() => import("./YTEmbed"))

    console.log(props.type)
    return <div className="bg-white shadow-md rounded-md border border-gray-300 w-96 h-[392px] min-w-64 p-4 hover:shadow-2xl">
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
                
                <span className="cursor-pointer" data-contentId={props.contentId} onClick={props.deleteHandler}>
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
                Document Article, please link the link icon to read more on it.
                </p>
            }
             {
                props.type == "unknown" && <p>{props.title}
                <br/>
                type is unkown
                </p>
            }

        </div>
        <div>
            {/*adding tags */}
            {props.tag?.map(item => {
                const hashValue = item.title;
                return <span className="rounded-lg bg-purple-600 text-white py-1 px-2 m-1">
                    #{hashValue}
                </span>
            })}
        </div>
        <div className="text-sm text-gray-400 mt-2 mb-2 ">
            {/* added on which date */}
            Refetched on { (new Date()).toString().split(" ").slice(1,4).join(" ")} 
            {/*not adding in the database - just current additional to the page*/}

        </div>
    </div>
} 
