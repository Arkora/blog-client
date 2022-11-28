import React,{useState} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {FaPowerOff} from 'react-icons/fa'
import {Link} from 'react-router-dom'


const Topbar = () => {
    const [logoutToggle, setLogoutToggle] = useState(false)
    const [notificationsToggle, setNotificationsToggle] = useState(false)
    
    const handleNotifications = () =>{
        setNotificationsToggle(!notificationsToggle)
        setLogoutToggle(false)
    }
    const handleLogout = () =>{
        setLogoutToggle(!logoutToggle)
        setNotificationsToggle(false)
    }
  return (
    <div className='fixed bg-white  w-full p-4'>
        <div className='relative'>
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
                        <Link to='/'><div className='icons-top '>
                            <AiFillHome size={20}  />
                        </div></Link>
                        <div className='icons-top' onClick={handleNotifications}>
                            <IoMdNotifications size={20} />
                        </div>
                        <div className='icons-top' onClick={handleLogout}>
                            <FaPowerOff size={20} />
                        </div>   
                    </div>    
                </div>            
            </div>
        </div>
        <div className={logoutToggle? 'absolute right-1 w-72 h-40 rounded-md bg-slate-400 flex justify-center items-center leading-5' : 'hidden'}>
            <div className='block'>
                <h1 className='text-center'>Are you sure?</h1>
                <div className='mt-2' >
                    <button className='customButton'>Yes</button>
                    <button className='customButton ml-2'>No</button>
                </div>
            </div>
        </div>
        <div className={notificationsToggle? 'absolute rounded-md right-1 w-96 h-[28rem] bg-slate-400 overflow-auto flex p-4 pt-4 leading-5' : 'hidden'}>
            <div className='block w-full  '>
                <h1 className='text-center text-4xl'>Notifications</h1>                
                <div className='p-2 mt-2 cursor-pointer relative hover:bg-slate-600 w-full bg-slate-500 rounded-xl'>
                    <h6 className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                    <span className='absolute  inset-y-[0.4rem] right-0 pr-3'><button className='notification-button  '>X</button></span>
                </div>        
            </div>
        </div>
    </div>
  )
}

export default Topbar