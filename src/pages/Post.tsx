import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { RiTimeFill } from "react-icons/ri";
import {
  BsThreeDotsVertical,
  BsFillTrashFill,
  BsFillPencilFill,
} from "react-icons/bs";
import parse from "html-react-parser";
import { getPostById } from "../api";
import CommentsList from "../components/CommentsList";
import Alerts from "../components/Alerts";
import { getUser } from "../localStorage";

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [alert, setAlert] = useState<any>({ res: "", err: "" });
  const user = getUser();
  const [isUser, setIsUser] = useState(false);
  const [expand, setExpand] = useState(false);
  

  useEffect(() => {
    if (user.id === post.userId) {
      setIsUser(true);
    }
  });

  const fetchPost = async () => {
    try {
      const response = await getPostById(Number(params.id));
      setPost(response.data);
      setIsLoaded(true);
    } catch (error: any) {
      setAlert({ ...alert, err: error.response.data.message });
    }
  };

  useEffect(() => {
    fetchPost();
  }, [isLoaded]);

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
        <div className="flex-auto w-11/12 p-2">
          <div className="block h-screen mt-4 w-11/12 ">
            <Alerts alert={alert} setAlert={setAlert} />
            {isLoaded ? (
              <div className="block border border-2 p-2  pb-8 ">
                <div className='grid grid-cols-2  mt-4'>           
            <div className="flex  p-2 ">
                  <div className="h-10 w-10 bg-stone-600 rounded-full flex text-white font-semibold justify-center items-center">{post.firstname.substring(0, 1) + post.lastname.substring(0, 1)}</div>
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
                <hr />
                <br />
                <h3>{post.title}</h3>
                <div className="mt-14 ">{parse(post.body)}</div>
                <div>
                  <CommentsList comments={post.comments} postId={post.id} />
                </div>
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
