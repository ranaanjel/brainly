import { CloseIcon } from "../icons/close"
import { Button } from "./Button"
import axios from "axios";
import { backendURL, brainShareLink, brainShareURL, userContentURL } from "../../config";
import { ClipboarIcon } from "../icons/clipboard";
import { useRef, useState } from "react";

interface AddModalProps {
    open:boolean,
    onClose?:() => void,
}

export function ShareModal({open, onClose }:AddModalProps) {

        let urlReference= useRef<string>(backendURL+brainShareURL);
        const [stateURL, setStateURL] = useState(urlReference.current)


        const jwt = localStorage.getItem("token");
        async function sharePage() {
            try {
            var responseValue = await axios.post(backendURL + brainShareURL, {
                share:true
            }, {
                headers: {
                    "Authorization": jwt
                }
            })
            let url = responseValue.data.URL.replace("3000", "5173")
            urlReference = url
            setStateURL(url)

        }catch (err) {
            console.log(err)
        }

        }
       
    
    return <div>
        { open && <div className="h-screen w-screen bg-opacity-50 bg-slate-800 fixed -top-0 -left-0 z-10 overscroll-contain flex justify-center items-center outside" onClick={function (eObj) {
            //@ts-ignore
            if (eObj.target.className.includes("outside")){
                onClose?.()
            }
        }}>
            <div className="min-h-96 max-h-[60%] w-[30%] bg-white rounded px-6 select-none py-8 modal" >
                <div className="flex justify-end select-none cursor-pointer" onClick={onClose}>
                    <CloseIcon>
                    </CloseIcon>
                </div>
                <div className="shareValue  font-mono bg-purple-200 text-center p-2 mt-6 text-nowrap overflow-x-scroll" >
                    URL : {stateURL}
                </div>
                <div className="flex justify-center gap-4 mt-10">
                    <Button variant="primary" text="Share" size="lg" handlerClick={function() {
                        sharePage()
                    }}></Button>
                    <Button variant="primary" startIcon={<ClipboarIcon/>} size="lg" text="Copy" handlerClick={function() {
                        navigator.clipboard.writeText(stateURL).then(m=> {
                            alert("copied!!")
                        })
                    }}></Button>
                </div>
            </div>
     </div>
}
</div>

}
