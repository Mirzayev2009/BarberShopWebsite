import React, { createContext, useState } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [personalInfo, setPersonalInfo] = useState(null); // Add this state
  console.log(cancellationReason);
  console.log(personalInfo);
  console.log(selectedBarber);
  console.log(selectedDate);
  console.log(selectedTime);
  console.log(selectedHaircut);
  
  
  
  
  
  
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
        cancellationReason,
        setCancellationReason,
        personalInfo,
        setPersonalInfo, // Make sure to pass this to the context
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

