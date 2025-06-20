


import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DatabaseContext } from "@/Database";

const HaircutList = ({ setChoosenHaircut }) => {
  const [haircuts, setHaircuts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { haircutData, selectedBarber, selectedTime } = useContext(DatabaseContext);

  useEffect(() => {
    setTimeout(() => {
      setHaircuts(haircutData);
    }, 500);
  }, [haircutData]);

  const filteredHaircuts = useMemo(() => {
    return haircuts.filter((haircut) =>
      haircut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      haircut.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [haircuts, searchQuery]);

  const handleHaircutSelection = (haircut) => {
    setChoosenHaircut(haircut);
    toast.success(`Soch turmagi tanlandi. Endi ma'lumotlarni to'ldiring`, {
      action: {
        label: "Ma'lumotlarni to'ldirish va tasdiqlash",
        onClick: () => {
          if (!selectedBarber) {
            navigate("/choosingbarber");
          } else if (!selectedTime) {
            navigate("/choosingTime");
          } else {
            navigate("/fillinginfopage");
          }
        },
      },
    });
  };

  return (
  <div className="container mx-auto px-4 py-6">
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Qidiring..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="form-control mb-6 max-w-md mx-auto border-2 border-blue-900 text-blue-900 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
  />

  {/* Haircut Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredHaircuts.length > 0 ? (
      filteredHaircuts.map((haircut, index) => (
        <motion.div
          key={haircut.id}
          className="rounded-xl shadow-md border border-blue-900 bg-white transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {/* Image */}
          <div className="h-[160px] w-full overflow-hidden rounded-t-xl">
            <img
              src={haircut.imageUrl || "https://via.placeholder.com/400x150"}
              alt={haircut.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 text-blue-900">
            <h3 className="text-lg font-semibold">{haircut.name}</h3>
            <p className="text-sm text-gray-600 min-h-[48px]">{haircut.description}</p>

            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="font-medium">⏱ {haircut.duration} daqiqa</span>
              <span className="font-semibold text-yellow-500">{haircut.price} ₽</span>
            </div>

            {haircut.discountPrice && (
              <p className="text-sm text-green-600 font-semibold">
                Aksiya: {haircut.discountPrice} ₽
              </p>
            )}
          </div>

          {/* Select Button */}
          <div className="p-4 pt-0">
            <button
              onClick={() => handleHaircutSelection(haircut)}
              className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
            >
              Soch turmakni tanlang
            </button>
          </div>
        </motion.div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">
        Mos keluvchi natijalar topilmadi.
      </p>
    )}
  </div>
</div>
  )
};

export default HaircutList;

