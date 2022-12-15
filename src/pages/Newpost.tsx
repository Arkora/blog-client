import React,{useState,useEffect,useRef} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import { getUser } from '../localStorage';
import { createPost,getPosts } from '../api';
import { Link } from 'react-router-dom';


const Newpost = () => {
  const user = getUser()
  interface postData {
    title:string;
    body:string;
    userId:number;
  }
  const [data,setData] = useState<string>('')
  const [post, setPost] = useState<postData>({title:'',body:data,userId:user.id})
  const [res,setRes] = useState<string>('')
  const [err,setErr] = useState<string>('')
  const titleRef = useRef<HTMLInputElement>(null!)

  useEffect(() =>{
    setPost({...post,body:data})    
  },[data])

 
  
  const handleSubmit = async(e:any) =>{
    e.preventDefault()
    try {
      const response = await createPost(post)
      setRes(response.data.message)
      titleRef.current.value = ''
      setPost({...post,title:''})
      setData('')

    } catch (error:any) {
      setErr(error.response.data.message)
    }   
  }
  return (
    <>
        <div  className='block  h-20 '>
            <Topbar  />           
        </div>    
        <hr />
        <div className='h-screen flex-row flex mt-4'>
          <div className='lg:w-80  sm:w-20 md:w-40'>
                <Sidebar />
            </div>
            <div className='flex-auto h-screen w-5/6'>
                <div className='h-screen  mt-10'>
                    <form action='submit' >
                      <div className='w-3/4'>
                        <input ref={titleRef} type="text" placeholder='Title' className='input ' onChange={(e) => setPost({...post,title:e.target.value})} />
                      </div>                      
                      <div className='w-3/4 '>
                        <Editor setData={setData} data={data} />                        
                      </div>
                    </form >
                    <div className='mt-20 flex '>
                      <button className='customButton w-20 h-10  ' onClick={handleSubmit} >Post</button>
                      <div className='ml-20'>
                        <div className={err?'bg-red-300 p-6 h-20 w-80 rounded-lg block':'hidden'}>
                          <div className='relative'>
                            <p className='text-red-600 font-normal text-lg'>{err}</p>
                            <span className='absolute -top-5 -right-6 pr-3 flex items-center  cursor-pointer ins text-white' onClick={() =>setErr("")}>X</span>
                          </div>
                        </div>  
                        <div className={res?'bg-green-300 p-6 h-30 w-80 rounded-lg block':'hidden'}>
                          <div></div>
                          <div className='relative'>
                            <p className='text-white font-normal text-lg'>{res}</p>
                            <span className='absolute -top-5 -right-6 pr-3 flex items-center  cursor-pointer ins text-white' onClick={() =>setRes("")}>X</span>
                          </div>
                          <Link to='/profile'><button className='customButton mt-2'>Profile</button></Link>
                        </div>                
                      </div>
                    </div>
                </div>                
          </div>
            
        </div>
    </>
  )
}

export default Newpost