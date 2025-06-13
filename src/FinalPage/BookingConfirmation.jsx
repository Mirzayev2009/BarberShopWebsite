import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "@/DataBase";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import YandexMap from "./Yandex";
import { BadgeCheck, Calendar, Phone, Mail, MapPin, Scissors } from "lucide-react";

const BookingConfirmation = () => {
  const {
    selectedDate,
    selectedTime,
    selectedBarber,
    selectedHaircut,
    personalInfo,
    setSelectedDate,
    setSelectedTime,
    setSelectedBarber,
    setSelectedHaircut,
    setPersonalInfo,
  } = useContext(DatabaseContext);

  const navigate = useNavigate();
  const [isUnbooking, setIsUnbooking] = useState(false);

  // Format date for display
  const formattedDate = selectedDate
    ? format(typeof selectedDate === "string" ? parseISO(selectedDate) : selectedDate, "eeee, d MMMM")
    : "Not selected";

  // 🟥 1. CREATE booking when page loads
  const sendBookingToAPI = async () => {
    const bookingData = {
      name: personalInfo?.name,
      email: personalInfo?.email,
      phone: personalInfo?.phone,
      barber: selectedBarber?.id,
      haircut: Array.isArray(selectedHaircut)
        ? selectedHaircut.map((h) => h.id)
        : selectedHaircut?.id,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch("http://192.168.1.145:8000/create-bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Booking created:", responseData);

        // Save booking ID
        localStorage.setItem("bookingId", responseData.id);

        // 🟢 Store in context too for updating later
        setPersonalInfo((prev) => ({
          ...prev,
          bookingId: responseData.id,
        }));
      } else {
        const errData = await response.json();
        console.error("❌ Booking failed:", response.status, errData);
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
    }
  };

  useEffect(() => {
    sendBookingToAPI(); // Runs on mount
  }, []);


  const updateBooking = async(updates)=>{
     const bookingId = localStorage.getItem("bookingId")

     if(!bookingId){
      console.warn("No booking ID for update.");
      return
      
     }

     try{
      const response = await fetch(`http:192.168.1.145:8000/create-bookings/${bookingId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
      })
    
      if (response.ok) {
        console.log("🔁 Booking updated");
      } else {
        console.error("❌ Update failed");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  }



const confirmUnbooking =  async ()=>{
  const bookingId = localStorage.getItem("nookingId")

  try{
    const response = await fetch(`http:1192.168.1.145:8000/create-bookings/${bookingId}`, {
      method: "DELETE"
    })
    if(response.ok){
      console.log("🗑️ Booking deleted");

      setSelectedTime(null)
      setSelectedDate(null)
      setSelectedBarber(null)
      setSelectedHaircut(null)
      setPersonalInfo(null)

      navigate("/")
    } else{
      console.error("❌ Delete failed")
      
    }
  }
  catch(err){
    console.error("❌ Delete error:", err);
    
  }
  setIsUnbooking(false)
}

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white shadow-md rounded-xl space-y-4">
      {/* ✅ Confirmation header */}
      <div className="flex items-center gap-2 text-green-700 font-medium">
        <BadgeCheck size={20} /> Booking confirmed
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <Calendar size={16} />
        {formattedDate}, {selectedTime}
      </div>

      {/* 💈 Barber info */}
      <div className="flex items-center gap-4 mt-4">
        {selectedBarber?.photo && (
          <img src={selectedBarber.photo} alt="Barber" className="w-12 h-12 rounded-full object-cover" />
        )}
        <div>
          <p className="font-semibold">{selectedBarber?.name}</p>
          <p className="text-sm text-gray-500">Barber</p>
        </div>
      </div>

      {/* 🔘 Action buttons */}
      <div className="flex flex-wrap gap-3 mt-2">
        <Button onClick={() => navigate("/")}>Make Another Booking</Button>
        <Button
          variant="outline"
          onClick={() => {
            // Example: Update date/time when rescheduling
            updateBooking({ date: selectedDate, time: selectedTime,  });
          }}
        >
          Reschedule
        </Button>
        <Button variant="destructive" onClick={() => setIsUnbooking(true)}>
          Cancel Booking
        </Button>
      </div>

      {/* ✂️ Haircut info */}
      <div className="mt-4 border-t pt-3">
        <h3 className="font-medium flex items-center gap-2">
          <Scissors size={16} /> Service
        </h3>
        <p>{selectedHaircut?.name || "No haircut selected"}</p>
      </div>

      {/* 📞 Contact info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-medium text-sm">Contact Details</h3>
        {personalInfo?.name && <p>👤 {personalInfo.name}</p>}
        {personalInfo?.phone && (
          <p className="flex items-center gap-1">
            <Phone size={14} /> {personalInfo.phone}
          </p>
        )}
        {personalInfo?.email && (
          <p className="flex items-center gap-1">
            <Mail size={14} /> {personalInfo.email}
          </p>
        )}
      </div>

      {/* 📍 Location map */}
      <div className="mt-3">
        <h3 className="font-medium flex items-center gap-2 text-sm">
          <MapPin size={16} /> Location
        </h3>
        <YandexMap />
      </div>

      {/* 🔴 Unbooking confirmation dialog */}
      {isUnbooking && (
        <div className="mt-4 bg-red-100 p-3 rounded-lg text-red-700">
          <p>Are you sure you want to cancel this booking?</p>
          <Button variant="destructive" onClick={confirmUnbooking} className="mt-2">
            Yes, Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
