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
  const[haircutData, setHaircutData] = useState([])
  const URL = "http://192.168.1.136:8000/barbers-list";
   
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
    

    const URL2 = "http://192.168.1.136:8000/haircuts-list";
   
    useEffect(() => { 
      async function fetchDataN2() {
        try {
          const res = await fetch(URL2);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          setHaircutData(data);
        } catch (error) {
          console.error("Error fetching haircutdata:", error);
        }
      }
      fetchDataN2();
    }, []);
    
    console.log(haircutData);
    
  


  
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
        setDatabase,
        haircutData,
        setHaircutData
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

