import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'

const Newpost = () => {
  return (
    <>
        <div  className='block  h-20 '>
            <Topbar  />           
        </div>    
        <hr />
        <div className='h-screen flex-row flex mt-4'>
            <div className='lg:w-80  sm:w-20 md:w-40'>
                <Sidebar />
            </div>
            <div className='flex-auto '>
                <div className='h-screen mt-28'>
                    <form >
                      <div className='w-3/4'>
                        <input type="text" placeholder='Title' className='input ' />
                      </div>
                      <div className='w-3/4 mt-2 h-2/5'>
                        <textarea  placeholder="What's on your mind?" className='input h-full ' />
                      </div>
                    </form>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Newpost