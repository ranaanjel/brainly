import { Children, MutableRefObject, ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { SkeletonDiv } from "./loadingState";
import React from "react";

export default function TWEmbed(props:{link:string}) {

     const reference:MutableRefObject<ReactElement | null >= useRef(null);
     const [element, setElement] = useState<ReactElement>(React.createElement("div", null, "hello world"))
    

    const [state, setState] = useState(false);

    function callingWidget() {
        ((window as any).twttr.widgets.load())
        console.log(reference.current, "current value")
        console.log(element)
        console.log(document.querySelector(".twitter"))
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
        reference.current = React.createElement("blockquote",{className : "twitter-tweet"} , React.createElement("a",{href: props.link.replace("x", "twitter")}))
        setState(true)

        console.log(reference.current)
        setElement(reference.current)

    },[])
    
    if(!state) {
        return <div  >
                    <SkeletonDiv/> 
                    
                </div>
    }
    return <div className="twitter">
      {element}

      {((window as any).twttr && (window as any).twttr.widgets) ?
            callingWidget() : ""
        }
    </div>

}
