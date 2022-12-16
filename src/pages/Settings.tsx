import React,{useEffect,useState} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import { getUser } from '../localStorage'
import { BsFillPencilFill } from 'react-icons/bs'
import moment from 'moment'
import SettingsEdit from '../components/SettingsEdit'

const Settings = () => {
    const user = getUser()
    const [edit, setEdit] = useState<boolean>(false)
    const [toggle,setToggle] = useState<boolean>(false)
    const [toggleDelete,setToggleDelete] = useState<boolean>(false)
    const [formData,setFormData] = useState<any>({password:''})


    const handleToggle = () =>{
        setToggle(true)
        setToggleDelete(false)
    }
    const handleToggleDelete = () =>{
        setToggleDelete(true)
        setToggle(false)
    }
    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
    }
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
            <div className='flex-auto w-11/12 rounded-lg bg-yellow-100  h-screen p-2 m-4'>                
                <div className='flex justify-center h-screen items-center'>
                    <div className='w-11/12 h-[36rem] flex justify-center items-center bg-slate-50'>
                        <div className=' no-scrollbar overflow-y-auto w-[80%] h-[90%] p-2 '>
                            <div>
                                <div className='flex justify-center mb-8'>
                                    <h3>Edit your Info</h3>                                    
                                </div>
                                <hr />
                                {edit?
                                    <div className='mt-2 p-4'>
                                        <SettingsEdit  user={user} setEdit={setEdit} /> 
                                    </div>

                                :
                                <div className='flex mt-2 p-4' >
                                    <div>
                                        <ul className='list-none '>
                                            <li className='text-lg mt-4 font-semibold'>First Name: {user.firstname}</li>
                                            <li className='text-lg mt-4 font-semibold'>Last Name: {user.lastname}</li>
                                            <li className='text-lg mt-4 font-semibold'>Email: {user.email}</li>
                                            <li className='text-lg mt-4 font-semibold'>Username: {user.username}</li>
                                            <li className='text-lg mt-4 font-semibold'>Days Here: {moment(user.createdAt).calendar()}</li>
                                        </ul>
                                        <div className='mt-4 flex'>
                                            <button className='customButton' onClick={handleToggle}>Change password</button>
                                            <button className='redButton ml-4' onClick={handleToggleDelete}>Delete Account</button>
                                        </div>
                                    </div>                                    
                                    <div>
                                        <div className='text-white flex justify-center rounded-full items-center w-10 h-10 bg-rose-500'>
                                            <button onClick={() => setEdit(true)}><BsFillPencilFill size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                                }

                                <div className={toggle? ' ': 'hidden'}>
                                    <form onSubmit={handleSubmit}>
                                        <div className=' flex mt-4 '>
                                            <label htmlFor="" className='w-[15%]'>Password</label>
                                            <div>
                                                <input type="password" className='input'  placeholder=''/>
                                            </div>
                                                <button className='customButton ml-4' onClick={() => handleSubmit}>Save Password</button>
                                                <button className='customButton ml-4' onClick={() => setToggle(false)}>Cancel</button>
                                        </div>                                         
                                    </form>
                                </div>

                                <div className={toggleDelete? ' ' : 'hidden'}>
                                    <div className='w-[50%] h-24 rounded-md  flex justify-center bg-slate-500'>
                                        <div>
                                            <h6 className='text-center text-white'>Are you sure?</h6>
                                            <p className='text-red-200'>You cant recover your data after delete!!!</p>
                                            <div className='flex justify-center'>
                                                <button className='redButton'>Yes</button>
                                                <button className='customButton ml-4' onClick={() => setToggleDelete(false)}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </>
  )
}

export default Settings