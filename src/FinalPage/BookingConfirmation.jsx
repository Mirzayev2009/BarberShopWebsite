import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatabaseContext } from "@/context/DatabaseContext";
import YandexMap from "@/components/YandexMap";

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
      const response = await fetch("https://your-backend-api.com/book", {
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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Booking Confirmation</h1>

      {/* Barber Info */}
      {selectedBarber && (
        <div className="border p-4 rounded-lg shadow bg-white">
          <h2 className="text-2xl font-semibold mb-2">Barber</h2>
          <div className="flex items-center gap-4">
            {selectedBarber.imageUrl && (
              <img src={selectedBarber.imageUrl} alt={selectedBarber.name} className="w-24 h-24 rounded-full object-cover" />
            )}
            <div>
              <p className="font-medium">{selectedBarber.name}</p>
              <p className="text-sm text-gray-600">{selectedBarber.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Haircut Info */}
      {selectedHaircut && (
        <div className="border p-4 rounded-lg shadow bg-white space-y-2">
          <h2 className="text-2xl font-semibold">Haircut</h2>
          {Array.isArray(selectedHaircut) ? (
            selectedHaircut.map((haircut) => (
              <div key={haircut.id} className="space-y-1">
                <p className="font-medium">{haircut.name}</p>
                <p>{haircut.description}</p>
                <p>{haircut.price} USD</p>
              </div>
            ))
          ) : (
            <>
              <p className="font-medium">{selectedHaircut.name}</p>
              <p>{selectedHaircut.description}</p>
              <p>{selectedHaircut.price} USD</p>
              {selectedHaircut.discountPrice && (
                <p className="text-green-600">Discounted: {selectedHaircut.discountPrice} USD</p>
              )}
              <p>Duration: {selectedHaircut.duration} minutes</p>
              {selectedHaircut.imageUrl && (
                <img src={selectedHaircut.imageUrl} alt={selectedHaircut.name} className="w-full rounded-lg" />
              )}
            </>
          )}
        </div>
      )}

      {/* Date and Time */}
      <div className="border p-4 rounded-lg shadow bg-white space-y-2">
        <h2 className="text-2xl font-semibold">Date & Time</h2>
        <p>Date: {formattedDate}</p>
        <p>Time: {selectedTime || "Not selected"}</p>
      </div>

      {/* Contact Info */}
      <div className="border p-4 rounded-lg shadow bg-white space-y-2">
        <h2 className="text-2xl font-semibold">Contact Info</h2>
        <p>Name: {personalInfo?.name || "Not provided"}</p>
        <p>Email: {personalInfo?.email || "Not provided"}</p>
        <p>Phone: {personalInfo?.phone || "Not provided"}</p>
      </div>

      {/* Map */}
      <div className="border p-4 rounded-lg shadow bg-white space-y-4">
        <h2 className="text-2xl font-semibold">Location</h2>
        <YandexMap />
      </div>

      {/* Cancel Booking */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={handleUnbook}>
          Cancel Booking
        </Button>
      </div>

      {/* Cancel Reason */}
      {isUnbooking && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Why are you cancelling?</h3>
          <select
            value={unbookingReason}
            onChange={(e) => setUnbookingReason(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Select a reason</option>
            <option value="changed-mind">Changed my mind</option>
            <option value="not-available">Not available on this date</option>
            <option value="found-another">Found another barber</option>
            <option value="other">Other</option>
          </select>
          {unbookingReason === "other" && (
            <Textarea
              placeholder="Please specify your reason"
              value={unbookingReason}
              onChange={(e) => setUnbookingReason(e.target.value)}
            />
          )}
          <div className="flex gap-2 mt-2">
            <Button onClick={confirmUnbooking} disabled={!unbookingReason}>
              Confirm Cancel
            </Button>
            <Button variant="ghost" onClick={() => setIsUnbooking(false)}>
              Go Back
            </Button>
          </div>
        </div>
      )}

      {/* Rebooking Section */}
      <div className="border p-4 rounded-lg shadow bg-white space-y-4">
        <h2 className="text-2xl font-semibold">Rebook</h2>
        <div className="space-y-3">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full border rounded p-2"
          />
          <select
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full border rounded p-2"
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
      </div>
    </div>
  );
};

export default BookingConfirmation;


