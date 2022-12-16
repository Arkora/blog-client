import React,{useState,useEffect,useRef} from 'react'

interface Props{
    user: any;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsEdit = ({user,setEdit}:Props) => {
    const [formData, setFormData] = useState<any>({firstname:user.firstname,lastname:user.lastname,email:user.email})
    
  return (
    <div>
        <form action="submit">
            <div className=' flex '>
                <label htmlFor="" className='w-[15%]'>First Name</label>
                <div>
                    <input type="text" className='input' placeholder={formData.firstname} />
                </div>
            </div>
            <div className=' flex mt-4 '>
                <label htmlFor="" className='w-[15%]'>Last Name</label>
                <div>
                    <input type="text" className='input'  placeholder={formData.lastname} />
                </div>
            </div>
            <div className=' flex mt-4 '>
                <label htmlFor="" className='w-[15%]'>Email</label>
                <div>
                    <input type="email" className='input'  placeholder={formData.email} />
                </div>
            </div>           
        </form>
        <div className='flex mt-8'>
            <button className='customButton'>Save changes</button>
            <button className='customButton ml-4' onClick={() =>setEdit(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default SettingsEdit