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
    const commentsSectionRef = useRef<HTMLDivElement>(null!)

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
         e.preventDefault()
        try {
          const response = await createComment(comment)
          inputRef.current.value = ''          
    
        } catch (error:any) {          
        }   
        
      }

      useEffect(()=>{
        if(show){
          // commentsSectionRef.current.scrollIntoView({behavior:'smooth'})
          commentsSectionRef.current.scrollIntoView({behavior:"smooth"})
        }
      },[show])

  return (
    <div className='mt-2'>
      <div className=''>
        <div className='relative mt-20 mb-6'>
            <div className='absolute inset-y-0 right-0 pr-3 hover:underline cursor-pointer flex items-center leading-5'>
              <p onClick={() =>setShow(!show)}>{comments.length} Comments</p>
            </div>
        </div>
      </div>
        <br />
        <hr />
        <div className='flex '>
        <div className="h-10 w-10 mt-2 ml-2 bg-neutral-900 rounded-full flex text-white font-semibold justify-center items-center">{user.firstname.substring(0, 1) + user.lastname.substring(0, 1)}</div>

            <div  className='w-96 mt-2 ml-2'>
                <form  onSubmit={handleSubmit} >
                    <input type="text" ref={inputRef} placeholder='Write your comment' className='input' onChange={(e) =>setComment({...comment,body:e.target.value})} />
                </form>
            </div>
        </div>

        <div ref={commentsSectionRef} className={show?'ml-2' :'hidden'}>
            {comments.length? comments.map((comment:any)=>{
                        return <Comment comment={comment} />    
                    })
                    : <div></div>}
        </div>        
    </div>
  )
}

export default CommentsList