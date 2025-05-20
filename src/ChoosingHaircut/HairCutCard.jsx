import { SonnerDemo } from "@/components/Sonner";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

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

  const handleHaircutSelection = (haircut) => {
    setChoosenHaircut(haircut);
    navigate("/fillinginfopage");
    toast.success(`Soch turmagi tanlandi. Endi vaqtni tanlang`, {
      action: {
        label: "Tanlash",
        onClick: () => navigate("/fillinginfopage"),
      },
    });
  };

  return (
<div className="container px-4 py-5">
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Qidiring..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="form-control mb-4 w-100 mx-auto max-w-lg"
  />

  {/* Haircuts List */}
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    {filteredHaircuts.length > 0 ? (
      filteredHaircuts.map((haircut, index) => (
        <motion.div
          key={haircut.id}
          className="col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <motion.div
            className="card shadow-lg border-0 rounded-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Title */}
            <div className="card-body">
              <h5 className="card-title">{haircut.name}</h5>
            </div>

            {/* Image */}
            <motion.div whileHover={{ scale: 1.03 }} className="position-relative">
              <img
                src={haircut.imageUrl || "https://via.placeholder.com/400x150"}
                alt={haircut.name}
                className="card-img-top w-100 h-100 object-cover rounded-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Description & Price */}
            <div className="card-body">
              <p className="card-text text-muted">{haircut.description}</p>
              <p className="fs-4 fw-bold">{haircut.price} ₽</p>
            </div>

            {/* Service Info */}
            <div className="card-footer d-flex justify-content-between align-items-center">
              <span>{haircut.duration} daqiqa</span>
              <span className="text-lg fw-bold">{haircut.discountPrice} ₽</span>
            </div>

            {/* Action Button */}
            <div className="card-footer text-center">
              <button
                onClick={() => handleHaircutSelection(haircut)}
                className="btn btn-warning w-100"
              >
                Soch-turmakni tanlang
              </button>
            </div>
          </motion.div>
        </motion.div>
      ))
    ) : (
      <p className="text-center text-muted">Mos keluvchi natijalar topilmadi.</p>
    )}
  </div>
</div>


  );
};

export default HaircutList;

