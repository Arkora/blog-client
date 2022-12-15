import React, { useState, useEffect, useRef } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { getUser } from "../localStorage";
import { createPost } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Alerts from "../components/Alerts";

const Newpost = () => {
  const user = getUser();
  interface postData {
    title: string;
    body: string;
    userId: number;
  }

  const navigate = useNavigate();
  const [data, setData] = useState<string>("");
  const [post, setPost] = useState<postData>({
    title: "",
    body: data,
    userId: user.id,
  });
  const titleRef = useRef<HTMLInputElement>(null!);
  const [alert, setAlert] = useState<any>({ res: "", err: "" });

  useEffect(() => {
    setPost({ ...post, body: data });
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await createPost(post);
      setAlert({ ...alert, res: response.data.message });
      titleRef.current.value = "";
      setPost({ ...post, title: "" });
      setData("");
      navigate("/");
    } catch (error: any) {
      setAlert({ ...alert, err: error.response.data.message });
    }
  };
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
            <div className="mt-20 flex ">
              <button className="customButton w-20 h-10  " onClick={handleSubmit} > Post </button>
              <div className="ml-4">
                <Alerts alert={alert} setAlert={setAlert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newpost;
