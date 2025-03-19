import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, Scissors } from "lucide-react";

const Info = ({ selectedTime, selectedDate, selectedBarber, selectedHaircut }) => {
  return (
    <div className="w-full bg-white py-6 px-4 mt-24">
      <div className="w-full flex items-center justify-between bg-white p-6 rounded-lg shadow-md">

        {/* Barber Info */}
        <div className="flex items-center space-x-4 flex-1">
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
        <div className="flex items-center space-x-6 flex-1 justify-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <p className="text-lg font-medium">
              {selectedDate ? selectedDate.toLocaleDateString() : "Sana tanlanmagan"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-500" />
            <p className="text-lg font-medium">{selectedTime || "Vaqt tanlanmagan"}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Scissors className="w-5 h-5 text-red-500" />
            <p className="text-lg font-medium">{selectedHaircut?.name || "Soch turmagi tanlanmagan"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Info;

