import React, { useState, useEffect } from "react";

const API_DATA = [
  {
    id: 1,
    name: "Sochni Vosk Bilan Olib Tashlash",
    description: "Uzoq muddat davomida silliq va toza natija beradi.",
    price: 1400,
    discountPrice: 500,
    duration: 15,
    imageUrl: "https://www.barberstake.com/wp-content/uploads/2024/10/Low-Taper-Fade-Haircut-1-995x503.jpg"
  },
  {
    id: 2,
    name: "Erkaklar Soch Turmagi",
    description: "Klassik va zamonaviy kesim uslublari.",
    price: 2000,
    discountPrice: 1500,
    duration: 30,
    imageUrl: "https://www.barberstake.com/wp-content/uploads/2024/10/Low-Taper-Fade-Haircut-1-995x503.jpg"
  },
  {
    id: 3,
    name: "Farzandlar Uchun Soch Turmagi",
    description: "Bolalar uchun qulay va zamonaviy soch kesimi.",
    price: 1200,
    discountPrice: 900,
    duration: 25,
    imageUrl: "https://www.barberstake.com/wp-content/uploads/2024/10/Low-Taper-Fade-Haircut-1-995x503.jpg"
  },
  {
    id: 4,
    name: "Qalin Sochlar Uchun Model Kesish",
    description: "Qalin va uzun sochlar uchun maxsus xizmat.",
    price: 2500,
    discountPrice: 2000,
    duration: 40,
    imageUrl: "https://www.barberstake.com/wp-content/uploads/2024/10/Low-Taper-Fade-Haircut-1-995x503.jpg"
  },
  {
    id: 5,
    name: "Soch Uchlarini Silliqlash",
    description: "Sochlarni parvarish qilish va uchlarini yumshoq qilish.",
    price: 1000,
    discountPrice: 700,
    duration: 20,
    imageUrl: "https://www.barberstake.com/wp-content/uploads/2024/10/Low-Taper-Fade-Haircut-1-995x503.jpg"
  }
];

const HaircutList = ({ setChoosenHaircut }) => {
  const [haircuts, setHaircuts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Corrected Function Syntax
  const handleHaircutSelection = (haircut) => {
    setChoosenHaircut(haircut);
  };

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      setHaircuts(API_DATA);
    }, 500);
  }, []);

  // Filter haircuts based on search input
  const filteredHaircuts = haircuts.filter((haircut) =>
    haircut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    haircut.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Qidiring..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-lg p-2 mb-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

      {/* Haircuts List */}
      <div className="w-full flex flex-wrap justify-center gap-6">
        {filteredHaircuts.length > 0 ? (
          filteredHaircuts.map((haircut) => (
            <div
              key={haircut.id}
              className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Title & Price Section */}
              <div className="p-4">
                <h2 className="text-lg font-bold">{haircut.name}</h2>
              </div>

              {/* Image Section */}
              <div className="relative w-full h-52">
                <img
                  src={haircut.imageUrl || "https://via.placeholder.com/400x150"}
                  alt={haircut.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600">{haircut.description}</p>
                <p className="text-2xl font-semibold mt-2">{haircut.price} ₽</p>
              </div>

              {/* Service Info */}
              <div className="p-4 flex justify-between items-center text-gray-700">
                <span>{haircut.duration} daqiqa</span>
                <span className="text-lg font-bold">{haircut.discountPrice} ₽</span>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleHaircutSelection(haircut)} // ✅ Fixed Click Handler
                  className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Soch-turmakni tanlang
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Mos keluvchi natijalar topilmadi.</p>
        )}
      </div>
    </div>
  );
};

export default HaircutList;
