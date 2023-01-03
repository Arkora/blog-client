import React,{useState,useEffect} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {FaPowerOff} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import { getUser } from '../localStorage'
import { getNotifications } from '../api'
import Notification from './Notification'

const Topbar = () => {
    const [logoutToggle, setLogoutToggle] = useState(false)
    const [notificationsToggle, setNotificationsToggle] = useState(false)    
    const [notifications,setNotifications] = useState([])
    const user = getUser()
    const navigate = useNavigate()

    
    const handleNotifications = () =>{
        setNotificationsToggle(!notificationsToggle)
        setLogoutToggle(false)
    }
    const handleLogout = () =>{
        setLogoutToggle(!logoutToggle)
        setNotificationsToggle(false)
    }

    const logout = () =>{
        localStorage.clear()
        sessionStorage.clear()        
        navigate('/login')
    }

    const fetchNotifications =async () => {
        try {
            const {data} = await getNotifications(user.id)
            setNotifications(data)
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    useEffect(()=>{
        fetchNotifications()        
    },[])
    
  return (
    <div className='fixed bg-white shadow-md shadow-zinc-900  w-full p-4'>
        <div className='relative'>
            <div className='grid h-full grid-flow-col grid-cols-3 gap-2'>
                <div className='flex justify-center'>
                    <div className='flex'>
                        <div className='w-14 h-14 rounded-full bg-neutral-900 text-white flex justify-center items-center'>Hello</div>
                        <h3 className='text-xl p-3'>{user.firstname + ' ' + user.lastname}</h3>
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
                        <div className='flex'>
                            <div className='icons-top' onClick={handleNotifications}>
                                <IoMdNotifications size={20} />
                            </div>
                            <div className='w-4 h-4 bg-red-600 text-white rounded-full justify-center items-center flex -ml-4'>
                                <p>{notifications.length}</p>
                            </div>
                        </div>
                        <div className='icons-top' onClick={handleLogout}>
                            <FaPowerOff size={20} />
                        </div>   
                    </div>    
                </div>            
            </div>
        </div>
        <div className={logoutToggle? 'absolute right-1 w-72 h-40 rounded-md bg-gray-800 text-white flex justify-center items-center leading-5' : 'hidden'}>
            <div className='block'>
                <h6 className='text-center'>Are you sure?</h6>
                <div className='mt-2' >
                    <button className='customButton' onClick={logout}>Yes</button>
                    <button className='customButton ml-2' onClick={() =>setLogoutToggle(false)}>No</button>
                </div>
            </div>
        </div>
        <div className={notificationsToggle? 'absolute rounded-md right-1 w-96 h-[28rem] bg-gray-800 overflow-auto text-white flex p-4 pt-4 leading-5' : 'hidden'}>
            <div className='block w-full no-scrollbar overflow-y-auto '>
                <h1 className='text-center text-4xl'>Notifications</h1>
                {notifications.length? notifications.map((notification)=>{
                    return <Notification notification={notification}/>
                }):<div></div>}                
            </div>
        </div>
    </div>
  )
}

export default Topbar