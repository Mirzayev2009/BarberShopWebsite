import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function TimePicker({ setChoosenTime, selectedBarber, selectedDate }) {
  const [selectedTime, setSelectedTime] = useState(null);

  const formattedDate = selectedDate?.toISOString().split("T")[0];
  const times = selectedBarber?.times?.[formattedDate] || [];

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setChoosenTime(time);
    setTimeout(() => {
      toast.success(`Vaqt ${time}`);
    }, 10);
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Aniq vaqtni tanlang</h2>

      {times.length > 0 ? (
        <div className="mb-4 w-full text-xl">
          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => (
              <motion.button
                key={time}
                className={`p-3 text-xl rounded-lg transition-colors duration-300 ${
                  selectedTime === time
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
                onClick={() => handleTimeSelection(time)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {time}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Bu kunda mavjud vaqtlar yo‘q</p>
      )}

      <motion.p
        className="mt-4 text-lg text-center text-gray-600"
        key={selectedTime}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedTime ? `Tanlangan vaqt: ${selectedTime}` : "Aniq vaqt tanlang"}
      </motion.p>
    </motion.div>
  );
}

export default TimePicker;
