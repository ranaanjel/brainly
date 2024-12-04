// import { useState } from 'react'
import '../App.css'
import { PlusIcon } from '../components/icons/plus'
import { ShareIcon } from '../components/icons/share'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import brainImage from "../assets/brain.png"

import { AddModal } from '../components/ui/AddModal'
import { useState } from 'react'
import { Sidebar } from '../components/ui/SideBar'


function Dashboard() {


  const [open, setClose] = useState(false)

  return <div className="flex">

    <div className='sidebar'>
        <Sidebar/>
      </div>
      
    <div className='px-10 py-8 max-h-screen space-y-3.5 scroll-smooth overscroll-contain overflow-scroll'>
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
        <Card type='yt' title='Project' link="https://www.youtube.com/watch?v=qF0PdgefNMY"/>
        <Card type="tw" title='Nerds have high IQ why though' link="https://twitter.com/NikoMcCarty/status/1863675169442557955"/> 
        <Card type="docs" title='loading state' link=""/> 
        <Card type="docs" title='loading state' link=""/> 
        <Card type="docs" title='loading state' link=""/> 
        <Card type="docs" title='loading state' link=""/> 
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
