import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors, DollarSign, Hourglass } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Info = ({ selectedTime, selectedDate, selectedBarber, selectedHaircut, onUpdate , barbersData}) => {
  const navigate = useNavigate();

  const handleUpdate = (field, value) => {
    if (onUpdate) {
      onUpdate({ [field]: value });
    }
  };

  const availableTimes = selectedBarber?.times || [];

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
            <Calendar className="w-5 h-5 text-blue-500" />
            <Input 
               dateFormat = "DD/MM/YYYY"
               type="date" 
               value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ""} 
               onChange={(e) => handleUpdate('selectedDate', e.target.value)} 
               className="w-36" 
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
                {availableTimes.map((time, index) => (
                  <SelectItem key={index} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Haircut Selection Button */}
          <div className="flex items-center w-full space-x-2">
            <Scissors className="w-5 h-5 text-red-500" />
            <Button variant="outline" onClick={() => navigate('/choosinghaircut')} className="w-36">
              {selectedHaircut?.name || "Soch turmagi tanlanmagan"}
            </Button>
          </div>

          {/* Price Display */}
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <p className="text-lg font-medium">{selectedHaircut?.price ? `$${selectedHaircut.price}` : "Narx mavjud emas"}</p>
          </div>

          {/* Duration Display */}
          <div className="flex items-center space-x-2">
            <Hourglass className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-medium">{selectedHaircut?.duration ? `${selectedHaircut.duration} min` : "Davomiylik mavjud emas"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;



   