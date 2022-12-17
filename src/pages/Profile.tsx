import React,{useEffect,useState} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import { getPosts } from '../api'
import { useParams } from 'react-router-dom'
import PostItem from '../components/PostItem'
import Alerts from '../components/Alerts'

const Profile = () => {
    const params = useParams()
    const [postsRes, setPostsRes] = useState([])
    const [alert,setAlert] = useState<any>({res:'',err:''}) 
    const fetchPosts = async () =>{
        try {
            const response = await getPosts(params.id)                                          
             setPostsRes(response.data)             
        } catch (error:any) {
            setAlert({...alert,err:error.response.data.message})
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
                <div className='flex justify-center mt-2'>
                    <Alerts alert={alert} setAlert={setAlert}/>
                </div>
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