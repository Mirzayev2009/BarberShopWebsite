import React, { createContext, useState } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
 console.log(selectedDate);
 console.log(selectedTime);
 console.log(selectedHaircut);
 console.log(selectedBarber);
 
 
 

  return (
    <DatabaseContext.Provider
      value={{
        selectedBarber,
        setSelectedBarber,
        selectedHaircut,
        setSelectedHaircut,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
