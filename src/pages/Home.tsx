import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { getRandomPosts } from '../api'
import PostItem from '../components/PostItem'


const Home = () => {
    const [postsRes, setPostsRes] = useState([])
    const fetchPosts = async () =>{
        try {
            const response = await getRandomPosts()                                          
             setPostsRes(response.data)             
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }
    useEffect(()=>{
       fetchPosts()
    },[])
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
            <div className='flex-auto w-11/12 p-2'>
                {postsRes.length? postsRes.map((post)=>{
                    return  <PostItem post={post} />
                })
                 : <div></div>}
            </div>
        </div>
     </>
  )
}

export default Home