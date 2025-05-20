import React, { useContext, useEffect, useState } from 'react';
import Nav from '../Nav';
import HaircutList from './HairCutCard';
import { DatabaseContext } from '@/DataBase';
import { motion } from 'framer-motion';

const ChoosingHaircut = () => {
  const { setSelectedHaircut } = useContext(DatabaseContext);
  const [choosenHaircut, setChoosenHaircut] = useState();

  useEffect(() => {
    if (choosenHaircut) setSelectedHaircut(choosenHaircut);
  }, [choosenHaircut, setSelectedHaircut]);

  return (
    <motion.div 
      className='w-full h-full flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Nav />
      <main className='w-full flex flex-col items-center pt-4 pl-5 pr-5 mt-28'>
        <motion.div 
          className='w-full max-w-lg text-center'
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className='text-3xl font-bold mb-4'>Soch-turmak tanlang</h1>
        </motion.div>

        <motion.div 
          className='flex'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HaircutList setChoosenHaircut={setChoosenHaircut} />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default ChoosingHaircut;
