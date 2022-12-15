import React from 'react'
import {AiFillHome,AiFillSetting} from 'react-icons/ai'
import {BsFileEarmarkPostFill} from 'react-icons/bs'
import {RiAccountCircleFill} from 'react-icons/ri'
import { Link} from 'react-router-dom'
import { getUser } from '../localStorage'
const Sidebar = () => {
  const user = getUser()
  return (
    <div className='block fixed pl-12 h-screen'>
        
        <div className='mt-[6rem]'>
          <ul className='list-none'>
            <li  className='mt-6'>
             <Link to='/'> <div className='sidebar-item'>
                <AiFillHome size={30} />
                <h3 className='text-xl ml-2 text-center'> Home</h3>
             </div></Link>

            </li>
            <li  className='mt-6'>
             <Link to={`/profile/${user.id}`}> <div className='sidebar-item'>
                <RiAccountCircleFill size={30} />
                <h3 className='text-xl ml-2 text-center'> Profile</h3>
              </div></Link>
            </li>
            <li  className='mt-6'>
              <Link to='/newpost'><div className='sidebar-item'>
                <BsFileEarmarkPostFill size={30} />
                <h3 className='text-xl ml-2 text-center'> New Post </h3>
              </div></Link>
            </li>
            <li  className='mt-6'>
             <Link to='/settings'> <div className='sidebar-item'>
                <AiFillSetting size={30} />
                <h3 className='text-xl ml-2 text-center'> Settings </h3>
              </div></Link>
            </li>
            
          </ul>
        </div>
    </div>
  )
}

export default Sidebar