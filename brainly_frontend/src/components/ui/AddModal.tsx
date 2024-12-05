import { CloseIcon } from "../icons/close"
import { Button } from "./Button"
import { MutableRefObject, useRef} from "react"
import {InputComponent} from "./input"
import axios from "axios";
import { backendURL, userContentURL } from "../../config";
import {  useNavigate } from "react-router-dom";
interface AddModalProps {
    open:boolean,
    onClose?:() => void,
}

export function AddModal({open, onClose }:AddModalProps) {

    let titleRef = useRef<HTMLInputElement>();
    let linkRef  = useRef<HTMLInputElement>();
    let typeRef = useRef<HTMLInputElement>();
    let tagRef = useRef<HTMLInputElement>();

    const navigate = useNavigate()

    enum contentTypes {
    image="image",
    video="video",
    article="article",
    audio="audio",
    unknown = "unknown"
    ,tweet = "tweet"
    }

    // const [type, setType] = useState(contentTypes.video)

    async function addContent() {
        const title: string | undefined = titleRef.current?.value;
        const link: string | undefined = linkRef.current?.value;
        let type ;
        switch (typeRef.current?.value) {
            case "audio":
                type = contentTypes.audio
                break;
         case "video": type = contentTypes.video
                break;
         case "article": type = contentTypes.article
                break;
         case "image": type = contentTypes.image
                break;

         case "tweet": type = contentTypes.tweet
         break;
            default:
                type = contentTypes.unknown;
                break;
        }

        
        const tag:string[] | undefined = tagRef.current?.value.split(" ");

        console.log(title, link, type, tag)
        //sending the request with auth;

        const jwt = localStorage.getItem("token");

        if(!jwt) {
            navigate("/")
        }

        try {
            var responseValue = await axios.post(backendURL + userContentURL, {
                link, title, tag, type
            }, {
                headers: {
                    Authorization: jwt
                }
            })
            console.log(responseValue)
            window.location.reload();
        }catch (err) {
            console.log(err)
        }
       

    }


    const reference:MutableRefObject<HTMLDivElement | null > = useRef(null)

    return <div>
        { open && <div className="h-screen w-screen bg-opacity-50 bg-slate-800 fixed -top-0 -left-0 z-10 overscroll-contain flex justify-center items-center outside" onClick={function (eObj) {
            //@ts-ignore
            if (eObj.target.className.includes("outside")){
                onClose?.()
            }
        }}>
            <div className="min-h-96 max-h-[60%] w-[30%] bg-white rounded px-6 select-none py-8 modal" ref={reference}>
                <div className="flex justify-end select-none cursor-pointer" onClick={onClose}>
                    <CloseIcon>
                    </CloseIcon>
                </div>
                <div className=" w-full text-center space-y-5 my-4">
                    <InputComponent reference={titleRef} placeholder="Title"/>
                    <InputComponent reference={linkRef} placeholder="Link"/>
                    <InputComponent reference={typeRef} placeholder="[tweet|video|image|article]"/>
                    <InputComponent reference={tagRef} placeholder="Tag : eg : tag1 tag2 tag3"/>
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" text="Submit" handlerClick={addContent}></Button>
                </div>
            </div>
     </div>}
    </div>
}
