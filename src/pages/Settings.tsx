import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'

const Settings = () => {
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
            <div className='flex-auto'>
                <div className='h-screen '>
                    <h1>Hello</h1>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Settings