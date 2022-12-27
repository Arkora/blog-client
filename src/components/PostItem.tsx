import React,{useEffect,useState} from 'react'
import moment from 'moment'
import {RiTimeFill} from 'react-icons/ri'
import {BsThreeDotsVertical,BsFillPencilFill} from 'react-icons/bs'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { getUser } from '../localStorage'
import CommentsList from './CommentsList'


const PostItem = ({post}:any) => {   
    const user = getUser()
    const [isUser, setIsUser] = useState(false)
    const [expand,setExpand]  = useState(false)

    useEffect(()=>{
        if(user.id === post.userId){
            setIsUser(true)
        }
    },[])
    
  return (
    <div className='block pb-2 my-20  bg-neutral-600 p-1 rounded-md text-slate-50   w-11/12 '>
        <div className='grid grid-cols-2   mt-4'>           
            <div className="flex  p-2 ">
                  <div className="h-10 w-10 bg-zinc-800 rounded-full flex text-white font-semibold justify-center items-center">{post.firstname.substring(0, 1) + post.lastname.substring(0, 1)}</div>
                 <Link to={`/profile/${post.userId}`}> <h5 className="ml-2 underline">{post.firstname + " " + post.lastname}</h5> </Link>
            </div>
            <div className='flex justify-end'>
                <div className='flex justify-end mr-2'>
                    <RiTimeFill size={20} />
                    <p className='-mt-[3px] '>{moment(post.createdAt).fromNow()}</p>
                    <div className={isUser?'post-options ml-2' :'hidden'} onClick={()=>setExpand(!expand)}>
                        <BsThreeDotsVertical />
                    </div>
                </div>
                <div className={expand?'w-16 h-12 bg-stone-800 block rounded-lg':'hidden'}>
                    <div className='flex justify-center items-center text-white p-3 '>
                       <Link to={`/edit/post/${post.id}`}><div className='post-actions '><BsFillPencilFill size={20} /></div></Link> 
                    </div>
                </div>
            </div>
        </div>
        <br />
        {/* <hr /> */}
        <div className='p-2'>
           <Link to={`/post/${post.id}`}> <h4>{post.title}</h4></Link>
        </div>
        
           
            <div className='mt-14 no-scrollbar overflow-y-auto  pl-10 h-28'>
                {parse(post.body)}
            </div>            
                
                <CommentsList comments={post.comments} postId={post.id} />


    </div>
  )
}

export default PostItem