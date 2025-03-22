import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors, DollarSign, Hourglass } from "lucide-react";

const Info = ({ selectedTime, selectedDate, selectedBarber, selectedHaircut }) => {
  return (
    <div className="w-full bg-white py-6 px-4 mt-24 h-full ">
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

        {/* Appointment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1 justify-center w-full">
          <div className="flex items-center space-x-2">
            <Calendar className="w-7 h-7 text-blue-500" />
            <p className="text-lg font-medium">
              {selectedDate ? selectedDate.toLocaleDateString() : "Sana tanlanmagan"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-7 h-7 text-green-500" />
            <p className="text-lg font-medium">{selectedTime || "Vaqt tanlanmagan"}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Scissors className="w-7 h-7 text-red-500" />
            <p className="text-lg font-medium">{selectedHaircut?.name || "Soch turmagi tanlanmagan"}</p>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="w-7 h-7 text-yellow-500" />
            <p className="text-lg font-medium">{selectedHaircut?.price ? `$${selectedHaircut.price}` : "Narx mavjud emas"}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Hourglass className="w-7 h-7 text-purple-500" />
            <p className="text-lg font-medium">{selectedHaircut?.duration ? `${selectedHaircut.duration} min` : "Davomiylik mavjud emas"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

