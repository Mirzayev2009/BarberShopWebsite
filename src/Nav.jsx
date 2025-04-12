import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full px-4 md:px-16 flex flex-col md:flex-row justify-between items-center py-4 bg-amber-500 text-white shadow-lg fixed top-0 left-0 z-50'>
      {/* Logo and Brand */}
      <div
        className='flex flex-col md:flex-row gap-2 md:gap-7 text-2xl md:text-3xl items-center cursor-pointer'
        onClick={() => navigate("/")}
      >
        <h1 className='hover:scale-110 transition-transform'>Br.</h1>
        <h2 className='hover:scale-110 transition-transform text-center'>King Barber Shop</h2>
      </div>

      {/* Icons */}
      <div className='flex gap-4 text-2xl md:text-3xl mt-4 md:mt-0 items-center'>
        <i className="bx bxs-user cursor-pointer hover:scale-110 transition-transform"></i>
        <i className="bx bxs-phone cursor-pointer hover:scale-110 transition-transform"></i>
      </div>
    </div>
  )
}

export default Nav
