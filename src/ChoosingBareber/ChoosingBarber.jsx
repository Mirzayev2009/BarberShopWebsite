
import React, { useContext, useEffect, useState } from 'react'
import Barber from './Barber'
import Nav from '../Nav'
import { DatabaseContext } from '@/DataBase'
import { Toaster } from 'sonner'
import { motion } from "framer-motion";


const ChoosingBarber = () => {
  
  const {setSelectedBarber, dataBase} = useContext(DatabaseContext)

  const [choosenBarber, setChoosenBarber] = useState()

  const barbers = dataBase

  useEffect(() => {
    if(choosenBarber) setSelectedBarber(choosenBarber)
  }, [choosenBarber, setSelectedBarber])
    if(!barbers || barbers.length === 0){
    return <div className="w-full h-screen flex justify-center items-center px-4">
  <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] p-6 bg-amber-500 rounded-3xl flex justify-center items-center">
    <motion.h1
      className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        animate={{
          scale: [1, 0, 1],
          opacity: [1, 0.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.span>
    </motion.h1>
  </div>
</div>
  }

  return (
    <div className='w-full h-full '>
        <Nav className = "mb-24"/>
        <Barber setChoosenBarber = {setChoosenBarber} className="mt-24 "/>
        <Toaster/>
    </div>
  )
}

export default ChoosingBarber
