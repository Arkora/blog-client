import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';


interface Props{
    setData: React.Dispatch<React.SetStateAction<string>>;
    data: string;
   
}

const Editor = ({setData,data}:Props) => {
     
   
  return (
    <div className=' mt-2  overflow'>
       <ReactQuill theme='snow' value={data} onChange={setData} className='h-80' /> 
    </div>
  )
}

export default Editor