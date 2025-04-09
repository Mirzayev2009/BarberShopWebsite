import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, User } from "lucide-react";
import { DatabaseContext } from "../DataBase";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // For date selection
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker
import YandexMap from "./Yandex";

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

  useEffect(() => {
    if (newBarber && newBarber.times) {
      const timesForSelectedDate = newBarber.times[selectedDate];

      if (Array.isArray(timesForSelectedDate)) {
        // If there's no time selected, set the first available time
        if (!newTime || !timesForSelectedDate.includes(newTime)) {
          setNewTime(timesForSelectedDate[0] || "No available time");
        }
      } else {
        console.error("No available times for the selected date.");
      }
    }
  }, [newBarber, selectedDate, newTime]);

  const handleUnbooking = () => {
    if (selectedReason) {
      setCancellationReason(selectedReason);
      setSelectedBarber(null);
      setSelectedHaircut([]);
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
    setSelectedHaircut([]);
    setSelectedTime(null);
    setSelectedDate(null);

    setPersonalInfo(bookingData);
    navigate("/");
  };

  const handleSaveChanges = () => {
    const selectedNewBarber = barbersData.find(b => b.id === parseInt(newBarber.id));

    if (selectedNewBarber) {
      setNewBarber(selectedNewBarber);
      setSelectedBarber(selectedNewBarber); // Update the context with the new barber
      setSelectedHaircut(selectedHaircut); // Assume haircuts remain unchanged
      setSelectedDate(newDate);
      setSelectedTime(newTime);

      // Ensure newTime reflects the selected barber's available times
      const timesForSelectedDate = selectedNewBarber.times[newDate];
      if (timesForSelectedDate && !timesForSelectedDate.includes(newTime)) {
        setNewTime(timesForSelectedDate[0] || "No available time");
      }
    }
    setShowEditForm(false); // Hide the edit form after saving
  };

  const barbers = barbersData;

  // Format selectedDate correctly
  const formattedDate = selectedDate instanceof Date && !isNaN(selectedDate)
    ? selectedDate.toISOString()
    : "Date not selected";

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-8">
        <Card className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-4 sm:p-8">
          <CardContent className="space-y-6">
    
            {/* Booking Info */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-green-600">Siz buyurtma qildingiz</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700 text-lg">
                <User className="w-16 h-16 rounded-full bg-gray-300 p-2" />
                <div>
                  <p className="text-2xl font-semibold">{selectedBarber?.name || "Noma'lum sartarosh"}</p>
                  <div className="flex items-center justify-center text-yellow-500 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" />
                    ))}
                    <span className="text-base text-gray-600 ml-3">{selectedBarber?.reviews || 0} fikrlar</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedTime || "Vaqt tanlanmagan"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="text-base" onClick={handleNewBooking}>Yana buyurtma qilish</Button>
              <Button variant="outline" className="text-base">Kalendarda ko'rish</Button>
              <Button variant="outline" className="text-base" onClick={() => setShowEditForm(true)}>Buyurtmani o'zgartirish</Button>
              <Button variant="destructive" className="text-base" onClick={() => setShowUnbookingModal(true)}>Buyurtmani bekor qilish</Button>
            </div>
    
            {/* Modal */}
            {showUnbookingModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl w-11/12 max-w-md max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Bekor qilish sababi</h2>
                  {reasons.map((reason) => (
                    <label key={reason} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={() => setSelectedReason(reason)}
                        className="mr-2"
                      />
                      {reason}
                    </label>
                  ))}
                  <Button className="mt-4 w-full" onClick={handleUnbooking} disabled={!selectedReason}>OK</Button>
                  <Button variant="outline" className="mt-2 w-full" onClick={() => setShowUnbookingModal(false)}>Bekor qilish</Button>
                </div>
              </div>
            )}
    
            {/* Edit Form */}
            {showEditForm && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
                <h2 className="text-xl font-bold">Buyurtmani o'zgartirish</h2>
                <div>
                  <label className="block mb-1">Sana</label>
                  <DatePicker
                    selected={newDate}
                    onChange={setNewDate}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1">Vaqt</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {newBarber?.times?.[newDate]?.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Sartarosh</label>
                  <select
                    value={newBarber?.id || ""}
                    onChange={(e) => setNewBarber(barbersData.find(b => b.id === parseInt(e.target.value)))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {barbers.map((barber) => (
                      <option key={barber.id} value={barber.id}>{barber.name}</option>
                    ))}
                  </select>
                </div>
                <Button className="w-full" onClick={handleSaveChanges}>Saqlash</Button>
                <Button variant="outline" className="mt-2 w-full" onClick={() => setShowEditForm(false)}>Bekor qilish</Button>
              </div>
            )}
    
            {/* Haircut Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">{selectedHaircut?.name}</h3>
              <p>{selectedHaircut?.description}</p>
              <p className="font-medium">Price: {selectedHaircut?.price} USD</p>
              {selectedHaircut?.discountPrice && (
                <p className="text-green-600">Discounted: {selectedHaircut.discountPrice} USD</p>
              )}
              <p>Duration: {selectedHaircut?.duration} minutes</p>
              {selectedHaircut?.imageUrl && (
                <img src={selectedHaircut.imageUrl} alt={selectedHaircut.name} className="w-full rounded-lg" />
              )}
            </div>
    
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow">
              <YandexMap />
            </div>
    
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <h3 className="text-2xl font-semibold text-gray-800">Barber's Contact</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Phone:</span>
                  <span>{selectedBarber?.contact || "Not available"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Social Media:</span>
                  <a
                    href={selectedBarber?.socials?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedBarber?.socials?.link ? "Visit Social Media" : "Not available"}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <YandexMap />
                </div>
              </div>
            </div>
    
          </CardContent>
        </Card>
      </div>
    );
  }    

export default BookingConfirmation;
