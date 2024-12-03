// import { useState } from 'react'
import './App.css'
import { PlusIcon } from './components/icons/plus'
import { ShareIcon } from './components/icons/share'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/card'

import { Suspense, lazy } from 'react'




function App() {

  // const LazyElement = lazy(()=> import("./components/ui/YTEmbed"))

  return <div className=" h-auto py-8 px-28 space-y-3.5 scroll-smooth overscroll-contain overflow-scroll">
      <div className='flex justify-end gap-2'>
        <Button variant='primary' text='Add Content' startIcon={<PlusIcon/>}></Button>
        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}></Button>
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
    </div>
}

export default App
