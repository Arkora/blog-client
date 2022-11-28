import React,{useState} from 'react'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Login = () => {
  interface FormData{
    password:string;
    username:string;
  }
  interface PasswordReset{
    email:string;
  }

  const [showPassword, setShowPassword] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [formData,setFormData] = useState<FormData>({password:"",username:''})
  const [formDataReset,setFormDataReset] = useState<PasswordReset>({email:""})


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
  }
  return (
    <div>
      <div className='flex justify-center items-center '>
          <Link to='/'><h1 className='text-7xl font-thin'>Instablog</h1></Link>
        </div>
      <div className='flex h-screen '>
        <div className=' flex w-full justify-center items-center '>
          <div className='flex justify-center items-center bg-slate-50 h-3/4 w-3/4'>
              <div >
                <h1 className='text-5xl'>Login</h1>
                <h3 className='mt-2 text-2xl font-thin'>And Share your ideas</h3>
              </div>
            <div className='p-36 block'>
              <form className={toggle? 'hidden' : ''} onSubmit={handleSubmit}>
                <div>                  
                  <input type="text" placeholder='Username' className='input' />                
                </div>
                <div className='mt-4 relative'>                  
                  <input type={showPassword? 'text' : 'password'} placeholder='Password'  className='input' />
                  <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                </div>
                <h3 className='mt-2 text-sm underline text-cyan-700 cursor-pointer' onClick={()=>setToggle(!toggle)}>Forget Password</h3>
                <button className='customButton mt-6 '> Login</button>
              </form>
              <form className={toggle? '' : 'hidden'} onSubmit={handleSubmit}>
                <div>                  
                  <input type="text" placeholder='Email To Recover your password' className='input' />                
                </div>
                
                <h3 className='mt-2 text-sm underline text-cyan-700 cursor-pointer' onClick={()=>setToggle(!toggle)}>Login</h3>
                <button className='customButton mt-6 '> Recover Password</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login