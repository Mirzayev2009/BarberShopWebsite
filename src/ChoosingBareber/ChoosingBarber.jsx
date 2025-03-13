
import React from 'react'
import Barber from './Barber'

const ChoosingBarber = () => {
  return (
    <div className='w-full h-screen '>
        <div className='w-full h-2/12 pl-32 pr-32 flex justify-between pt-8 pb-8 bg-amber-500 text-white '>
            <div className='w-1/2 h-full flex  gap-7 text-3xl'>
                <h1 className='cursor-pointer hover:scale-110 transition-transform'>Br.</h1>
                <h2 className='cursor-pointer hover:scale-110 transition-transform'>King Barber Shop</h2>
            </div>
            <div className='w-1/2 h-full flex  gap-4 text-3xl justify-end items-center'>
                <i className="bx bxs-user bx-md cursor-pointer hover:scale-120 transition-transform"></i> 
                <i className="bx bxs-phone bx-md  cursor-pointer hover:scale-120 transition-transform"></i> 
            </div>
        </div>
        <Barber/>
    </div>
  )
}

export default ChoosingBarber
