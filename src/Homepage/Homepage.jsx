import React from 'react';
import { Link } from 'react-router-dom';
import barberCuttingHair from "../images/barber-cutting-hair.jpg";

const Homepage = () => {
  return (
    <div 
      className='w-full h-screen bg-cover bg-center pl-88 pr-88' 
      style={{ backgroundImage: `url(${barberCuttingHair})` }}
    >
      <div className='w-full h-36 flex justify-between text-5xl text-white'>
        <div className='mt-6 transform transition-transform hover:scale-110'>BR.</div> 
        <div className='w-1/2 flex justify-end gap-3.5 mt-5'> 
          <i className="bx bxs-user bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"></i> 
          <i className="bx bxs-phone bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"></i> 
        </div>
      </div>

      <div className='w-full h-52 flex items-center justify-center  text-6xl text-white font-serif'>
         <div className='w-1/2 h-fit flex justify-center items-center flex-wrap'>
            <h1 className='transform transition-transform hover:scale-110'>King Barber Shop</h1>
            <p className='text-[25px] text-gray-100 transform transition-transform hover:scale-110'>Samarqand - Ali Qushchi - 17-uy</p>
         </div>
      </div>

      <div className='w-full h-80 flex flex-col items-center justify-center space-y-4 text-white rounded-lg p-6'>
        
        {/* Link to ChoosingBarber */}
        <Link to="/choosingbarber" className='w-5/6 block'>
          <div className='flex items-center justify-between p-4 border rounded-lg transition-transform hover:scale-105'>
            <div className='flex items-center space-x-3 transform transition-transform hover:scale-110'>
              <i className='bx bxs-group text-4xl'></i>
              <span className='text-lg'>Sartarosh tanlang</span>
            </div>
            <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
          </div>
        </Link>

        {/* Link to ChoosingDate */}
        <Link to="/choosingdate" className='w-5/6 block'>
          <div className='flex items-center justify-between p-4 border rounded-lg transition-transform hover:scale-105'>
            <div className='flex items-center space-x-3 transform transition-transform hover:scale-110'>
              <i className='bx bxs-calendar text-4xl'></i>
              <span className='text-lg'>Kun va vaqtni tanlang</span>
            </div>
            <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
          </div>
        </Link>

        {/* Link to ChoosingHaircut */}
        <Link to="/choosinghaircut" className='w-5/6 block'>
          <div className='flex items-center justify-between p-4 border rounded-lg transition-transform hover:scale-105'>
            <div className='flex items-center space-x-3 transform transition-transform hover:scale-110'>
              <i className='bx bx-cut text-4xl'></i>
              <span className='text-lg'>Soch-turmak turini tanlang</span>
            </div>
            <i className='bx bx-chevron-right text-4xl transform transition-transform hover:scale-140'></i>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Homepage;


