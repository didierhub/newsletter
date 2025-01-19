"use client"
import { useState } from 'react'
import Subscribe from './component/Subscribe'
import Unsubscribe from './component/Unsubscribe'
import SubscriptionContenair from './component/SubscriptionContenair'



const page = () => {

   const[ action,setAction]=useState<string>("subscribe")
  
  
  return (
    <div className=''>
     


      <SubscriptionContenair>
        <div className=' grid grid-cols-2 text-white  shadow-xl border'>
              <button className={` rounded-md py-2 ${action==="subscribe"? " bg-green-500":"bg-white text-green-500"}`} onClick={() => setAction("subscribe")}>subscribe</button>
              <button className={` rounded-md py-2 ${action==="unsubscribe"? " bg-red-500":"bg-white text-red-500"}`} onClick={() => setAction("unsubscribe")}>unsubscribe</button>
        </div>
        <div>
          {action === "subscribe" ? <Subscribe/> : <Unsubscribe/>}

        </div>
        </SubscriptionContenair>
      
    
    
    </div>
  )
}

export default page