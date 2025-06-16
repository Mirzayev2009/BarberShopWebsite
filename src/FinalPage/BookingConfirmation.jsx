import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "@/DataBase";
import { Button } from "@/components/ui/button";
import YandexMap from "./Yandex";
import { BadgeCheck, Calendar, Phone, Mail, MapPin, Scissors } from "lucide-react";
import { format, parse, isValid } from "date-fns";

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

  let parsedDate = null;
  if (typeof selectedDate === "string") {
    parsedDate = parse(selectedDate, "dd-MM-yyyy", new Date());
  } else if (selectedDate instanceof Date) {
    parsedDate = selectedDate;
  }

  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, "eeee, d MMMM")
    : "Not selected";

  // 🟥 Booking submit
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
      available_time: selectedTime?.id,
    };

    try {
      const response = await fetch("http://192.168.1.90:8000/create-bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Booking created:", data);
        localStorage.setItem("bookingId", data.id);
        setPersonalInfo((prev) => ({ ...prev, bookingId: data.id }));
      } else {
        const errData = await response.json();
        console.error("❌ Booking failed:", response.status, errData);
      }
    } catch (err) {
      console.error("❌ Booking error:", err);
    }
  };

  useEffect(() => {
    const existingId = localStorage.getItem("bookingId");
    if (!existingId) {
      sendBookingToAPI();
    }
  }, []);

  const updateBooking = async (updates) => {
    const bookingId = localStorage.getItem("bookingId");
    if (!bookingId) return;

    try {
      const response = await fetch(
        `http://192.168.1.90:8000/create-bookings/${bookingId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );
      if (response.ok) {
        console.log("🔁 Booking updated");
      } else {
        console.error("❌ Update failed");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  const confirmUnbooking = async () => {
    const bookingId = localStorage.getItem("bookingId");

    try {
      const response = await fetch(
        `http://192.168.1.90:8000/create-bookings/${bookingId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        console.log("🗑️ Booking deleted");
        setSelectedTime(null);
        setSelectedDate(null);
        setSelectedBarber(null);
        setSelectedHaircut(null);
        setPersonalInfo(null);
        navigate("/");
      } else {
        console.error("❌ Delete failed");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
    setIsUnbooking(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-green-600 text-xl font-semibold">
        <BadgeCheck size={22} /> Buyurtma tasdiqlandi!
      </div>

      <div className="text-gray-600 text-sm flex items-center gap-2">
        <Calendar size={16} />
        {formattedDate}, {selectedTime?.time}
      </div>

      {/* Barber */}
      <div className="flex items-center gap-4 mt-4">
        {selectedBarber?.photo && (
          <img
            src={selectedBarber.photo}
            alt="Barber"
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{selectedBarber?.name}</p>
          <p className="text-sm text-gray-500">Usta</p>
        </div>
      </div>

      {/* Haircut */}
      <div className="border-t pt-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-700">
          <Scissors size={16} /> Xizmat
        </h3>
        <p>{selectedHaircut?.name || "Soch turmagi tanlanmagan"}</p>
      </div>

      {/* Contact */}
      <div className="border-t pt-4 space-y-1 text-sm">
        <h3 className="font-semibold">Aloqa ma’lumotlari</h3>
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

      {/* Map */}
      <div className="border-t pt-4">
        <h3 className="font-semibold flex items-center gap-2 text-sm">
          <MapPin size={16} /> Manzil
        </h3>
        <YandexMap />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 pt-4">
        <Button onClick={() => navigate("/")}>Yangi buyurtma</Button>
        <Button
          variant="outline"
          onClick={() =>
            updateBooking({ date: selectedDate, available_time: selectedTime?.id })
          }
        >
          Vaqtni o‘zgartirish
        </Button>
        <Button variant="destructive" onClick={() => setIsUnbooking(true)}>
          Buyurtmani bekor qilish
        </Button>
      </div>

      {/* Cancel Confirmation */}
      {isUnbooking && (
        <div className="mt-4 bg-red-100 p-3 rounded-lg text-red-700">
          <p>Buyurtmani bekor qilmoqchimisiz?</p>
          <Button
            variant="destructive"
            onClick={confirmUnbooking}
            className="mt-2"
          >
            Ha, bekor qil
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
