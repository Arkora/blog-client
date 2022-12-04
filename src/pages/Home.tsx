import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'


const Home = () => {
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
            <div className='flex-auto bg-slate-900'>
                <div className='h-screen bg-gray-100'>
                    <h1>Hello</h1>
                </div>
                <div className='h-screen bg-gray-100'>
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
     </>
  )
}

export default Home