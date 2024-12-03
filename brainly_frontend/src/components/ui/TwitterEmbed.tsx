import { Children, MutableRefObject, ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { SkeletonDiv } from "./loadingState";
import React from "react";

export default function TWEmbed(props:{link:string}) {

    const reference:MutableRefObject<HTMLDivElement | null >= useRef(null);
    const value:MutableRefObject<ReactElement | null >= useRef(null)

    const [state, setState] = useState(false);

    useEffect(function(){
        const observer = new MutationObserver(function(mutationList){ 
            console.log(reference.current)
            setState(true)
            console.log("after")
            let text = reference.current?.textContent as string;
            value.current = React.createElement("div",null, text ) ;
            
        })
        observer.observe(reference.current as Node, {childList:true});
        //return observer.disconnect()
    },[])

    if(!state) {
        console.log(state)
        return <div ref={reference} >
                    {!state && <SkeletonDiv/> }
                    <blockquote className="twitter-tweet hidden"> 
                    <a href={props.link}></a> </blockquote>
                </div>
    }
    console.log(reference)
    return <div>
        {value.current}
    </div>

}
