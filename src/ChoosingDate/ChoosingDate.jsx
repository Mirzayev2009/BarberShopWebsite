import React, { useContext, useState, useEffect } from "react";
import Nav from "../Nav";
import { MyDatePicker } from "@/components/ui/calendar";
import TimePicker from "./TimePicker";
import { DatabaseContext } from "../Database"; // ✅ Fix context import

const ChoosingDate = () => {
  const { setSelectedTime, setSelectedDate } = useContext(DatabaseContext); // ✅ Fix useContext
  const [choosenTime, setChoosenTime] = useState(null);
  const [choosenDay, setChoosenDay] = useState(null);

  // ✅ Update context only when choosenDay or choosenTime changes
  useEffect(() => {
    if (choosenDay) setSelectedDate(choosenDay);
    if (choosenTime) setSelectedTime(choosenTime);
  }, [choosenDay, choosenTime, setSelectedDate, setSelectedTime]);

  return (
    <div>
      <Nav />
      <div className="mt-28 flex flex-col md:flex-row h-screen bg-white shadow-md gap-2 p-6 items-center justify-center">
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <MyDatePicker setChoosenDay={setChoosenDay} />
        </div>
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <TimePicker setChoosenTime={setChoosenTime} />
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default ChoosingDate;

