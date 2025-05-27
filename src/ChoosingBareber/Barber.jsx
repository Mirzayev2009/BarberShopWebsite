import React, { useState, useContext, useEffect } from "react";
import { DatabaseContext } from "../Database";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { newDate } from "react-datepicker/dist/date_utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BarberCard = ({ barber, setGo }) => {
  const { setSelectedBarber, setSelectedTime, setSelectedDate, setPersonalInfo } = useContext(DatabaseContext);
  const [isSelected, setIsSelected] = useState(false);
  const [availableTimesToday, setAvailableTimesToday] = useState([]);
  const [availableTimesTomorrow, setAvailableTimesTomorrow] = useState([]);
  const [selectedTime, setSelectedTimeLocal] = useState(null);
  const [selectedDate, setSelectedDateLocal] = useState("");


  const formatDate = (date)=> {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear()

    return `${dd}-${mm}-${yyyy}`
  }

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const todayDate = formatDate(today)
  const tomorrowDate = formatDate(tomorrow)

  // useEffect(() => {
  //   if (barber && barber.times) {
  //     setAvailableTimesToday(barber.times[todayDate] || []);
  //     setAvailableTimesTomorrow(barber.times[tomorrowDate] || []);
  //   }
  // }, [barber, todayDate, tomorrowDate]);

  useEffect(()=>{
    if(barber && barber.times) {
      setAvailableTimesToday(barber.times[todayDate] || []);
      setAvailableTimesTomorrow(barber.times[tomorrowDate] || [])
    }
  }, [barber, todayDate, tomorrowDate])

  const handleTimeSelection = (time, date) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedBarber(barber);
    setSelectedTimeLocal(time);
    setSelectedDateLocal(date);

    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedTime: time,
      selectedDate: date,
    }));
    setGo(true);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="col-md-4 col-sm-6 mb-4 mt-32"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`card shadow-lg rounded-4 p-4 transition-all duration-300 ease-in-out ${isSelected ? "border-4 border-blue-500" : "border border-gray-300"}`}
      >
        <motion.img
          src={barber.image}
          alt={barber.name}
          className="card-img-top rounded-full mx-auto d-block"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="card-body text-center">
          <h5 className="card-title font-semibold text-lg">{barber.name}</h5>
          <p className="card-text text-muted">Reviews: {barber.reviews}</p>

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

          <div className="mt-4">
            <h5 className="font-medium text-base">Ertaga ({tomorrowDate})</h5>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {availableTimesTomorrow.length > 0 ? (
                availableTimesTomorrow.map((time) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={`tomorrow-${time}`}
                    className="btn btn-outline-primary"
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
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`btn btn-outline-primary w-full mt-4 ${isSelected ? "disabled" : ""}`}
          onClick={() => {
            setIsSelected(true);
            setSelectedBarber(barber);
          }}
          disabled={isSelected}
        >
          {isSelected ? "Boshqa kunni tanlash" : "Boshqa kun tanlanadi"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const BarberList = ({ barbers }) => {
  const navigate = useNavigate();
  const [go, setGo] = useState(false);

  if (!barbers || barbers.length === 0) {
    return <p className="text-center">No barbers available at the moment.</p>;
  }

  return (
    <motion.div className="row" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} setGo={setGo} />
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
  const { dataBase } = useContext(DatabaseContext);
  return <BarberList barbers={dataBase} />;
};

export default Barber;