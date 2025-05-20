import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatabaseContext } from '@/DataBase';
import YandexMap from "./Yandex"
import { motion } from "framer-motion";

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

  const [isUnbooking, setIsUnbooking] = useState(false);
  const [unbookingReason, setUnbookingReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newBarber, setNewBarber] = useState(selectedBarber);

  const navigate = useNavigate();

  const formattedDate = selectedDate
    ? format(typeof selectedDate === "string" ? parseISO(selectedDate) : selectedDate, "PPP")
    : "Not selected";

  const handleUnbook = () => setIsUnbooking(true);

  const confirmUnbooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedBarber(null);
    setSelectedHaircut(null);
    setPersonalInfo(null);
    setIsUnbooking(false);
    navigate("/");
  };

  const sendBookingToAPI = async () => {
    const bookingData = {
      name: personalInfo?.name,
      email: personalInfo?.email,
      phone: personalInfo?.phone,
      barber: selectedBarber?.name,
      haircut: Array.isArray(selectedHaircut)
        ? selectedHaircut.map((h) => h.name).join(", ")
        : selectedHaircut?.name,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch("http://192.168.1.136:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log("Booking sent successfully!");
        return true;
      } else {
        console.error("Failed to send booking:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error sending booking:", error);
      return false;
    }
  };

useEffect(() => {
  sendBookingToAPI();
}, []);


  const handleNewBooking = async () => {
    setSelectedDate(newDate);
    setSelectedTime(newTime);
    setSelectedBarber(newBarber);
    const success = await sendBookingToAPI();
    if (success) {
      navigate("/");
    }
  };

  const availableTimes = (() => {
    try {
      const dateKey = format(new Date(newDate), "yyyy-MM-dd");
      return newBarber?.times?.[dateKey] || [];
    } catch {
      return [];
    }
  })();

  return (
  <div className="max-w-5xl mx-auto p-6 space-y-8">
    <motion.h1
      className="text-4xl font-bold text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Booking Confirmation
    </motion.h1>

    {/* Barber Info */}
    {selectedBarber && (
      <motion.div
        className="border p-6 rounded-xl shadow-md bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Barber</h2>
        <div className="flex items-center gap-6">
          {selectedBarber.imageUrl && (
            <img
              src={selectedBarber.imageUrl}
              alt={selectedBarber.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow"
            />
          )}
          <div>
            <p className="text-lg font-medium">{selectedBarber.name}</p>
            <p className="text-sm text-gray-600">{selectedBarber.description}</p>
          </div>
        </div>
      </motion.div>
    )}

    {/* Haircut Info */}
    {selectedHaircut && (
      <motion.div
        className="border p-6 rounded-xl shadow-md bg-white space-y-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold">Haircut</h2>
        {Array.isArray(selectedHaircut) ? (
          selectedHaircut.map((haircut) => (
            <div key={haircut.id} className="space-y-1">
              <p className="text-lg font-medium">{haircut.name}</p>
              <p className="text-gray-600">{haircut.description}</p>
              <p className="font-semibold">{haircut.price} USD</p>
            </div>
          ))
        ) : (
          <>
            <p className="text-lg font-medium">{selectedHaircut.name}</p>
            <p className="text-gray-600">{selectedHaircut.description}</p>
            <p className="font-semibold">{selectedHaircut.price} USD</p>
            {selectedHaircut.discountPrice && (
              <p className="text-green-600 font-semibold">
                Discounted: {selectedHaircut.discountPrice} USD
              </p>
            )}
            <p className="text-sm text-gray-500">Duration: {selectedHaircut.duration} minutes</p>
            {selectedHaircut.imageUrl && (
              <img
                src={selectedHaircut.imageUrl}
                alt={selectedHaircut.name}
                className="w-full rounded-lg mt-2 shadow"
              />
            )}
          </>
        )}
      </motion.div>
    )}

    {/* Date & Time */}
    <motion.div
      className="border p-6 rounded-xl shadow-md bg-white space-y-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold">Date & Time</h2>
      <p>Date: <span className="font-medium">{formattedDate}</span></p>
      <p>Time: <span className="font-medium">{selectedTime || "Not selected"}</span></p>
    </motion.div>
    {/* Contact Info */}
    <motion.div
      className="border p-6 rounded-xl shadow-md bg-white space-y-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h2 className="text-2xl font-semibold">Contact Info</h2>
      <p>Name: <span className="font-medium">{personalInfo?.name || "Not provided"}</span></p>
      <p>Email: <span className="font-medium">{personalInfo?.email || "Not provided"}</span></p>
      <p>Phone: <span className="font-medium">{personalInfo?.phone || "Not provided"}</span></p>
    </motion.div>

    {/* Map */}
    <motion.div
      className="border p-6 rounded-xl shadow-md bg-white space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold">Location</h2>
      <YandexMap />
    </motion.div>

    {/* Cancel Booking Button */}
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Button variant="outline" onClick={handleUnbook}>
        Cancel Booking
      </Button>
    </motion.div>

    {/* Cancel Reason */}
    {isUnbooking && (
      <motion.div
        className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold">Why are you cancelling?</h3>
        <select
          value={unbookingReason}
          onChange={(e) => setUnbookingReason(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select a reason</option>
          <option value="changed-mind">Changed my mind</option>
          <option value="not-available">Not available on this date</option>
          <option value="found-another">Found another barber</option>
          <option value="other">Other</option>
        </select>

        {unbookingReason === "other" && (
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Please specify your reason"
            value={unbookingReason}
            onChange={(e) => setUnbookingReason(e.target.value)}
          />
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={confirmUnbooking} disabled={!unbookingReason}>
            Confirm Cancel
          </Button>
          <Button variant="ghost" onClick={() => setIsUnbooking(false)}>
            Go Back
          </Button>
        </div>
      </motion.div>
    )}

    {/* Rebooking Section */}
    <motion.div
      className="border p-6 rounded-xl shadow-md bg-white space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <h2 className="text-2xl font-semibold">Rebook</h2>
      <div className="space-y-3">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
        <select
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <Button onClick={handleNewBooking} disabled={!newDate || !newTime}>
          Book Again
        </Button>
      </div>
    </motion.div>
  </div>
);
}

export default BookingConfirmation;


