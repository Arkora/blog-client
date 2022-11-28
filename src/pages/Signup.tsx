import React,{useState} from 'react'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'
import { Link} from 'react-router-dom'

const Signup = () => {
    interface SignupData{
        name:string;
        lastname:string;
        password:string;
        username:string;
    }
    const [showPassword, setShowPassword] = useState(false)
    const [formData,setFormData] = useState<SignupData>({name:'',lastname:'',password:"",username:''})

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
      }
  return (
    <div className='block'>
        <div className='flex justify-center items-center pt-4'>
        <Link to='/'><h1 className='text-7xl font-thin'>Instablog</h1></Link>
        </div>
        <div className='flex h-screen '>
          <div className='items-center justify-center'>            
          </div>
        <div className=' flex w-full justify-center items-center '>
          <div className='flex justify-center items-center bg-slate-50 h-3/4 w-3/4'>
              <div className='pl-12'>
                <h1 className='text-5xl'>Sign up</h1>
                <h3 className='mt-2 text-2xl font-thin'>And Share your ideas</h3>
              </div>
            <div className='p-36 block'>
              <form onSubmit={handleSubmit} >
                <div className='flex '>
                    <div>
                        <input type="text" placeholder='Name' className='input' />
                    </div>
                    <div className='ml-2'>
                        <input type="text" placeholder='Last Name' className='input ' />                    
                    </div>
                </div>                
                <div className='mt-2'>
                    <input type="text" placeholder='Email' className='input' />
                </div>
                <div className='mt-2'>
                    <input type="text" placeholder='Username' className='input' />
                </div>
                <div className='flex mt-2 '>
                    <div className=' relative'>                  
                        <input type={showPassword? 'text' : 'password'} placeholder='Password'  className='input' />
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                    </div>
                    <div className='ml-2 relative'>                  
                        <input type={showPassword? 'text' : 'password'} placeholder='Repeat Password'  className='input' />
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                    </div>
                </div> 
                <div className='mt-8 flex justify-center items-center'>
                    <button className='customButton '>Create Account</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>

      </div>   
    </div>
)
}

export default Signup