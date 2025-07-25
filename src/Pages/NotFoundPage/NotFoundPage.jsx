import React from 'react'
import notFoundImg from '../../assets/images/ima/404.png'
export default function NotFoundPage() {
  return (
    <>
    <div className='flex flex-col items-center justify-center mt-[13vh] bg-white'>
      <img src={notFoundImg} className='' alt="Not Found Page" />
      <h2 className='text-main font-black text-4xl my-5'>
        Oops! Page Not Found 
      </h2>
      <p className='text-slate-600  leading-1.2 my-3 text-center '>
        The Page You`re Looking For Seems To Have Gone Shopping! <br /> Don`t Worry Our Fresh Products Are Still Available For You 
      </p>
    </div>
    </>
  ) 
}
