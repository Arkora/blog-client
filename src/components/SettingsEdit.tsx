import React,{useState,useEffect,useRef} from 'react'
import { updateUser,getUserById } from '../api';
import Alerts from './Alerts';
import { setUser } from '../localStorage';
interface Props{
    user: any;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsEdit = ({user,setEdit}:Props) => {
    const [formData, setFormData] = useState<any>({firstname:user.firstname,lastname:user.lastname,email:user.email})
    const [isSubmit,setIsSubmit] = useState<boolean>(false)
    const [formErrors, setFormErrors] = useState<string|any>({})
    const [alert,setAlert] = useState<any>({res:'',err:''})
    

    const validate = (values:string|any) =>{
        const errors:string|any = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if(!values.firstname){
            errors.firstname = "Name is required!"
          }
          if(!values.lastname){
            errors.lastname = "Last Name is required!"
          }

        if (!values.email) {
            errors.email = "Email is required!";
          } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
          }
          return errors; 
    }
    const handleSubmit = async (e:any) =>{
        e.preventDefault()
        setIsSubmit(true)
        setFormErrors(validate(formData))   
        if(Object.entries(formErrors).length === 0 && isSubmit){
         try {
          const {data} = await updateUser(user.id,formData)          
          setAlert({...alert,res:data.message})  
          const response = await getUserById(user.id)
          setUser(response.data)

         } catch (error:any) {          
          setAlert({...alert,err:error.response.data.message})          
         }  
        }        
      }

     
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className=' flex '>
                <label htmlFor="" className='w-[15%]'>First Name</label>
                <div>
                    <input type="text" className='input' onChange={(e)=>setFormData({...formData,firstname:e.target.value})} placeholder={formData.firstname} />
                    <p className='text-red-400'>{formErrors.firstname}</p>
                </div>
            </div>
            <div className=' flex mt-4 '>
                <label htmlFor="" className='w-[15%]'>Last Name</label>
                <div>
                    <input type="text" className='input' onChange={(e)=>setFormData({...formData,lastname:e.target.value})}  placeholder={formData.lastname} />
                    <p className='text-red-400'>{formErrors.lastname}</p>
                </div>
            </div>
            <div className=' flex mt-4 '>
                <label htmlFor="" className='w-[15%]'>Email</label>
                <div>
                    <input type="email" className='input' onChange={(e)=>setFormData({...formData,email:e.target.value})}  placeholder={formData.email} />
                    <p className='text-red-400'>{formErrors.email}</p>
                </div>
            </div>           
        </form>
        <div className='flex mt-8'>
            <button className='customButton' onClick={handleSubmit}>Save changes</button>
            <button className='customButton ml-4' onClick={() =>setEdit(false)}>Cancel</button>
        </div>
        <div  className='mt-4'>
            <Alerts alert={alert} setAlert={setAlert} />
        </div>
    </div>
  )
}

export default SettingsEdit