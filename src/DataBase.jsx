import React, { createContext, useState, useEffect  } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState();
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [personalInfo, setPersonalInfo] = useState(null); // Add this state
  
  const [dataBase, setDatabase] = useState([]);
  const URL = "http://192.168.1.136:8000/api/barbers";
   
    useEffect(() => { 
      async function fetchData() {
        try {
          const res = await fetch(URL);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          setDatabase(data);
        } catch (error) {
          console.error("Error fetching database:", error);
        }
      }
      fetchData();
    }, []);
    
  
    console.log(dataBase);
  


  
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
        dataBase,
        setDatabase
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

