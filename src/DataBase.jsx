import React, { createContext, useState, useEffect } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedBarber, setSelectedBarber] = useState();
  const [selectedHaircut, setSelectedHaircut] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [personalInfo, setPersonalInfo] = useState(null);

  const [dataBase, setDatabase] = useState([]);
  const [haircutData, setHaircutData] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  // New states for editing modals
  const [newBarber, setNewBarber] = useState(null);
  const [newHaircut, setNewHaircut] = useState(null);
  const [newTime, setNewTime] = useState(null);

  const [isUnbooking, setIsUnbooking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [bookingId, setBookingId] = useState(localStorage.getItem("bookingId") || null);

  useEffect(() => {
    if (bookingId) localStorage.setItem("bookingId", bookingId);
    else localStorage.removeItem("bookingId");
  }, [bookingId]);

  // API URLs
  const API_BASE = "http://192.168.1.61:8000";
  const URLS = {
    barbers: `${API_BASE}/barbers-list`,
    haircuts: `${API_BASE}/haircuts-list`,
    times: `${API_BASE}/availabletimes`,
  };

  // Fetch barbers
  useEffect(() => {
    async function fetchBarbers() {
      try {
        const res = await fetch(URLS.barbers);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setDatabase(data);
      } catch (err) {
        console.error("❌ Error fetching barbers:", err);
      }
    }
    fetchBarbers();
  }, []);

  // Fetch haircuts
  useEffect(() => {
    async function fetchHaircuts() {
      try {
        const res = await fetch(URLS.haircuts);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setHaircutData(data);
      } catch (err) {
        console.error("❌ Error fetching haircuts:", err);
      }
    }
    fetchHaircuts();
  }, []);

  // Fetch available times
  useEffect(() => {
    async function fetchTimes() {
      try {
        const res = await fetch(URLS.times);
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setAvailableTimes(data);
      } catch (err) {
        console.error("❌ Error fetching times:", err);
      }
    }
    fetchTimes();
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
        dataBase,
        setDatabase,
        haircutData,
        setHaircutData,
        availableTimes,
        setAvailableTimes,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
