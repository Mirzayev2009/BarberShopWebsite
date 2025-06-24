import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function TimePicker({
  setChoosenTime,
  selectedBarber,
  selectedDate,
  availableTimes,
  selectedHaircut,
}) {
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  const matchingTimeObjects = useMemo(() => {
    if (!formattedDate) return [];
    const source = selectedBarber?.availabletimes || availableTimes || [];
    return source.filter(
      (item) => item.date === formattedDate && !item.is_booked
    );
  }, [selectedBarber, formattedDate, availableTimes]);

  const handleTimeSelection = (timeObj) => {
    if (!timeObj || !timeObj.id) return;

    setSelectedTime(timeObj);
    setChoosenTime(timeObj); // sets global context version

    toast.success(`Vaqt tanlandi: ${timeObj.time}`, {
      action: {
        label: "Keyingi qadam",
        onClick: () => {
          if (!selectedBarber) {
            navigate("/choosingbarber");
          } else if (!selectedHaircut) {
            navigate("/choosinghaircut");
          } else {
            navigate("/fillinginfopage");
          }
        },
      },
    });
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 py-6 bg-gradient-to-br from-[#e6e9f0] to-[#eef1f7] rounded-2xl shadow-xl border border-[#a88bfa] flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#392d69] text-center">
        Aniq vaqtni tanlang
      </h2>

      {matchingTimeObjects.length > 0 ? (
        <motion.div
          key={formattedDate}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-5xl"
        >
          {matchingTimeObjects.map((timeObj, index) => (
            <motion.button
              key={`${timeObj.id}-${timeObj.time}-${index}`}
              className={`p-3 text-sm sm:text-base rounded-xl font-semibold transition-all duration-300 w-full ${
                selectedTime?.id === timeObj.id
                  ? "bg-[#7357f6] text-white shadow-lg"
                  : "bg-white hover:bg-[#f0f0ff] text-[#392d69] border border-[#ccc]"
              }`}
              onClick={() => handleTimeSelection(timeObj)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {timeObj.time.slice(0, 5)}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 text-lg mt-6 text-center">
          Bu kunda mavjud vaqtlar yo‘q
        </p>
      )}

      <motion.p
        className="mt-6 text-lg text-center text-[#5a5473] px-2"
        key={selectedTime?.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedTime
          ? `Tanlangan vaqt: ${selectedTime.time}`
          : "Iltimos, vaqt tanlang"}
      </motion.p>
    </motion.div>
  );
}

export default TimePicker;
