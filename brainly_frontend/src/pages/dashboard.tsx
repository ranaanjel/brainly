// import { useState } from 'react'
import '../App.css'
import { PlusIcon } from '../components/icons/plus'
import { ShareIcon } from '../components/icons/share'
import { Button } from '../components/ui/Button'
import { Card, cardProps } from '../components/ui/card'
import brainImage from "../assets/brain.png"

import { AddModal } from '../components/ui/AddModal'
import { useRef, useState } from 'react'
import { Sidebar } from '../components/ui/SideBar'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../components/ui/useContent'
import { backendURL, userContentURL } from '../config'
import axios from 'axios'

 function Dashboard() {

//  const navigate = useNavigate() ;

 const jwt = localStorage.getItem("token");

 console.log(jwt, !jwt)

 if(!jwt) {
   
   window.location.replace("/")
  return;
 }

 //fetching the data here and showing it - array of content to get
  const content = useContent();

  console.log(content, "empty array")

  const [open, setClose] = useState(false)

  return <div className="flex">

    <div className='sidebar'>
        <Sidebar/>
      </div>
      
    <div className='px-10 flex-1 py-8 max-h-screen space-y-3.5 scroll-smooth overscroll-contain overflow-scroll'>
      <div className='flex justify-between gap-2 hover:shadow-xl p-4'>
        <div className='flex space-x-3 items-center'>
          <img src={brainImage}  alt="logo" className='size-10'/> 
          <span className='text-3xl font-semibold tracking-tighter font-sans'> Brainly</span>
        </div>
        <div className='flex gap-6'>
          <Button variant='primary' text='Add Content' startIcon={<PlusIcon/>} handlerClick={function() {
            setClose(true)
          }}></Button>
        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}></Button>
        </div>
      </div>
      <div className='flex gap-8 flex-wrap justify-evenly'>
        {/* <Card type='yt' title='Project' link="https://www.youtube.com/watch?v=qF0PdgefNMY"/>
        <Card type="tw" title='Nerds have high IQ why though' link="https://twitter.com/NikoMcCarty/status/1863675169442557955"/> 
        <Card type="docs" title='loading state' link=""/>  */}
        {/* <Card type="tw" title='Nerds have high IQ why though' link="https://twitter.com/NikoMcCarty/status/1863675169442557955"/> */}
        {content.map(function (item:{type:string, tag:string[], title:string, link:string, _id:string}, index:number) {
          console.log(item)
            switch (item.type) {
              case "video":
                item.type = "yt"
                break;
              case "audio":
                item.type = "yt"
                break;
              case "article":
                item.type = "docs"
                break;
               case "tweet":
                item.type = "tw"
                break;
              case "unknown":
                item.type = "unknown"
                break; 
              default:
                break;
            }
              const contentId = (item._id);
              return <Card deleteHandler={ async function () {

                try {
                 let deleteResponse = await axios.delete(backendURL+userContentURL, {
                  data : {
                    contentId
                  },
                  headers :{
                    "Authorization": localStorage.getItem("token")
                  }
                 })
                 console.log(deleteResponse)
                 window.location.reload()

                }catch (err) {
                  console.log(err)
                }

              }} contentId={item._id} key={index} type={item.type as cardProps["type"]} title={item.title} link={item.link} />
        })}

      </div>
      {/* <Suspense fallback={"..loading the content"}>
        <LazyElement link="https://www.youtube.com/embed/GkS9RUi_UcQ" handler={function () {
          console.log("loading lazy")
        }} hidden="block"/>
      </Suspense> */}
      <AddModal open={open} onClose={function ()
        {
             setClose(false) 
        }
      } />
    </div>

    </div>
}

export default Dashboard
