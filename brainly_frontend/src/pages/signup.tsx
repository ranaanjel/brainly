import { Button } from "../components/ui/Button"
import { InputComponent } from "../components/ui/input"
import BrainLogo from "../assets/brain.png"
import { SideBarItems } from "../components/ui/SideBar"
import {  useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import axios from "axios"
import { backendURL, signupURL } from "../config"

export function Signup() {
    const [fetching, setFetchin] =useState(false) 

    const navigate = useNavigate();
    const usernameRef = useRef<any>()
    const passwordRef = useRef<any>()

   async function sendData() {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        setFetchin(true)
        try{
            let response = await axios.post(backendURL+signupURL, {
                name:username, password 
        })
            console.log("users added successful")
            setFetchin(false)
            navigate("/signup")
        }catch(err:any) {
            alert("error please try again")
            console.log("error",err.response.data, username, password)
        }


       // alert("user is added")
    }


    return <div className="bg-purple-600 h-screen w-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="h-96 w-72 bg-purple-300 rounded-md py-6 px-4 select-none flex flex-col items-center">
            
            <SideBarItems variant="header" startIcon={BrainLogo} text="Brainly" />
            <div className="space-y-4">

            <InputComponent reference={usernameRef} placeholder="username"  />
            <InputComponent reference={passwordRef} placeholder="password" type="password" />
            </div>

            <div className="button mt-8  flex justify-between gap-2">
                <Button variant="primary" text="Sign Up"  loading={fetching} handlerClick={sendData}/>
                <Button variant="secondary" text="Signin instead" handlerClick={function () {
                    navigate("/")
                }}  />
            </div>

        </div>
    </div>

}