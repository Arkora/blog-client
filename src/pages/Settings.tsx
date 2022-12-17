import React,{useEffect,useState,useRef} from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import { getUser } from '../localStorage'
import { BsFillPencilFill } from 'react-icons/bs'
import moment from 'moment'
import SettingsEdit from '../components/SettingsEdit'
import { useNavigate } from 'react-router-dom'
import { deleteUser,updatePassword } from '../api'
import Alerts from '../components/Alerts'

const Settings = () => {
    const navigate = useNavigate()
    const user = getUser()
    const [edit, setEdit] = useState<boolean>(false)
    const [toggle,setToggle] = useState<boolean>(false)
    const [toggleDelete,setToggleDelete] = useState<boolean>(false)
    const [formData,setFormData] = useState<any>({userId:user.id,password:'',newPassword:''})
    const [alert, setAlert] = useState<any>({res:'',err:''})
    const [isDeleted, setIsDeleted] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null!)
    const divRef = useRef<HTMLDivElement>(null!)
    const passwordDivRef = useRef<HTMLDivElement>(null!)
    const alertDivRef = useRef<HTMLDivElement>(null!)
    const [isSubmit,setIsSubmit] = useState<boolean>(false)
    const [formErrors, setFormErrors] = useState<string|any>({})
    


    
    const validate = (values:string|any) =>{
        const errors:string|any = {};
        if (!values.password) {
            errors.password = "Password is required!";
          } else if (values.password.length < 8) {
            errors.password = "Password must be more than 8 characters!";
          } else if (values.password.length > 20) {
            errors.password = "Password cannot exceed more than 20 characters!";
          }
        if (!values.newPassword) {
            errors.newPassword = "Password is required!";
          } else if (values.newPassword.length < 8) {
            errors.newPassword = "Password must be more than 8 characters!";
          } else if (values.newPassword.length > 20) {
            errors.newPassword = "Password cannot exceed more than 20 characters!";
          }
          return errors; 
    }


    useEffect(() =>{
        if(toggle){
        passwordRef.current.focus()
        passwordDivRef.current.scrollIntoView({behavior:'smooth',inline:'start'})
        }else if(toggleDelete){
             divRef.current.scrollIntoView({behavior:'smooth'})
        }
    },[toggle,toggleDelete])

    useEffect(() =>{
        if(alert.res || alert.err){
            alertDivRef.current.scrollIntoView({behavior:'smooth'})
        }
    },[alert.res,alert.err])

    useEffect(()=>{
        if(isDeleted){
            window.alert("Account Deleted Successfully")
            localStorage.clear()                       
            navigate('/login')
        }
    },[isDeleted])

    const handleToggle = () =>{
        setToggleDelete(false)
        setToggle(true)
    }
    const handleToggleDelete = () =>{
        setToggleDelete(true)
        setToggle(false)
    }
    
    const handleDelete = async() =>{
        try {
          const response = await deleteUser(user.id)            
            setIsDeleted(true)                
            
        } catch (error:any) {
            setAlert({...alert,err:error.response.data.message})
        }
    }
   
    const handleSubmit =  async(e:any) =>{        
        e.preventDefault()
        setIsSubmit(true)
        setFormErrors(validate(formData))   
        if(Object.entries(formErrors).length === 0 && isSubmit){
         try {
          const {data} = await updatePassword(formData)          
          setAlert({...alert,res:data.message}) 
         } catch (error:any) {          
          setAlert({...alert,err:error.response.data.message})          
         }  
        }        
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
            <div  className={
                alert.res || alert.err?'flex-auto w-11/12 rounded-lg bg-yellow-100  h-[110vh] p-2 m-4'
                :'flex-auto w-11/12 rounded-lg bg-yellow-100  h-screen p-2 m-4'
                }>   
                           
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

                                <div ref={passwordDivRef}  className={toggle? ' ': 'hidden'}>
                                    <form action='submit' onSubmit={handleSubmit}>
                                        <div className=' flex mt-4 '>
                                            <p  className='w-[20%]'>Password</p>
                                            <div>
                                                <input ref={passwordRef}  type="password" className='input' onChange={(e) =>setFormData({...formData,password:e.target.value})} placeholder=''/>
                                            </div>
                                                <p className='text-red-400 ml-2'>{formErrors.password}</p>
                                        </div>                                         
                                        <div  className=' flex mt-4 '>
                                            <p  className='w-[20%]'>New Password</p>
                                            <div>
                                                <input type="password" className='input' onChange={(e) =>setFormData({...formData,newPassword:e.target.value})}  placeholder=''/>
                                            </div>
                                                <p className='text-red-400 ml-2'>{formErrors.newPassword}</p>
                                        </div>                                         
                                    </form>
                                    <div className='mt-2'>
                                        <button className='customButton ' onClick={handleSubmit}>Save Password</button>
                                        <button className='customButton ml-4' onClick={() => setToggle(false)}>Cancel</button>
                                    </div>
                                </div>

                                <div ref={divRef} className={toggleDelete? ' ' : 'hidden'}>
                                    <div className='w-[50%] h-24 rounded-md  flex justify-center bg-slate-500'>
                                        <div>
                                            <h6 className='text-center text-white'>Are you sure?</h6>
                                            <p className='text-red-200'>You cant recover your data after delete!!!</p>
                                            <div className='flex justify-center'>
                                                <button className='redButton' onClick={handleDelete}>Yes</button>
                                                <button className='customButton ml-4' onClick={() => setToggleDelete(false)}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ref={alertDivRef} className='flex mt-4 '>
                                    <Alerts alert={alert} setAlert={setAlert} />
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