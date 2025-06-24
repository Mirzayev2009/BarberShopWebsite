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
  className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#fafbff] to-[#eef0f8] rounded-2xl shadow-xl border border-[#d1c4ff] flex flex-col items-center"
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
            className="block mt-10 mb-9 text-center text-lg sm:text-xl text-[#4b3c86] font-semibold"
          >
            Tanlangan kun: {format(selected, "d-MMMM, yyyy", { locale: uz })}
          </motion.span>
        ) : (
          <motion.span
            key="no-selection"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="block mt-10 mb-9 text-center text-lg sm:text-xl text-gray-400"
          >
            Kunni tanlang
          </motion.span>
        )}
      </AnimatePresence>
    }
    className="w-full overflow-x-auto"
    classNames={{
    months: "flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full",
    caption: "text-xl font-bold text-center text-[#5d4d8b]",
    head: "w-full",
    head_row: "flex justify-between w-full",
    head_cell: "text-gray-500 text-sm text-center w-10",
    row: "flex justify-center w-full",
    cell: "p-2 sm:p-3 w-10 text-center rounded-lg hover:bg-[#e7e5f7] transition",
    selected: "bg-[#7357f6] text-white rounded-full",
    today: "bg-[#ffd700] text-black font-bold border-2 border-[#d4af37] rounded-lg",
    disabled: "text-gray-300 line-through cursor-not-allowed"
    }}
  />
</motion.div>

  );
}

export { MyDatePicker };
