import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import barberCuttingHair from "../images/barber-cutting-hair.jpg";

const Homepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full min-h-screen bg-cover bg-center px-6 md:px-20 lg:px-32"
      style={{ backgroundImage: `url(${barberCuttingHair})` }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-36 flex justify-between text-3xl pr-20 pl-20 sm:text-4xl md:text-5xl text-white"
      >
        <div className="mt-18 transform transition-transform hover:scale-110">BR.</div>
        <div className="w-1/2 flex justify-end gap-3.5 mt-6">
          <i className="bx bxs-user bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"></i>
          <i className="bx bxs-phone bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"></i>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full h-52 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-white font-serif text-center"
      >
        <div className="w-full md:w-1/2 h-fit flex flex-col justify-center items-center flex-wrap space-y-2">
          <h1 className="transform transition-transform hover:scale-110">King Barber Shop</h1>
          <p className="text-[18px] sm:text-[22px] md:text-[25px] text-gray-100 transform transition-transform hover:scale-110">
            Samarqand - Ali Qushchi - 17-uy
          </p>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full flex flex-col items-center justify-center space-y-4 text-white rounded-lg p-4 sm:p-6 pb-8"
      >
        <Link to="/choosingbarber" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30">
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bxs-group text-3xl sm:text-4xl text-white"></i>
              <span className="text-base sm:text-lg text-white">Sartarosh tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>

        <Link to="/choosingdate" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30">
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bxs-calendar text-3xl sm:text-4xl text-white"></i>
              <span className="text-base sm:text-lg text-white">Kun va vaqtni tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>

        <Link to="/choosinghaircut" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30">
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bx-cut text-3xl sm:text-4xl text-white"></i>
              <span className="text-base sm:text-lg text-white">Soch-turmak turini tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Homepage;