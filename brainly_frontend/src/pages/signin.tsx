import { Button } from "../components/ui/Button"
import { InputComponent } from "../components/ui/input"
import BrainLogo from "../assets/brain.png"
import { SideBarItems } from "../components/ui/SideBar"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"

export function Signin() {

    const usernameRef = useRef<any>()
    const passwordRef = useRef<any>()


    const navigate = useNavigate();

    return <div className="bg-purple-600 h-screen w-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="h-96 w-72 bg-purple-300 rounded-md py-6 px-4 select-none flex flex-col items-center">
            
            <SideBarItems variant="header" startIcon={BrainLogo} text="Brainly" />
            <div className="space-y-4">

            <InputComponent reference={usernameRef} placeholder="username" />
            <InputComponent reference={passwordRef} placeholder="password" />
            </div>

            <div className="button mt-8  flex justify-between gap-2">
                <Button variant="primary" text="Sign In" loading={false} handlerClick={function() {
                    console.log(usernameRef.current.value, passwordRef.current.value)
                }}/>
                <Button variant="secondary" text="Signup instead" handlerClick={function () {
                    navigate("/signup")
                }}  />
            </div>

        </div>
    </div>

}