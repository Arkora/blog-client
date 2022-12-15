import React,{useState,useEffect,useRef} from 'react'
import Comment from './Comment'
import { getUser } from '../localStorage'
import { createComment } from '../api'

interface Props{
    comments: any;
    postId: number;
   
}

const CommentsList = ({comments,postId}:Props) => {
    const user = getUser()
    const [show, setShow] = useState(false)
    const [comment,setComment] = useState<any>({body:'',postId:postId,userId:user.id})
    const inputRef = useRef<HTMLInputElement>(null!)

    const handleSubmit = async(e:any) =>{
         e.preventDefault()
        try {
          const response = await createComment(comment)
          inputRef.current.value = ''
          console.log(response.data)
    
        } catch (error:any) {
          console.log(error.response.data)
        }   
        
      }

  return (
    <div className='mt-2'>
        <div className='relative mt-20 mb-6'>
            <p className='absolute inset-y-0 right-0 pr-3 hover:underline cursor-pointer flex items-center leading-5' onClick={() =>setShow(!show)}>{comments.length} Comments</p>                    
        </div>
        <br />
        <hr />
        <div className='flex '>
        <div className="h-10 w-10 mt-2 ml-2 bg-stone-600 rounded-full flex text-white font-semibold justify-center items-center">{user.firstname.substring(0, 1) + user.lastname.substring(0, 1)}</div>

            <div className='w-96 mt-2 ml-2'>
                <form action="submit" onSubmit={handleSubmit} >
                    <input type="text" ref={inputRef} placeholder='Write your comment' className='input' onChange={(e) =>setComment({...comment,body:e.target.value})} />
                </form>
            </div>
        </div>

        <div className={show?'ml-2' :'hidden'}>
            {comments.length? comments.map((comment:any)=>{
                        return <Comment comment={comment} />    
                    })
                    : <div></div>}
        </div>
    </div>
  )
}

export default CommentsList