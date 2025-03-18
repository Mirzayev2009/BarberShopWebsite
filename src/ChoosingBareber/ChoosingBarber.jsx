
import React, { useContext, useEffect, useState } from 'react'
import Barber from './Barber'
import Nav from '../Nav'
import { DatabaseContext } from '@/DataBase'
import { Toaster } from 'sonner'


const ChoosingBarber = () => {
  
  const {setSelectedBarber} = useContext(DatabaseContext)

  const [choosenBarber, setChoosenBarber] = useState()

  useEffect(() => {
    if(choosenBarber) setSelectedBarber(choosenBarber)
  }, [choosenBarber, setSelectedBarber])

  return (
    <div className='w-full h-full '>
        <Nav/>
        <Barber setChoosenBarber = {setChoosenBarber}/>
        <Toaster/>
    </div>
  )
}

export default ChoosingBarber
