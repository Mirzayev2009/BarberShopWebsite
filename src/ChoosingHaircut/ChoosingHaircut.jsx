import React, { useContext, useEffect, useState } from 'react';
import Nav from '../Nav';
import HaircutList from './HairCutCard';
import { DatabaseContext } from '@/DataBase';

const ChoosingHaircut = () => {
  const {setSelectedHaircut}  = useContext(DatabaseContext)
  const [choosenHaircut, setChoosenHaircut] = useState()

  useEffect(()=> {
    if(choosenHaircut) setSelectedHaircut(choosenHaircut)
  }, [choosenHaircut, setSelectedHaircut])

  return (
    <div className='w-full h-full flex flex-col '>
       <Nav />
      <main className='w-full flex flex-col items-center pt-4 pl-5 pr-5 mt-28'>
        <div className='w-full max-w-lg text-center'>
          <h1 className='text-3xl font-bold mb-4'>Soch-turmak tanlang</h1>
        </div>
        <div className='flex'>
          <HaircutList setChoosenHaircut = {setChoosenHaircut} />
        </div>
      </main>
    </div>
  );
};

export default ChoosingHaircut;
