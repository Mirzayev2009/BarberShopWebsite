import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DatabaseContext } from "@/DataBase";



const HaircutList = ({ setChoosenHaircut }) => {
  const [haircuts, setHaircuts] = useState([]);

  const {haircutData, selectedBarber, selectedTime} = useContext(DatabaseContext)
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      // setHaircuts(API_DATA);
      setHaircuts(haircutData)
    }, 500);
  }, []);

  // Filter haircuts based on search input
const filteredHaircuts = useMemo(() => {
  return haircuts.filter((haircut) =>
    haircut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    haircut.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [haircuts, searchQuery]);

console.log(selectedBarber, selectedTime,);


  const handleHaircutSelection = (haircut) => {
  setChoosenHaircut(haircut);
  toast.success(`Soch turmagi tanlandi. Endi ma'lumotlarni to'ldiring`, {
    action: {
      label: "Ma'lumotlarni to'ldirish va tasdiqlash",
      onClick: ()=> {
     if (!selectedBarber) {
  navigate('/choosingbarber');
} else if (!selectedTime) {
  navigate('/choosingTime');
} else {
  navigate('/fillinginfopage');
}

      }
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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
             <p className="card-text text-muted min-h-[60px]">{haircut.description}</p>
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

