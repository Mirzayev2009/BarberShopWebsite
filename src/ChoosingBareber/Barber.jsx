import React, { useState, useContext, useEffect } from "react";
import { DatabaseContext } from "../Database";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BarberCard = ({ barber, setGo }) => {
  const { 
    setSelectedBarber, 
    setSelectedTime, 
    setSelectedDate, 
    selectedBarber, 
    selectedTime, 
    selectedDate,
    setPersonalInfo 
  } = useContext(DatabaseContext);

  const [isSelected, setIsSelected] = useState(false);
  const [availableTimesToday, setAvailableTimesToday] = useState([]);
  const [availableTimesTomorrow, setAvailableTimesTomorrow] = useState([]);

  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  useEffect(() => {
    if (barber && barber.times) {
      setAvailableTimesToday(barber.times[todayDate] || []);
      setAvailableTimesTomorrow(barber.times[tomorrowDate] || []);
    }
  }, [barber, todayDate, tomorrowDate]);

  // Correct setter usage here:
  const handleTimeSelection = (time, date) => {
    setSelectedTime(time);
    setSelectedDate(date);

    setPersonalInfo((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: time,
    }));
    setGo(true);
  };

  const handleBarberSelection = () => {
    setSelectedBarber(barber);
    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
    }));
    setIsSelected(true);
    setGo(false);
  };

  const isBarberSelected = selectedBarber?.id === barber.id;

  const navigate = useNavigate()

  const handleOtherDay = () =>{
    selectedBarber(barber)
    selectedDate(null)
    selectedTime(null)
    setGo(false)
    navigate ("/choosingDate") 
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="col-md-4 col-sm-6 mb-4 mt-32"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`card shadow-lg rounded-4 p-4 transition-all duration-300 ease-in-out ${
          isBarberSelected ? "border-4 border-blue-500" : "border border-gray-300"
        }`}
      >
        {/* You can add barber image, name, reviews here */}

        {/* Times for Today */}
        <div className="mt-4">
          <h5 className="font-medium text-base">Bugun ({todayDate})</h5>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {availableTimesToday.length > 0 ? (
              availableTimesToday.map((time) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`btn ${
                    selectedTime === time && selectedDate === todayDate
                      ? "bg-blue-600 text-white"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleTimeSelection(time, todayDate)}
                  key={`today-${time}`}
                >
                  {time}
                </motion.button>
              ))
            ) : (
              <p className="text-muted">Bugun mavjud vaqtlar yo'q.</p>
            )}
          </div>
        </div>

        {/* Times for Tomorrow */}
        <div className="mt-4">
          <h5 className="font-medium text-base">Ertaga ({tomorrowDate})</h5>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {availableTimesTomorrow.length > 0 ? (
              availableTimesTomorrow.map((time) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={`tomorrow-${time}`}
                  className={`btn ${
                    selectedTime === time && selectedDate === tomorrowDate
                      ? "bg-blue-600 text-white"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleTimeSelection(time, tomorrowDate)}
                >
                  {time}
                </motion.button>
              ))
            ) : (
              <p className="text-muted">Ertaga mavjud vaqtlar yo'q.</p>
            )}
          </div>
        </div>

        {/* Barber selection button */}
        <motion.button
          className="btn btn-outline-primary w-full mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBarberSelection}
          disabled={isBarberSelected}
        >
          {isBarberSelected ? "Sartarosh tanlangan" : "Sartaroshni tanlash"}
        </motion.button>

       {(!selectedDate && !selectedTime || selectedDate && selectedTime === null ) ? (
        <button 
        className="btn btn-warning w-full mt-4"
        onClick={handleOtherDay}
        >
          Boshqa kunni tanlash
        </button>
       ) : null}
      </motion.div>
    </motion.div>
  );
};




const BarberList = ({ barbers}) => {
  const navigate = useNavigate();
  const [go, setGo] = useState(false);



  return (
    <motion.div className="row" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} setGo={setGo} availableTimes = {availableTimes} setAvailableTimes = {setAvailableTimes} selectedTime />
      ))}
      {go && (
        <motion.div
          className="text-center mt-4 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-2/3 h-16 text-lg"
            onClick={() => navigate("/choosinghaircut")}
          >
            Davom etish
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

const Barber = () => {
  const { dataBase,  } = useContext(DatabaseContext);
 const  barbers = dataBase

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
  return <BarberList barbers={dataBase} />;
};

export default Barber;