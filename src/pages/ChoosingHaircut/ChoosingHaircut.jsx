import React, { useContext, useEffect, useState } from 'react';
import Nav from '@/Nav';
import HaircutList from './HairCutCard';
import { DatabaseContext } from '@/DataBase';
import { motion } from 'framer-motion';

const ChoosingHaircut = () => {
  const { setSelectedHaircut, haircutData } = useContext(DatabaseContext);
  const [choosenHaircut, setChoosenHaircut] = useState();

  useEffect(() => {
    if (choosenHaircut) setSelectedHaircut(choosenHaircut);
  }, [choosenHaircut, setSelectedHaircut]);

  if(!haircutData || haircutData.length === 0){
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
 </div>}

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
