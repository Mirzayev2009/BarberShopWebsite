import React, { createContext, useState } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null)
 console.log(selectedDate);
 console.log(selectedTime);
 console.log(selectedHaircut);
 console.log(selectedBarber);
 console.log(personalInfo);
 
 
 
 

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
        personalInfo,
        setPersonalInfo
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
