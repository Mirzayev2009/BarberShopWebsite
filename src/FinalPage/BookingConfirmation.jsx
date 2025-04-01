import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, User, MapPin, Phone, Globe } from "lucide-react";
import { DatabaseContext } from "../DataBase";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const {
    selectedBarber,
    selectedHaircut,
    selectedDate,
    selectedTime,
    setSelectedBarber,
    setSelectedHaircut,
    setSelectedTime,
    setSelectedDate
  } = useContext(DatabaseContext);
  const navigate = useNavigate()


  const handleUnbooking = () =>{
    setSelectedBarber(null)
    setSelectedHaircut(null)
    setSelectedTime(null)
    setSelectedDate(null)
    navigate("/")
    
  }
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
                  <span className="text-lg">
                     {selectedDate ? selectedDate.toISOString("uz-UZ") : "Sana tanlanmagan"}
                  </span>

                  <Clock className="w-6 h-6" />
                  <span className="text-lg">{selectedTime || "Vaqt tanlanmagan"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button className="w-full text-lg">Yana buyurtma qilish</Button>
            <Button variant="outline" className="w-full text-lg">Kalendarda ko'rish</Button>
            <Button variant="outline" className="w-full text-lg" onClick={()=> handleUnbooking()}>Buyurtmani o'zgartirish</Button>
            <Button variant="destructive" className="w-full text-lg" onClick={()=> handleUnbooking()}>Buyurtmani bekor qilish</Button>
          </div>
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
              {/* <span>{selectedBarber?.location || "Manzil mavjud emas"}</span> */}
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
