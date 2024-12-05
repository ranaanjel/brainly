import '../App.css'
import { Card, cardProps } from '../components/ui/card'
import brainImage from "../assets/brain.png"
import { backendURL, userContentURL } from '../config'
import axios from 'axios'
import { useShareContent } from '../hooks/shareContent'
import { useLocation } from 'react-router-dom'

 function ShareDashboard() {

    const url = useLocation()


 const content = useShareContent(url);

  return <div className="flex mx-auto">
      
    <div className='px-10 flex-1 py-8 max-h-screen space-y-3.5 scroll-smooth overscroll-contain overflow-scroll'>
      <div className='flex justify-start gap-2 hover:shadow-xl p-4'>
        <div className='flex space-x-3 items-center'>
          <img src={brainImage}  alt="logo" className='size-10'/> 
          <span className='text-3xl font-semibold tracking-tighter font-sans'> Brainly</span>
        </div>
      </div>
      <div className='flex gap-8 flex-wrap justify-center m-auto '>
        {content.map(function (item:{type:string, tag:{title:string}[], title:string, link:string, _id:string}, index:number) {
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

              }} contentId={item._id} tag={item.tag} key={index} type={item.type as cardProps["type"]} title={item.title} link={item.link} />
        })}
        {content.length ==0 ? <div className='h-96 w-full flex justify-center items-end relative'>
          No content
        </div> :"" }
       
      </div>
    
    </div>

    </div>
}

export default ShareDashboard