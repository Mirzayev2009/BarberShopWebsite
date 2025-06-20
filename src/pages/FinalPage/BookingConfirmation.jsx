// BookingConfirmation.jsx
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "@/DataBase";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  BadgeCheck,
  Calendar,
  Scissors,
  MapPin,
  Trash2,
  Globe,
  Phone,
  Pencil,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import YandexMap from "./Yandex";

const BookingConfirmation = () => {
  const {
    selectedBarber,
    selectedHaircut,
    selectedTime,
    selectedDate,
    personalInfo,
    dataBase,
    haircutData,
    availableTimes,
    setSelectedBarber,
    setSelectedHaircut,
    setSelectedDate,
    setSelectedTime,
    setPersonalInfo,
    fetchTimes
  } = useContext(DatabaseContext);

  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUnbooking, setIsUnbooking] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newBarber, setNewBarber] = useState(selectedBarber?.id || "");
  const [newHaircut, setNewHaircut] = useState(selectedHaircut?.id || "");
  const [selectedDay, setSelectedDay] = useState(selectedDate instanceof Date ? selectedDate : new Date(selectedDate));
  const [newTime, setNewTime] = useState(selectedTime?.id || "");



 const formattedDate = useMemo(()=>{
  const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate)
  return dateObj.toLocaleDateString("uz-UZ", {
     weekday: "long",
     day: "numeric",
     month: "long"
  })
 }, [selectedDate])


  const timesForBarber = useMemo(()=>{
    return availableTimes.filter(
      (t) =>
        t.barber === parseInt(newBarber) &&
      new Date(t.date).toDateString() === new Date(selectedDay).toDateString()
    )
  }, [newBarber, selectedDay, availableTimes])

   const createBooking = async () => {

  if(!personalInfo?.name || !personalInfo.phone || !selectedBarber ||!selectedTime ) {
    alert("Iltimos, barcha maydonlarni to'diring.")
    return
  }

  const [first_name, last_name = ""] = personalInfo.name.trim().split(" ")

  const uzbekPhoneRegex = /^\+998[-\s]?\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
  if (!uzbekPhoneRegex.test(personalInfo.phone)) {
    alert("Telefon raqami noto‘g‘ri formatda. Misol: +998 90 123 45 67");
    return;
  }

  const payload = {
    first_name,
    last_name,
    phone: personalInfo.phone,
    barber: selectedBarber.id,
    haircut: selectedHaircut.id || null,
    available_time: selectedTime.id
  }

  try{
     const res = await fetch(`http://192.168.1.61:8000/bookings/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
     })
  



    if(res.ok){
      const data = await res.json()
      localStorage.setItem("bookingId", data.id)
   } else{
    const err = await res.json()
    console.error("Booking err", err )
    
   }
  } catch (error) {
    console.error("Network error:", error);
    alert("Server bilan aloqa uzildi.");
  }
  const isStillAvailable = availableTimes.find(
    (t)=> t.id === selectedTime.id && !t.is_booked
  )
  if (!isStillAvailable) {
    alert("Bu vaqt band qilingan")
  }
};

useEffect(() => {
  const existingId = localStorage.getItem("bookingId");
  console.log("Booking useEffect: existingId =", existingId);

  if (existingId) {
    fetch(`http://192.168.1.61:8000/bookings/${existingId}/`)
      .then((res) => {
        if (!res.ok) {
          console.log("Booking ID not valid anymore. Creating a new one.");
          localStorage.removeItem("bookingId");
          createBooking();
        } else {
          console.log("Booking already exists, skipping createBooking");
        }
      })
      .catch((err) => {
        console.error("Error checking booking:", err);
        localStorage.removeItem("bookingId");
        // createBooking();
      });
  } else {
    console.log("No existing ID, creating booking");
    createBooking();
  }
}, []);


