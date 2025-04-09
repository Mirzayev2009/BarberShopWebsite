
import { useState } from "react";
function TimePicker({ setChoosenTime, selectedBarber, selectedDate }) {
  const [selectedTime, setSelectedTime] = useState(null);

  // Format date to match object keys
  const formattedDate = selectedDate?.toISOString().split("T")[0]; // "2025-04-09"
  const times = (selectedBarber.times?.[formattedDate]) || [];

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setChoosenTime(time);
    setTimeout(() => {
      toast.success(`Vaqt ${time}`);
    }, 10);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
      <h2 className="text-xl font-semibold mb-4">Aniq vaqtni tanlang</h2>

      {times.length > 0 ? (
        <div className="mb-4 w-full text-xl">
          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => (
              <button
                key={time}
                className={`p-3 text-xl rounded-lg transition ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
                onClick={() => handleTimeSelection(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Bu kunda mavjud vaqtlar yo‘q</p>
      )}

      <p className="mt-4 text-lg text-center text-gray-600">
        {selectedTime ? `Tanlangan vaqt: ${selectedTime}` : "Aniq vaqt tanlang"}
      </p>
    </div>
  );
}
 

export default TimePicker