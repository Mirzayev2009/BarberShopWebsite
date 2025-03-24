import * as React from "react";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function MyDatePicker({ setChoosenDay }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure no time component affects comparison
  
  const [selected, setSelected] = useState(null); // Default to today

  // ✅ Update chosen day when user selects a date
  useEffect(() => {
    setChoosenDay(selected);
  }, [selected, setChoosenDay]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 h-full">
      <DayPicker
        mode="single"
        className="text-xl"
        selected={selected}
        onSelect={setSelected}
        disabled={{ before: today }} // Disable past dates
        footer={selected ? `Tanlangan kun: ${new Intl.DateTimeFormat("uz-UZ").format(selected)}` : "Kunni tanlang"}
        classNames={{
          months: "flex flex-col gap-4",
          caption: "text-xl font-bold text-center",
          head_cell: "text-gray-500 text-lg",
          cell: "p-4 rounded-lg hover:bg-gray-200 transition",
          selected: "bg-black text-white rounded-full",
          today: "bg-yellow-400 text-black font-bold border-2 border-yellow-600 rounded-lg",
        }}
      />
    </div>
  );
}

export { MyDatePicker };


