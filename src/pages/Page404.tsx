import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='flex h-screen w-full justify-center items-center bg-white'>
        <div className=''>
            <h1>Error 404 Page Not Found </h1>  
            <Link to={'/'}> <button className='mt-10 p-2 h-10  bg-gray-900 text-white text-xl'>Navigate to Home</button></Link>
        </div>
    </div>
  )
}

export default Page404