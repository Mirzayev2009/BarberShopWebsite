import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors, DollarSign, Hourglass } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";
const Info = ({ selectedTime, selectedDate, selectedBarber, selectedHaircut, onUpdate }) => {
  const navigate = useNavigate();

  const handleUpdate = (field, value) => {
    if (onUpdate) {
      onUpdate({ [field]: value });
    }
  };

  // Inside your component
  const inputDateValue = selectedDate
    ? typeof selectedDate === "string"
      ? format(parse(selectedDate, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")
      : format(selectedDate, "yyyy-MM-dd")
    : "";

  // Handle input field change
  const handleDateChange = (e) => {
    // Convert the input value (yyyy-MM-dd) to dd-MM-yyyy
    const newDate = e.target.value;
    const formattedDate = format(new Date(newDate), "dd-MM-yyyy");
    handleUpdate("selectedDate", formattedDate); // Update with dd-MM-yyyy
  };

  // Retrieve available times for the selected barber and date
  const rawTimes = selectedBarber?.times?.[selectedDate];
  const availableTimes = Array.isArray(rawTimes) ? rawTimes : [];

  console.log("selectedDate:", selectedDate);
  console.log("selectedBarber.times:", selectedBarber?.times);
  console.log("availableTimes:", availableTimes);

  // Get today's date to disable past dates in the date picker
  const today = new Date().toISOString().split("T")[0]; // Get today as yyyy-mm-dd




  return (
    <div className="w-full bg-white py-6 px-4 mt-24">
      <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md space-y-6 md:space-y-0">
        
        {/* Barber Info */}
        <div className="flex items-center space-x-4 flex-1 w-full md:w-auto">
          <Avatar className="w-16 h-16">
            <img
              src={selectedBarber?.image || "https://via.placeholder.com/150"}
              alt={selectedBarber?.name || "Sartarosh"}
              className="rounded-full"
            />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{selectedBarber?.name || "Sartarosh tanlanmagan"}</h2>
            <p className="text-gray-500">{selectedBarber?.contact || "Kontakt mavjud emas"}</p>
          </div>
        </div>

        {/* Selection Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1 justify-center w-full">
          
          {/* Date Picker */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-fit h-5 text-blue-500" />
            <Input 
               type="date" 
               value={inputDateValue} // Set value in yyyy-MM-dd format for input field
               min={today} 
               onChange={handleDateChange} // Handle date change to store in dd-MM-yyyy format
               className="w-fit" 
            />
          </div>

          {/* Time Picker */}
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-500" />
            <Select value={selectedTime || ""} onValueChange={(value) => handleUpdate('selectedTime', value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={selectedTime || "Vaqt tanlanmagan"} />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.length > 0 ? (
                  availableTimes
                    .filter(time => time && time !== "") // Filter out empty strings or undefined
                    .map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))
                ) : (
                  <SelectItem value="no-times" disabled>
                    No available times
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Haircut Selection Button */}
          <div className="flex items-center w-fit space-x-2">
            <Scissors className="w-5 h-5  text-red-500" />
            <Button variant="outline" onClick={() => navigate('/choosinghaircut')} className="w-fit">
              {selectedHaircut?.name || "Soch turmagi tanlanmagan"}
            </Button>
          </div>

          {/* Price Display */}
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <p className="text-lg font-medium mt-3">{selectedHaircut?.price ? `$${selectedHaircut.price}` : "Narx mavjud emas"}</p>
          </div>

          {/* Duration Display */}
          <div className="flex items-center   space-x-2">
            <Hourglass className="w-5 h-5 text-purple-500" />
            <div className="w-[55px] mt-3">
              <p className="text-lg  font-medium">{selectedHaircut?.duration ? `${selectedHaircut.duration} min` : "Davomiylik mavjud emas"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;


 