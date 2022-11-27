import React from 'react'
import {AiFillHome} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {RiAccountCircleFill} from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className='fixed bg-white w-full p-4'>
        <div className='grid h-full grid-flow-col grid-cols-3 gap-2'>
            <div className='flex justify-center'>
                <div className='flex'>
                    <div className='w-14 h-14 rounded-full bg-slate-400 flex justify-center items-center'>Hello</div>
                    <h3 className='text-xl p-3'>Holly Molly</h3>
                </div>
            </div>
            <div className='flex w-full  justify-center p-3'>
                <form action="submit">
                    <input type="text" className='rounded-xl border-solid border-black border-2 pr-12 pl-3  border-opacity-100  h-11' placeholder='Search' />
                </form>
            </div>
            <div className='flex justify-end p-3'>
            <div className='grid grid-cols-3 gap-6 '>
                    <div className='icons-top '>
                        <AiFillHome size={30}  />
                    </div>
                    <div className='icons-top'>
                        <RiAccountCircleFill size={30} />
                    </div>
                    <div className='icons-top'>
                        <IoMdNotifications size={30} />
                    </div>   
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Topbar