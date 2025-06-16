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
    setPersonalInfo,
  } = useContext(DatabaseContext);

  const [availableTimesToday, setAvailableTimesToday] = useState([]);
  const [availableTimesTomorrow, setAvailableTimesTomorrow] = useState([]);
  const [localSelectedTime, setLocalSelectedTime] = useState(null); // <-- NEW
  const [localSelectedDate, setLocalSelectedDate] = useState(null); // <-- NEW

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const displayDate = (date) => `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  useEffect(() => {
    if (barber && Array.isArray(barber.availabletimes)) {
      setAvailableTimesToday(barber.availabletimes.filter((entry) => entry.date === todayDate));
      setAvailableTimesTomorrow(barber.availabletimes.filter((entry) => entry.date === tomorrowDate));
    }
  }, [barber]);

  const handleTimeSelection = (entry) => {
    setLocalSelectedTime(entry);
    setLocalSelectedDate(entry.date);
  };

  const handleBarberSelection = () => {
    if (!localSelectedTime) return;

    setSelectedBarber(barber);
    setSelectedTime(localSelectedTime);
    setSelectedDate(localSelectedDate);
    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedDate: localSelectedDate,
      selectedTime: localSelectedTime,
    }));
    setGo(true);
  };

  const isBarberSelected = selectedBarber?.id === barber.id;
  const navigate = useNavigate();

  const handleOtherDay = () => {
    setSelectedBarber(barber);
    setSelectedDate(null);
    setSelectedTime(null);
    setGo(false);
    navigate("/choosingDate");
  };

  console.log(selectedBarber);
  

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
        {/* Times for Today */}
        <div className="mt-4">
          <h5 className="font-medium text-base">Bugun ({displayDate(today)})</h5>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {availableTimesToday.length > 0 ? (
              availableTimesToday.map((entry) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={`today-${entry.id}`}
                  className={`btn ${
                    localSelectedTime?.id === entry.id ? "bg-blue-600 text-white" : "btn-outline-primary"
                  }`}
                  onClick={() => handleTimeSelection(entry)}
                >
                  {entry.time.slice(0, 5)}
                </motion.button>
              ))
            ) : (
              <p className="text-muted">Bugun mavjud vaqtlar yo'q.</p>
            )}
          </div>
        </div>

        {/* Times for Tomorrow */}
        <div className="mt-4">
          <h5 className="font-medium text-base">Ertaga ({displayDate(tomorrow)})</h5>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {availableTimesTomorrow.length > 0 ? (
              availableTimesTomorrow.map((entry) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={`tomorrow-${entry.id}`}
                  className={`btn ${
                    localSelectedTime?.id === entry.id ? "bg-blue-600 text-white" : "btn-outline-primary"
                  }`}
                  onClick={() => handleTimeSelection(entry)}
                >
                  {entry.time.slice(0, 5)}
                </motion.button>
              ))
            ) : (
              <p className="text-muted">Ertaga mavjud vaqtlar yo'q.</p>
            )}
          </div>
        </div>

        {/* Barber selection */}
        <motion.button
          className="btn btn-outline-primary w-full mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBarberSelection}
          disabled={isBarberSelected}
        >
          {isBarberSelected ? "Sartarosh tanlangan" : "Sartaroshni tanlash"}
        </motion.button>

        {/* Other day option */}
  {!localSelectedTime && (
  <button className="btn btn-warning w-full mt-4" onClick={handleOtherDay}>
    Boshqa kunni tanlash
  </button>
)}

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
        <BarberCard key={barber.id} barber={barber} setGo={setGo}  />
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



  return <BarberList barbers={dataBase} />;
};

export default Barber;