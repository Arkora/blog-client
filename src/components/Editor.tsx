import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';


interface Props{
    setData: React.Dispatch<React.SetStateAction<string>>
}

const Editor = ({setData}:Props) => {
     const [value, setValue] = useState<string>('')

     useEffect(() => {
       setData(value)
     }, [value])
     
   
  return (
    <div className=' mt-2 overflow'>
       <ReactQuill theme="snow" value={value} onChange={setValue} className='h-96' /> 
    </div>
  )
}

export default Editor