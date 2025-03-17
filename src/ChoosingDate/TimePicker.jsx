import React, { useState } from "react";

const timeSlots = {
  Kunduzi: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
  Kechasi: ["18:00", "18:30", "18:45"],
};

function TimePicker() {
  const [selectedTime, setSelectedTime] = useState(null);
  return (
   <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
    <h2 className="text-xl font-semibold mb-4">Aniq vaqtni tanlang</h2>
    {Object.entries(timeSlots).map(([period, times]) => (
      <div key={period} className="mb-4 w-full text-xl">
        <h3 className="text-lg font-medium  mb-2">{period}</h3>
        <div className="grid grid-cols-3 gap-3">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-3 text-xl rounded-lg transition  ${
                selectedTime === time
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    ))}
    <p className="mt-4 text-lg text-center text-gray-600">
      {selectedTime ? `Tanlangan vaqt: ${selectedTime}` : "Aniq vaqt tanlang"}
    </p>
     </div>
   );
}

export default TimePicker;
