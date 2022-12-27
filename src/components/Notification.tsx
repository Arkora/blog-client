import React from 'react'
import { deleteNotification } from '../api'
import { Link } from 'react-router-dom'

const Notification = ({notification}:any) => {
    const handleDelete = async () => {
        try {
             await deleteNotification(notification.id)
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }
  return (
    <div className='p-2 mt-2 cursor-pointer relative hover:bg-slate-600 w-full bg-slate-500 rounded-xl'>
       <Link to={`/post/${notification.postId}`}> <div className='w-[80%]'>
            <h6 className='text-xl'>{notification.body}</h6>
        </div>
        </Link>
        <span className='absolute  inset-y-[0.4rem] right-0 pr-3'><button className='notification-button' onClick={handleDelete}>X</button></span>
    </div>  
  )
}

export default Notification