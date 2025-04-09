import React, { useState } from "react";
import { toast } from "sonner";

function TimePicker({ setChoosenTime, selectedBarber }) {
  const [selectedTime, setSelectedTime] = useState(null);

  const times = selectedBarber.times || ["17:00"]; // Ensure it's an array

  // ✅ Update chosen time when user selects a time slot
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setChoosenTime(time);
    setTimeout(() => { 
      toast.success(`Vaqt ${time}`);
    }, 10); // Small delay ensures correct state update
  };
  
  console.log(selectedTime);
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
      <h2 className="text-xl font-semibold mb-4">Aniq vaqtni tanlang</h2>
      <div className="mb-4 w-full text-xl">
        <div className="grid grid-cols-3 gap-3">
          {times.map((time) => (
            <button
              key={time}
              className={`p-3 text-xl rounded-lg transition ${
                selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-lg text-center text-gray-600">
        {selectedTime ? `Tanlangan vaqt: ${selectedTime}` : "Aniq vaqt tanlang"}
      </p>
    </div>
  );
}

export default TimePicker;
