import React, { useState, useContext, useEffect } from "react";
import { DatabaseContext } from "../Database";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

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
    setPersonalInfo,
  } = useContext(DatabaseContext);

  const [availableTimesToday, setAvailableTimesToday] = useState([]);
  const [availableTimesTomorrow, setAvailableTimesTomorrow] = useState([]);
  const [localSelectedTime, setLocalSelectedTime] = useState(null);
  const [localSelectedDate, setLocalSelectedDate] = useState(null);

  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const displayDate = (date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  useEffect(() => {
    if (barber?.availabletimes?.length) {
      setAvailableTimesToday(barber.availabletimes.filter(e => e.date === todayDate));
      setAvailableTimesTomorrow(barber.availabletimes.filter(e => e.date === tomorrowDate));
    }
  }, [barber]);

  const isBarberSelected = selectedBarber?.id === barber.id;
 const normalizeDate = (dateObjOrString) => {
  const date = new Date(dateObjOrString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const hasMatchingTime = barber.availabletimes?.some(
  (entry) =>
    entry.date === normalizeDate(selectedDate) &&
    entry.time === selectedTime?.time
);

  const disableSelection = selectedTime && selectedDate && !hasMatchingTime;

  const handleTimeSelection = (entry) => {
    setLocalSelectedTime(entry);
    setLocalSelectedDate(entry.date);
  };

  const handleBarberSelection = () => {
    const timeToUse = selectedTime || localSelectedTime;
    const dateToUse = selectedDate || localSelectedDate;

    if (!timeToUse || !dateToUse) return;

    setSelectedBarber(barber);
    setSelectedTime(timeToUse);
    setSelectedDate(dateToUse);

    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedTime: timeToUse,
      selectedDate: dateToUse,
    }));

    setGo(true);
  };

  const handleOtherDay = () => {
    setSelectedBarber(barber);
    setSelectedDate(null);
    setSelectedTime(null);
    setGo(false);
    navigate("/choosingDate");
  };

  const royalColors = {
    primary: "bg-blue-900",
    highlight: "text-yellow-400",
    border: "border-yellow-400",
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="col-md-4 col-sm-6 mb-4 mt-32"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`card shadow-xl rounded-4 p-10 transition-all duration-300 ease-in-out bg-white border-2 ${royalColors.border}`}
      >
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={barber.avatar || "https://via.placeholder.com/100x100?text=Avatar"}
            alt="Barber Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-900 object-cover"
          />
          <h3 className="mt-3 text-xl font-bold text-blue-900">{barber.name}</h3>
        </div>

        {/* Times for Today */}
        {!selectedTime && (
          <div className="mb-4">
            <h5 className="font-medium text-base text-blue-900">Bugun ({displayDate(today)})</h5>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableTimesToday.length > 0 ? (
                availableTimesToday.map((entry) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={`today-${entry.id}`}
                    className={`px-2 py-1 rounded-full text-sm border ${
                      localSelectedTime?.id === entry.id
                        ? "bg-blue-900 text-white"
                        : "border-blue-900 text-blue-900"
                    }`}
                    onClick={() => handleTimeSelection(entry)}
                  >
                    {entry.time.slice(0, 5)}
                  </motion.button>
                ))
              ) : (
                <p className="text-sm text-gray-500">Bo‘sh vaqt yo‘q</p>
              )}
            </div>
          </div>
        )}

        {/* Times for Tomorrow */}
        {!selectedTime && (
          <div className="mb-4">
            <h5 className="font-medium text-base text-blue-900">Ertaga ({displayDate(tomorrow)})</h5>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableTimesTomorrow.length > 0 ? (
                availableTimesTomorrow.map((entry) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={`tomorrow-${entry.id}`}
                    className={`px-2 py-1 rounded-full text-sm border ${
                      localSelectedTime?.id === entry.id
                        ? "bg-blue-900 text-white"
                        : "border-blue-900 text-blue-900"
                    }`}
                    onClick={() => handleTimeSelection(entry)}
                  >
                    {entry.time.slice(0, 5)}
                  </motion.button>
                ))
              ) : (
                <p className="text-sm text-gray-500">Bo‘sh vaqt yo‘q</p>
              )}
            </div>
          </div>
        )}

        {/* Select Button */}
        <motion.button
          whileTap={!disableSelection ? { scale: 0.95 } : {}}
          onClick={!disableSelection ? handleBarberSelection : undefined}
          disabled={disableSelection}
          className={`w-full py-2 rounded-full font-medium transition-all ${
            disableSelection
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isBarberSelected
              ? "bg-yellow-400 text-blue-900 cursor-default"
              : "border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          }`}
        >
          {disableSelection
            ? "Bu sartaroshda bu vaqt yo‘q"
            : isBarberSelected
            ? "Sartarosh tanlangan"
            : "Tanlash"}
        </motion.button>

        {/* Other Day */}
        {!selectedTime && !localSelectedTime && (
          <button
            className="mt-3 w-full py-2 rounded-full bg-yellow-400 text-blue-900 font-semibold"
            onClick={handleOtherDay}
          >
            Boshqa kunni tanlash
          </button>
        )}

        {/* Social Media */}
        <div className="flex justify-center gap-5 mt-6">
          {barber.instagram && (
            <a
              href={barber.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-yellow-400 text-xl"
            >
              <FaInstagram />
            </a>
          )}
          {barber.telegram && (
            <a
              href={barber.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-yellow-400 text-xl"
            >
              <FaTelegramPlane />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};




const BarberList = ({ barbers}) => {
  const navigate = useNavigate();
  const [go, setGo] = useState(false);



  return (
    <motion.div className="row pt-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
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



  return <BarberList  barbers={dataBase} />;
};

export default Barber;