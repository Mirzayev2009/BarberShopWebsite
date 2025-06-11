import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import barberCuttingHair from "../images/barber-cutting-hair.jpg";

const Homepage = () => {
  const [showContact, setShowContact] = useState(false);
const contactRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (contactRef.current && !contactRef.current.contains(event.target)) {
      setShowContact(false);
    }
  }

  if (showContact) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showContact]);


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
        <div className="w-1/2 flex justify-end gap-3.5 mt-6 relative">
          <i className="bx bxs-user bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"></i>
          <div className="relative">
            <i
              className="bx bxs-phone bx-md mt-5 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setShowContact(prev => !prev)}
            ></i>

            <AnimatePresence>
              {showContact && (
                <motion.div
  ref={contactRef}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }}
  className="absolute right-2 top-full mt-2 w-[90vw] max-w-xs sm:right-0 sm:w-64 bg-white text-black p-4 rounded-lg shadow-xl z-50 text-sm space-y-2"

                >
                  <p className="font-semibold text-lg">📞 +998 90 123 45 67</p>
                  <div className="flex space-x-3 text-lg">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-facebook text-2xl text-blue-600 hover:scale-110 transition-transform"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-instagram text-2xl text-pink-500 hover:scale-110 transition-transform"></i>
                    </a>
                    <a href="https://t.me/yourbarbershop" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-telegram text-2xl text-sky-500 hover:scale-110 transition-transform"></i>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="w-full flex flex-col items-center justify-center space-y-4 text-white rounded-lg p-4 sm:p-6 pb-8"
      >
        <Link to="/choosingbarber" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block no-underline">
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 0.9, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5 }}
            className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30"
          >
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bxs-group text-3xl sm:text-4xl text-white"></i>
              <span className="text-[14px] sm:text-base text-white">Sartarosh tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>

        <Link to="/choosingdate" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block no-underline">
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 0.8, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.7 }}
            className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30"
          >
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bxs-calendar text-3xl sm:text-4xl text-white"></i>
              <span className="text-[14px] sm:text-base text-white">Kun va vaqtni tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>

        <Link to="/choosinghaircut" className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 block no-underline">
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 0.7, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.9 }}
            className="flex items-center justify-between p-4 border rounded-lg bg-opacity-30"
          >
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-110">
              <i className="bx bx-cut text-3xl sm:text-4xl text-white"></i>
              <span className="text-[14px] sm:text-base text-white">Soch-turmak turini tanlang</span>
            </div>
            <i className="bx bx-chevron-right text-3xl sm:text-4xl transform transition-transform hover:scale-140 text-white"></i>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Homepage;
