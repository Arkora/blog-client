import React from 'react'
import {AiFillHome,AiFillSetting} from 'react-icons/ai'
import {BsFileEarmarkPostFill} from 'react-icons/bs'
import {RiAccountCircleFill} from 'react-icons/ri'

const Sidebar = () => {
  return (
    <div className='block fixed  p-4 h-screen'>
        
        <div className='mt-[6rem]'>
          <ul>
            <li  className='mt-6'>
              <div className='flex flex-row hover:rounded-lg hover:py-1  hover:px-6 cursor-pointer hover:bg-slate-100'>
                <AiFillHome size={30} />
                <h3 className='text-xl ml-2 text-center'> Home</h3>
              </div>
            </li>
            <li  className='mt-6'>
              <div className='flex flex-row hover:rounded-lg hover:py-1 hover:px-6 cursor-pointer hover:bg-slate-100'>
                <RiAccountCircleFill size={30} />
                <h3 className='text-xl ml-2 text-center'> Profile</h3>
              </div>
            </li>
            <li  className='mt-6'>
              <div className='flex flex-row hover:rounded-lg hover:py-1 hover:px-6 cursor-pointer hover:bg-slate-100'>
                <BsFileEarmarkPostFill size={30} />
                <h3 className='text-xl ml-2 text-center'> New Post </h3>
              </div>
            </li>
            <li  className='mt-6'>
              <div className='flex flex-row hover:rounded-lg hover:py-1 hover:px-6 cursor-pointer hover:bg-slate-100'>
                <AiFillSetting size={30} />
                <h3 className='text-xl ml-2 text-center'> Settings </h3>
              </div>
            </li>
            
          </ul>
        </div>
    </div>
  )
}

export default Sidebar