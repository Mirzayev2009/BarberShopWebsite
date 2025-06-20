import React, { useContext, useState, useEffect } from "react";
import Nav from "@/Nav";
import { MyDatePicker } from "./calendar";
import TimePicker from "./TimePicker";
import { DatabaseContext } from "@/Database";
import { motion } from "framer-motion";

const ChoosingDate = () => {
  const {
    setSelectedTime,
    setSelectedDate,
    selectedBarber,
    availableTimes,
    selectedHaircut,
  } = useContext(DatabaseContext);

  const [choosenTime, setChoosenTime] = useState(null);
  const [choosenDay, setChoosenDay] = useState(null);

  // Sync local chosen date/time with global context
  useEffect(() => {
    if (choosenDay) setSelectedDate(choosenDay);
    if (choosenTime) setSelectedTime(choosenTime);
  }, [choosenDay, choosenTime, setSelectedDate, setSelectedTime]);

  // Show loading while no available times
  if (!availableTimes || availableTimes.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center px-4">
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
    );
  }

  return (
    <>
      <Nav />
      <motion.div
        className="flex flex-col md:flex-row h-fit bg-white gap-2 p-6 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Date picker on left */}
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <MyDatePicker setChoosenDay={setChoosenDay} />
        </div>

        {/* Time picker on right, shows only if a date is chosen */}
        {choosenDay && (
          <motion.div
            key={choosenDay.toISOString()} // ensures animation triggers when date changes
            className="w-full h-full shadow-md md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
          >
            <TimePicker
              setChoosenTime={setChoosenTime}
              availableTimes={availableTimes}
              selectedBarber={selectedBarber}
              selectedDate={choosenDay}
              selectedHaircut={selectedHaircut}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ChoosingDate;
