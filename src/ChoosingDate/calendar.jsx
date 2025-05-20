import * as React from "react";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";

function MyDatePicker({ setChoosenDay, initialDate = null }) {
  const today = new Date();
  const [selected, setSelected] = useState(initialDate || today);

  useEffect(() => {
    if (selected) setChoosenDay(selected);
  }, [selected, setChoosenDay]);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={{ before: today }}
        footer={
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.span
                key={selected.toISOString()}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="block mt-4 text-center text-sm text-gray-700 font-semibold"
              >
                Tanlangan kun: {selected.toLocaleDateString("uz-UZ")}
              </motion.span>
            ) : (
              <motion.span
                key="no-selection"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="block mt-4 text-center text-sm text-gray-400"
              >
                Kunni tanlang
              </motion.span>
            )}
          </AnimatePresence>
        }
        classNames={{
          months: "flex flex-col gap-4",
          caption: "text-xl font-bold text-center",
          head_cell: "text-gray-500 text-lg",
          cell: "p-4 rounded-lg hover:bg-gray-200 transition",
          selected: "bg-black text-white rounded-full",
          today:
            "bg-yellow-400 text-black font-bold border-2 border-yellow-600 rounded-lg",
        }}
      />
    </motion.div>
  );
}

export { MyDatePicker };
