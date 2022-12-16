import React, { useState, useEffect, useRef } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { getUser } from "../localStorage";
import { getPostById,deletePost,updatePost } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Alerts from "../components/Alerts";

const EditPost = () => {
  interface postData {
    title: string;
    body: string;    
  }
  const params = useParams()
  const navigate = useNavigate()
  const user = getUser()
  const [data, setData] = useState<string>("")
  const [fetchedData, setFetchedData] = useState<any>({})
  const [alert,setAlert] = useState<any>({res:'',err:''})
  const [safeDelete,setSafeDelete] = useState<boolean>(false)
  const [isLoaded,setIsLoaded] = useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null!)
  const [post, setPost] = useState<postData>({
    title: "",
    body: data,    
  });

  const fetchPost = async () =>{
    try {
        const response = await getPostById(params.id)
             setIsLoaded(true)             
             setFetchedData(response.data)
             setPost({title:response.data.title,body:response.data.body})
        } catch (error:any) {
        setAlert({...alert,err:error.response.data.message})
    }
  }
  useEffect(() => {
    setPost({ ...post, body: data });
  }, [data]);

 
  useEffect(()=>{
    fetchPost() 
  },[])

  useEffect(() =>{
    if(isLoaded){
        setData(fetchedData.body)
        titleRef.current.value = fetchedData.title
    }
  },[fetchedData])

  const handleUpdate = async() =>{
    try {
        const response = await updatePost(fetchedData.id,post)
        setAlert({...alert,res:response.data.message})
        navigate(`/post/${fetchedData.id}`)
    } catch (error:any) {
        setAlert({...alert,err:error.response.data.message})
    }
  }

  const handleDelete = async() =>{
    try {
        const response = await deletePost(fetchedData.id)
        setAlert({...alert,res:response.data.message})
        navigate('/')
    } catch (error:any) {
        setAlert({...alert,err:error.response.data.message})
      }
  }

  return (
    <>
      <div className="block  h-20 ">
        <Topbar />
      </div>
      <hr />
      <div className="h-screen flex-row flex mt-4">
        <div className="lg:w-80  sm:w-20 md:w-40">
          <Sidebar />
        </div>
        <div className="flex-auto h-screen w-5/6">
          <div className="h-screen  mt-10">
            <form action="submit">
              <div className="w-3/4">
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Title"
                  className="input "
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </div>
              <div className="w-3/4 ">
                <Editor setData={setData} data={data} />
              </div>
            </form>
            <div className="mt-14 grid-cols-2 gap-1 w-5/6  grid ">   
                <div className="flex w-full h-10">
                    <button className="customButton" onClick={handleUpdate}>Update Post</button>
                    <button className="customButton ml-2" onClick={() => setSafeDelete(true)}>Delete</button>                    
                </div> 
                <Alerts alert={alert} setAlert={setAlert} />
            </div>
            <div className={safeDelete? 'w-56 rounded-lg h-28 mt-2 block bg-slate-400' : 'hidden'}>
              <div className="flex justify-center">
                <div className="p-4">
                  <p className="font-semibold ml-3 text-white text-lg">Are you sure?</p>                  
                    <button className="customButton" onClick={handleDelete} >Yes</button>
                    <button className="customButton ml-2" onClick={() =>setSafeDelete(false)}>No</button>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
