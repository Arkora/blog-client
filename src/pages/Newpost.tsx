import React,{useState} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import parse from 'html-react-parser';


const Newpost = () => {
  const [data,setData] = useState<string>('')
  const [post, setpost] = useState({title:'',body:data})
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
            <div className='flex-auto h-screen'>
                <div className='h-screen  mt-28'>
                    <div >
                      <div className='w-3/4'>
                        <input type="text" placeholder='Title' className='input ' />
                      </div>                      
                      <div className='w-3/4'>
                        <Editor setData={setData} />
                      </div>
                    </div>
                </div>                
            </div>
            
        </div>
    </>
  )
}

export default Newpost