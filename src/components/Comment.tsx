import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {BsFillTrashFill} from 'react-icons/bs'
import { getUser } from '../localStorage'
import { deleteComment } from '../api'


const Comment = ({comment}:any) => {
    const [show, setShow] = useState(false)
    const [isLegal,setIsLegal] = useState(false)
    const user = getUser()

    const handleDelete = async (id:any) => {
        try {
            const response = await deleteComment(id)
            console.log(response.data)
        } catch (error:any) {
            console.log(error.response.data)            
        }
    }
    useEffect(() => {
        if(comment.userId === user.id){
            setIsLegal(true)
        }
    }, [])
    
  return (
    <div className='p-2 block  mt-2'>
         <div className="flex  p-2 " onMouseEnter={() => setShow(true)} onMouseLeave={() =>setShow(false)}>
            <div className="h-10 w-10 bg-stone-600 rounded-full flex text-white font-semibold justify-center items-center">{comment.firstname.substring(0, 1) + comment.lastname.substring(0, 1)}</div>
            <div className='block ml-2 p-1 rounded-md bg-slate-200'>
                <Link to={`/profile/${comment.userId}`}> <h6 className="ml-2 underline">{comment.firstname + " " + comment.lastname}</h6> </Link>
                <p>{comment.body}</p>
            </div>
            <div className={show&&isLegal?'ml-1 mt-1 post-actions text-white':'hidden'}>
                <button onClick={() => handleDelete(comment.id)} ><BsFillTrashFill size={15}/></button>
            </div>
        </div>
        
    </div>
  )
}

export default Comment