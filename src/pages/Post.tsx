import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import moment from "moment";
import { RiTimeFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import parse from "html-react-parser";
import { getPostById } from "../api";

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const fetchPost = async () => {
    try {
      const response = await getPostById(params.id);
      setPost(response.data);
      setIsLoaded(true);
    } catch (error: any) {
      setErr(error.response.data.message);
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
            {isLoaded? 
            <div className="block border border-2 p-2  pb-8 ">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex p-2 ">
                  <div className="h-10 w-10 bg-stone-600 rounded-full flex text-white font-semibold justify-center items-center">{post.firstname.substring(0, 1) + post.lastname.substring(0, 1)}</div>
                  <h5 className="ml-2">{post.firstname + " " + post.lastname}</h5>
                </div>
                <div className="flex justify-end">
                  <RiTimeFill size={20} />
                  <p className="-mt-[3px] ml-2">
                    {moment(post.createdAt).fromNow()}
                  </p>
                  <div className="post-options ml-2">
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <h3>{post.title}</h3>
              <div className="mt-14 ">{parse(post.body)}</div>
            </div>
            : <div>Loading</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
