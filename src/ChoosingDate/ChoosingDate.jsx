 import React, { useContext, useState, useEffect } from "react";
import Nav from "../Nav";
import { MyDatePicker } from "@/ChoosingDate/calendar";
import TimePicker from "./TimePicker";
import { DatabaseContext } from "@/Database";
import { motion } from "framer-motion";

const ChoosingDate = () => {
  const { setSelectedTime, setSelectedDate, selectedBarber } =
    useContext(DatabaseContext);
  const [choosenTime, setChoosenTime] = useState(null);
  const [choosenDay, setChoosenDay] = useState(null);

  useEffect(() => {
    if (choosenDay) setSelectedDate(choosenDay);
    if (choosenTime) setSelectedTime(choosenTime);
  }, [choosenDay, choosenTime, setSelectedDate, setSelectedTime]);

  return (
    <>
      <Nav />
      <motion.div
        className="mt-28 flex flex-col md:flex-row h-screen bg-white shadow-md gap-2 p-6 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <MyDatePicker setChoosenDay={setChoosenDay} />
        </div>
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <TimePicker setChoosenTime={setChoosenTime} selectedBarber={selectedBarber} selectedDate={choosenDay} />
        </div>
      </motion.div>
    </>
  );
};

export default ChoosingDate;
