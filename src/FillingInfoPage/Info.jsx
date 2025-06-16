import React, { useMemo } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors, DollarSign, Hourglass } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";

const Info = ({ selectedTime, selectedDate, selectedBarber, selectedHaircut, onUpdate }) => {
  const navigate = useNavigate();

  const handleUpdate = (field, value) => {
    if (onUpdate) {
      onUpdate({ [field]: value });
    }
  };

  // Normalize date for input and comparison
  let inputDateValue = "";
  let normalizedDate = "";

  if (selectedDate) {
    try {
      const parsed = typeof selectedDate === "string"
        ? parse(selectedDate, "dd-MM-yyyy", new Date())
        : new Date(selectedDate);

      inputDateValue = format(parsed, "yyyy-MM-dd");
      normalizedDate = format(parsed, "yyyy-MM-dd");
    } catch (error) {
      console.warn("Invalid selectedDate:", selectedDate);
      inputDateValue = "";
      normalizedDate = "";
    }
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const formattedDate = format(new Date(newDate), "dd-MM-yyyy");
    handleUpdate("selectedDate", formattedDate);
  };

  const availableTimes = useMemo(() => {
    if (!selectedBarber?.availabletimes || !normalizedDate) return [];
    try {
      return selectedBarber.availabletimes
        .filter(t => format(new Date(t.date), "yyyy-MM-dd") === normalizedDate)
        .map(t => t.time);
    } catch {
      return [];
    }
  }, [selectedBarber, normalizedDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <motion.div
      className="w-full bg-white py-6 px-4 mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md space-y-6 md:space-y-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Barber Info */}
        <motion.div
          className="flex items-center space-x-4 flex-1 w-full md:w-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Avatar className="w-16 h-16">
            <img
              src={selectedBarber?.image || "https://via.placeholder.com/150"}
              alt={selectedBarber?.name || "Sartarosh"}
              className="rounded-full"
            />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {selectedBarber?.name || "Sartarosh tanlanmagan"}
            </h2>
            <p className="text-gray-500">
              {selectedBarber?.contact || "Kontakt mavjud emas"}
            </p>
          </div>
        </motion.div>

        {/* Selection Fields */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1 justify-center w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          {/* Date Picker */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-fit h-5 text-blue-500" />
            <Input
              type="date"
              value={inputDateValue}
              min={today}
              onChange={handleDateChange}
              className="w-fit"
            />
          </div>

          {/* Time Picker */}
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-500" />
            <Select
              value={selectedTime || ""}
              onValueChange={(value) => handleUpdate("selectedTime", value)}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder={selectedTime || "Vaqt tanlanmagan"} />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.length > 0 ? (
                  availableTimes
                    .filter((time) => time && time !== "")
                    .map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))
                ) : (
                  <SelectItem value="no-times" disabled>
                    Mavjud vaqt yoʻq
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Haircut Selection Button */}
          <div className="flex items-center w-fit space-x-2">
            <Scissors className="w-5 h-5 text-red-500" />
            <Button
              variant="outline"
              onClick={() => navigate("/choosinghaircut")}
              className="w-fit"
            >
              {selectedHaircut?.name || "Soch turmagi tanlanmagan"}
            </Button>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <p className="text-lg font-medium mt-3">
              {selectedHaircut?.price ? `$${selectedHaircut.price}` : "Narx mavjud emas"}
            </p>
          </div>

          {/* Duration */}
          <div className="flex items-center space-x-2">
            <Hourglass className="w-5 h-5 text-purple-500" />
            <div className="w-[55px] mt-3">
              <p className="text-lg font-medium">
                {selectedHaircut?.duration ? `${selectedHaircut.duration} min` : "Davomiylik mavjud emas"}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Info;
