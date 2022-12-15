import React,{useEffect,useState} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import { getPosts } from '../api'
import { useParams } from 'react-router-dom'
import PostItem from '../components/PostItem'

const Profile = () => {
    const params = useParams()
    const [postsRes, setPostsRes] = useState([])
    const fetchPosts = async () =>{
        try {
            const response = await getPosts(params.id)                                          
             setPostsRes(response.data)             
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }
    useEffect(()=>{
       fetchPosts()
    },[params.id])
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

export default Profile