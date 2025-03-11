import React from 'react';
import barberCuttingHair from "../images/barber-cutting-hair.jpg";

const Homepage = () => {
  return (
    <div 
      className='w-full h-screen bg-cover bg-center pl-96 pr-96' 
      style={{ backgroundImage: `url(${barberCuttingHair})` }}
    >
      <div className=' w-full h-36 flex justify-between text-5xl text-white'>
        <div className='mt-3 transform transition-transform hover:scale-110 '>BR.</div> 
        <div> 
          <i className="bx bxs-user bx-md mt-5 transform transition-transform hover:scale-120 "></i>  
        </div>
      </div>
      <div className='w-full h-52 flex items-center justify-center text-5xl text-white font-serif '>
        <h1 className='transform transition-transform hover:scale-110'>Samarqand - Ali Qushchi - 17-uy</h1>
      </div>
      <div className='w-full h-80 flex flex-col items-center justify-center space-y-4 text-white  rounded-lg p-6'>
        <div className='w-full flex items-center justify-between p-4 border-1 rounded-lg transition-transform hover:scale-105'>
          <div className='flex items-center space-x-3 hover:text-4xl transform transition-transform hover:scale-110'>
            <i className='bx bxs-group text-4xl '></i>
            <span className='text-lg'>Sartarosh tanlang</span>
          </div>
          <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
        </div>
        <div className='w-full flex items-center justify-between p-4 border-1 rounded-lg transition-transform hover:scale-105'>
          <div className='flex items-center space-x-3 transform transition-transform hover:scale-110'>
            <i className='bx bxs-calendar text-4xl'></i>
            <span className='text-lg'>Kun va vaqtni tanlang</span>
          </div>
          <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
        </div>
        <div className='w-full flex items-center justify-between p-4 border-1 rounded-lg transition-transform hover:scale-105'>
          <div className='flex items-center space-x-3 transform transition-transform hover:scale-110'>
            <i className='bx bx-cut text-4xl'></i>
            <span className='text-lg'>Soch-turmak turini tanlang</span>
          </div>
          <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
        </div>
      </div>
    </div>
  );
}

export default Homepage;