const updateBooking = async () => {
  const bookingId = localStorage.getItem("bookingId");
  if (!bookingId) {
    alert("Booking ID yo'q. Yangilash mumkin emas.");
    return;
  }

  const [first_name, last_name = ""] = personalInfo.name.trim().split(" ");
  const uzbekPhoneRegex = /^\+998[-\s]?\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
  if (!uzbekPhoneRegex.test(personalInfo.phone)) {
    alert("Telefon raqami noto‘g‘ri formatda.");
    return;
  }

  const payload = {
    first_name,
    last_name,
    phone: personalInfo.phone,
    barber: +newBarber,
    haircut: +newHaircut,
    available_time: +newTime,
  };

  try {
    const res = await fetch(`http://192.168.1.61:8000/bookings/${bookingId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log("✅ Booking successfully updated");
      await fetchTimes()
      navigate(0);
    } else {
      const err = await res.json();
      console.error("❌ Reschedule failed:", err);
      alert(err.non_field_errors?.[0] || "Yangilashda xatolik yuz berdi.");
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    alert("Serverga ulanib bo'lmadi.");
  }
};


const confirmUnbooking = async () => {
  const bookingId = localStorage.getItem("bookingId");
  if (!bookingId || !cancelReason) return;

  try {
    const res = await fetch(`http://192.168.1.61:8000/bookings/${bookingId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ reason: cancelReason }),
    });

    if (res.ok) {
      await fetchTimes()
      setSelectedBarber(null);
      setSelectedHaircut(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setPersonalInfo(null);
      localStorage.removeItem("bookingId");
      localStorage.removeItem()
      navigate("/");
    } else {
      const err = await res.json();
      alert(err.detail || "Bekor qilishda xatolik yuz berdi.");
    }
  } catch (err) {
    console.error("Delete failed", err);
    alert("Tarmoqda xatolik.");
  }
};





  const handleNewBooking = () => {
    setSelectedBarber(null);
    setSelectedHaircut(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setPersonalInfo(null);
    localStorage.removeItem("bookingId");
    navigate("/");
  };



  return (
    <div className="relative">
      <div className={`max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-8 text-[#2c2c2c] border-[2px] border-[#947100] ${isUnbooking ? 'opacity-20 pointer-events-none' : ''}`}>
        <h1 className="text-2xl font-bold text-[#947100] mb-2 flex items-center gap-2">
          <BadgeCheck size={22} /> Your booking is confirmed
        </h1>

        <p className="text-base flex items-center gap-2 mb-4 text-[#2c2c2c]">
          <Calendar size={16} /> {formattedDate}, {selectedTime?.time}
        </p>

        <div className="flex items-center gap-4 mb-6">
          {selectedBarber?.photo && (
            <img
              src={selectedBarber.photo}
              alt="Barber"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#947100]"
            />
          )}
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <p className="text-xl font-semibold">{selectedBarber?.name}</p>
              <p className="text-sm text-[#555]">Барбер</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 ">
          <Button variant="outline" onClick={handleNewBooking}>Yana boshqa buyurtma qilish</Button>
          <Button className="bg-[#947100] text-white" onClick={() => setIsUpdating(true)}>Buyurtmani o'zgartirish</Button>
          <Button variant="destructive" onClick={() => setIsUnbooking(true)}>Buyurtmani bekor qilish</Button>
        </div>

        <div className="mb-6">
          <h3 className="text-[#947100] font-semibold text-sm flex items-center gap-1 mb-1">
            <Scissors size={16} /> Tanlangan soch turmak
          </h3>
          <p className=" text-xl">{selectedHaircut?.name}</p>
          <p className="text-xl text-[#555]">1 h – 1,800 ₽</p>
          <img src={selectedHaircut?.img} alt="" className="mt-2 w-32 rounded-lg" />
        </div>

        <div className="mb-6">
          <h3 className="text-[#947100] font-semibold text-sm mb-1 flex items-center gap-2">
            <MapPin size={16} />
          </h3>
          <p className="text-base">Samarqand Shahar, Ali qushki ko'chasi</p>
          <YandexMap/>
        </div>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#947100]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#947100]">Update Booking</h2>

              <Select value={String(newBarber)} onValueChange={setNewBarber}>
                <SelectTrigger className="mb-4"><SelectValue placeholder="Select Barber" /></SelectTrigger>
                <SelectContent>
                  {dataBase.map((barber) => (
                    <SelectItem key={barber.id} value={String(barber.id)}>{barber.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={String(newHaircut)} onValueChange={setNewHaircut}>
                <SelectTrigger className="mb-4"><SelectValue placeholder="Select Haircut" /></SelectTrigger>
                <SelectContent>
                  {haircutData.map((cut) => (
                    <SelectItem key={cut.id} value={String(cut.id)}>{cut.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input
                type="date"
                className="mb-4 w-full border rounded px-3 py-2"
                value={selectedDay.toISOString().slice(0, 10)}
                onChange={(e) => setSelectedDay(new Date(e.target.value))}
              />

              <Select value={String(newTime)} onValueChange={setNewTime}>
                <SelectTrigger className="mb-4"><SelectValue placeholder="Select Time" /></SelectTrigger>
                <SelectContent>
                  {timesForBarber.map((time) => (
                    <SelectItem key={time.id} value={String(time.id)}>{time.time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsUpdating(false)}>Bekor qilish</Button>
                <Button className="bg-[#947100] text-white" onClick={updateBooking}>Buyurtmani o'zgartirish</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unbooking Reason Panel */}
      <AnimatePresence>
        {isUnbooking && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-sm text-center border border-[#947100]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-[#947100] mb-4">Nega buyurtmani bekor qilayapsiz</h2>
              <div className="space-y-2 mb-4">
                {["Rejalarim o'zgarib qoldi", "Boshqa barber topdim", "Juda ham qimmat", "Juda ham uzoq", "Boshqa"].map((reason) => (
                  <Button
                    key={reason}
                    variant={cancelReason === reason ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setCancelReason(reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUnbooking(false)}>Qaytish</Button>
                <Button variant="destructive" onClick={confirmUnbooking} disabled={!cancelReason}>
                  Bekor qilishni tasdiqlash
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingConfirmation;
