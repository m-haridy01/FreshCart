import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ToHome() {
    let navigate = useNavigate()
  return (
    <button onClick={()=>navigate(-1)} className='bg-main cursor-pointer text-white dark:text-amber-700 flex items-center justify-center p-1 hover:-translate-x-1.5 hover:scale-[1.1] transition-all duration-500 rounded-full '>
        <ArrowLeft />
    </button>
  )
}
