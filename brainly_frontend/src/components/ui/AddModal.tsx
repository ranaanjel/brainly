import { CloseIcon } from "../icons/close"
import { Button } from "./Button"
import { MutableRefObject, useRef } from "react"
interface AddModalProps {
    open:boolean,
    onClose?:() => void
}

export function AddModal({open, onClose}:AddModalProps) {

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
                    <InputComponent placeholder="Title"/>
                    <InputComponent placeholder="Link"/>
                    <InputComponent placeholder="Type"/>
                    <InputComponent placeholder="Tag"/>
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" text="Submit"></Button>
                </div>
            </div>
     </div>}
    </div>
}

function InputComponent({changeHandler, placeholder}:{changeHandler?:()=> void, placeholder:string}) {

    return <div>
        <input type="text" className="py-2 px-4 border rounded border-slate-800 " onChange={changeHandler} placeholder={placeholder}/>
    </div>
}