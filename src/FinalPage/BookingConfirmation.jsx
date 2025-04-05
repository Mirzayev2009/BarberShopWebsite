import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, User, MapPin, Phone, Globe } from "lucide-react";
import { DatabaseContext } from "../DataBase";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // For date selection (you can install this package)
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker


const BookingConfirmation = () => {
  const {
    selectedBarber,
    selectedHaircut,
    selectedDate,
    selectedTime,
    setSelectedBarber,
    setSelectedHaircut,
    setSelectedTime,
    setSelectedDate,
    setCancellationReason,
    setPersonalInfo,
    personalInfo,
    barbersData,
    setBarbersData
  } = useContext(DatabaseContext);

  const navigate = useNavigate();

  const [showUnbookingModal, setShowUnbookingModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [newDate, setNewDate] = useState(selectedDate);
  const [newTime, setNewTime] = useState(selectedTime); // Store the new time
  const [newBarber, setNewBarber] = useState(selectedBarber); // Store the new barber

  const reasons = [
    "Changed my mind",
    "Found a better offer",
    "Scheduling conflict",
    "Personal reasons",
    "Other"
  ];

  // Effect to update newTime when newBarber changes
  useEffect(() => {
    if (newBarber && newBarber.times) {
      // If there's no time selected, set the first available time
      if (!newTime || !newBarber.times.includes(newTime)) {
        setNewTime(newBarber.times[0] || "No available time");
      }
    }
  }, [newBarber, newTime]);

  const handleUnbooking = () => {
    if (selectedReason) {
      setCancellationReason(selectedReason);
      setSelectedBarber(null);
      setSelectedHaircut(null);
      setSelectedTime(null);
      setSelectedDate(null);
      navigate("/");
    }
  };

  const handleNewBooking = () => {
    const bookingData = {
      barber: selectedBarber,
      haircut: selectedHaircut,
      date: selectedDate,
      time: selectedTime,
    };

    setSelectedBarber(null);
    setSelectedHaircut(null);
    setSelectedTime(null);
    setSelectedDate(null);

    setPersonalInfo(bookingData);
    navigate("/");
  };

  const handleSaveChanges = () => {
    const selectedNewBarber = barbers.find(b => b.id === parseInt(newBarber.id));

    if (selectedNewBarber) {
      setNewBarber(selectedNewBarber);
      setSelectedBarber(selectedNewBarber); // Update the context with the new barber
      setSelectedHaircut(selectedHaircut); // Assume haircuts remain unchanged
      setSelectedDate(newDate);
      setSelectedTime(newTime);

      // Ensure newTime reflects the selected barber's available times
      if (!newTime || !selectedNewBarber.times.includes(newTime)) {
        setNewTime(selectedNewBarber.times[0] || "No available time");
      }
    }
    setShowEditForm(false); // Hide the edit form after saving
  };

  const barbers = barbersData;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <Card className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8">
        <CardContent>
          {/* Barber Info */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-green-600">Siz buyurtma qildingiz</h2>
            <div className="mt-4 flex justify-center items-center gap-4 text-gray-700 text-lg">
              <User className="w-16 h-16 rounded-full bg-gray-300 p-2" />
              <div>
                <p className="text-2xl font-semibold">{selectedBarber?.name || "Noma'lum sartarosh"}</p>
                <div className="flex items-center justify-center text-yellow-500 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6" />
                  ))}
                  <span className="text-lg text-gray-600 ml-3">{selectedBarber?.reviews || 0} fikrlar</span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2 text-gray-700">
                  <Calendar className="w-6 h-6" />
                  <span className="text-lg">{selectedDate ? selectedDate.toISOString("uz-UZ") : "Sana tanlanmagan"}</span>

                  <Clock className="w-6 h-6" />
                  <span className="text-lg">{selectedTime || "Vaqt tanlanmagan"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button className="w-full text-lg" onClick={handleNewBooking}>Yana buyurtma qilish</Button>
            <Button variant="outline" className="w-full text-lg">Kalendarda ko'rish</Button>
            <Button variant="outline" className="w-full text-lg" onClick={() => setShowEditForm(true)}>Buyurtmani o'zgartirish</Button>
            <Button variant="destructive" className="w-full text-lg" onClick={() => setShowUnbookingModal(true)}>Buyurtmani bekor qilish</Button>
          </div>

          {showUnbookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold mb-4">Bekor qilish sababi</h2>
                {reasons.map((reason, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="mr-2"
                    />
                    <label>{reason}</label>
                  </div>
                ))}
                <Button className="mt-4 w-full" onClick={handleUnbooking} disabled={!selectedReason}>OK</Button>
                <Button variant="outline" className="mt-2 w-full" onClick={() => setShowUnbookingModal(false)}>Bekor qilish</Button>
              </div>
            </div>
          )}

          {showEditForm && (
            <div className="w-full mt-6 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Buyurtmani o'zgartirish</h2>
              <div className="mb-4">
                <label className="block mb-2">Sana</label>
                <DatePicker
                  selected={newDate}
                  onChange={setNewDate}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Vaqt</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {newBarber?.times?.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Sartarosh</label>
                <select
                  value={newBarber?.id || ""}
                  onChange={(e) => setNewBarber(barbers.find(b => b.id === parseInt(e.target.value)))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.id}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleSaveChanges} className="w-full">Saqlash</Button>
              <Button variant="outline" className="mt-2 w-full" onClick={() => setShowEditForm(false)}>Bekor qilish</Button>
            </div>
          )}

          {/* Haircut Info */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Soch turmak</h3>
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg text-lg">
              <span className="text-gray-700">{selectedHaircut?.name || "Soch turmak tanlanmagan"}</span>
              <span className="font-bold text-xl">{selectedHaircut?.price ? `${selectedHaircut.price} ₽` : "Narx belgilanmagan"}</span>
            </div>
          </div>
          {/* Barber Location */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kontakt</h3>
            <div className="flex items-center gap-4 text-gray-700 text-lg">
              <MapPin className="w-6 h-6" />
              <span>{selectedBarber?.location || "Manzil mavjud emas"}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-lg mt-2">
              <Phone className="w-6 h-6" />
              <span>{selectedBarber?.contact || "Telefon raqam mavjud emas"}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-lg mt-2">
              <Globe className="w-6 h-6" />
              <span>{selectedBarber?.socials?.link || "Ijtimoiy tarmoq mavjud emas"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
