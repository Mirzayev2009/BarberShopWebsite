import * as React from "react";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";
import {uz} from "date-fns/locale"
import {format} from "date-fns"

function MyDatePicker({ setChoosenDay, initialDate = null }) {
  const today = new Date();
  const [selected, setSelected] = useState(initialDate ? new Date(initialDate) : null );

  useEffect(() => {
    if (selected) setChoosenDay(selected);
  }, [selected, setChoosenDay]);





const customUzLocale = {
  ...uz,
  options: {
    ...uz.options,
    weekStartsOn: 1 // Monday as the first day of the week
  },
  localize: {
    ...uz.localize,
    day: (n) => {
      const weekdays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
     return weekdays[(n + 6) % 7]
    }
  },
  formatters: {
    ...uz.formatters,
    weekday: (date) => {
      const index = date.getDay();
      const weekdays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
      return weekdays[(index + 6) % 7]; // shift Sunday (0) to end
    }
  }
};


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
        locale={customUzLocale}
        showWeekNumber={false}
        footer={
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.span
                key={selected.toISOString()}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="block mt-10 mb-9 text-center text-xl text-gray-700 font-semibold"
              >
                Tanlangan kun: {format(selected, "d-MMMM, yyyy", {locale: uz})}
              </motion.span>
            ) : (
              <motion.span
                key="no-selection"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="block mt-10 mb-9 text-center text-xl text-gray-400"
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
          disabled: "text-gray-300 line-through cursor-not-allowed"
        }}
      />
    </motion.div>
  );
}

export { MyDatePicker };
