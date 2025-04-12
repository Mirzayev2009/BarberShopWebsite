import React, { createContext, useState, useEffect  } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState();
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [personalInfo, setPersonalInfo] = useState(null); // Add this state
  const [barbersData, setBarbersData] = useState([])
  console.log(cancellationReason);
  console.log(personalInfo);
  console.log(selectedBarber);
  console.log(selectedDate);
  console.log(selectedTime);
  console.log(selectedHaircut);
  console.log(barbersData);


  const [dataBase, setDatabase] = useState()



  useEffect(() => {
    fetch('http://localhost:8000/api/hello/')
      .then((res) => res.json())
      .then((data) => setDatabase(data.message));
  }, []);
  
  
  
  
  
  
  
  
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
        setPersonalInfo, 
        barbersData,
        setBarbersData
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

