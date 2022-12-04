import React,{useState} from 'react'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../api'
import { setUser } from '../localStorage'
const Login = () => {
  interface FormData{
    password:string;
    username:string;
  }
  

  const [showPassword, setShowPassword] = useState(false)  
  const [formData,setFormData] = useState<FormData>({password:"",username:''})  
  const [formErrors, setFormErrors] = useState<any|string>({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [err, setErr] = useState<string>("")
  

  const navigate = useNavigate()

  const validate = (values:any) =>{
    const errors:string|any = {};
    
    if(!values.username){
      errors.username = "Username is required!"
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters!";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters!";
    }
    return errors
  }


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setIsSubmit(true)
    setFormErrors(validate(formData))   
    if(Object.entries(formErrors).length === 0 && isSubmit){
        try {
          const response = await login(formData)
          setUser(response.data)          
          navigate('/')          
        } catch (error:any) {
          setErr(error.response.data.message)
        }
    }
  }
  return (
    <div>
      <div className='flex justify-center items-center '>
          <Link to='/'><h1 className='text-7xl font-thin'>Instablog</h1></Link>
        </div>
      <div className='flex h-screen '>
        <div className=' flex w-full justify-center  items-center '> 
        <div className='block  bg-slate-50 h-3/4 w-3/4'> 
        <div className='flex mt-4 justify-center'>
            <div className={err?'bg-slate-300 p-6 h-20 w-80 rounded-lg block':'hidden'}>
                <div className='relative'>
                  <p className='text-red-600 font-normal text-lg'>{err}</p>
                  <span className='absolute -top-5 -right-6 pr-3 flex items-center  cursor-pointer ins text-white' onClick={() =>setErr("")}>X</span>
                </div>
            </div>         
          </div> 
          <div className='flex justify-center items-center '>
              <div >
                <h1 className='text-5xl'>Login</h1>
                <h3 className='mt-2 text-2xl font-thin'>And Share your ideas</h3>
              </div>
            <div className='p-36 block'>
              <form  onSubmit={handleSubmit}>
                <div>                  
                  <input type="text" placeholder='Username' className='input' onChange={(e) =>setFormData({...formData,username:e.target.value}) }/> 
                  <p className='text-red-400'>{formErrors.username}</p>               
                </div>
                  <div className='block'>
                    <div className='mt-4 relative'>                  
                      <input type={showPassword? 'text' : 'password'} placeholder='Password'  className='input' onChange={(e) =>setFormData({...formData,password:e.target.value}) } />
                      <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                    </div>
                    <p className='text-red-400'>{formErrors.password}</p>
                  </div>
                  <button className='customButton mt-6 '> Login</button>
                </form>              
              </div>
            </div>
          </div>
        </div> 

      </div>
    </div>
  )
}

export default Login