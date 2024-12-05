import { Children, MutableRefObject, ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { SkeletonDiv } from "./loadingState";
import React from "react";

// declare global  {
//     interface window {
//         twttr : any
//     }
// }

export default function TWEmbed(props:{link:string}) {

     const reference:MutableRefObject<ReactElement | null >= useRef(null);
    

    const [state, setState] = useState(false);

    function callingWidget() {
        ((window as any).twttr.widgets.load())
        return null;
    }

    useEffect(function () {
        
        const scriptLoad = document.querySelector("script[async]")

        console.log( scriptLoad, "running again --")
        if(state) {
            console.log("true state - remove the element")
            //@ts-ignore
            window.twttr.widgets.load()
            return;
        }
         if(scriptLoad) {
            console.log("adding the element")
             reference.current = React.createElement("blockquote",{className : "twitter-tweet"} , React.createElement("a",{href:props.link}))
             
            setState(true)
        }else {
            console.log("not found the reference to script")
        }

    },[])
    
    if(!state) {
        return <div  >
                    <SkeletonDiv/> 
                </div>
    }
    return <div>
      {reference.current}
      {((window as any).twttr && (window as any).twttr.widgets) ?
            callingWidget() : ""
        
        }
    </div>

}
