import React, { useState, useContext, useEffect } from "react";
import { DatabaseContext } from "../Database"; // Import context
import { useNavigate } from "react-router-dom";

const BarberCard = ({ barber, setGo }) => {
  const { setSelectedBarber, setSelectedTime, setSelectedDate, setPersonalInfo } = useContext(DatabaseContext);

  const [isSelected, setIsSelected] = useState(false); // Local state for selection
  const [availableTimesToday, setAvailableTimesToday] = useState([]);
  const [availableTimesTomorrow, setAvailableTimesTomorrow] = useState([]);
  const [selectedTime, setSelectedTimeLocal] = useState(null);
  const [selectedDate, setSelectedDateLocal] = useState(""); // Local state for selected date

  // Function to format the date to "dd-mm-yyyy" format
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Get today's and tomorrow's dates
  const today = new Date();
  const tomorrow = new Date();  
  tomorrow.setDate(today.getDate() + 1);

  const todayDate = formatDate(today);
  const tomorrowDate = formatDate(tomorrow);

  // Get available times for today and tomorrow
  useEffect(() => {
    if (barber && barber.times) {
      setAvailableTimesToday(barber.times[todayDate] || []);
      setAvailableTimesTomorrow(barber.times[tomorrowDate] || []);
    }
  }, [barber, todayDate, tomorrowDate]);

  // Handle time selection
  const handleTimeSelection = (time, date) => {
    setSelectedDate(date); // Set the selected date
    setSelectedTime(time); // Set the selected time
    setSelectedBarber(barber); // Automatically select the barber
    setSelectedTimeLocal(time);
    setSelectedDateLocal(date); // Store selected date locally


    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedTime: time,
      selectedDate: date,
    }));
    setGo(true);
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4 mt-32">
      <div
        className={`card shadow-lg rounded-3 p-4 ${isSelected ? "border border-primary" : ""}`}
      >
        <img
          src={barber.image}
          alt={barber.name}
          className="card-img-top rounded-circle mx-auto d-block"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{barber.name}</h5>
          <p className="card-text text-muted">Reviews: {barber.reviews}</p>

          {/* Display available times for today */}
          <div className="mt-4">
            <h5>Bugun ({todayDate})</h5>
            <div className="grid grid-cols-3 gap-3">
              {availableTimesToday.length > 0 ? (
                availableTimesToday.map((time) => (
                  <button
                  className={`btn ${
                    selectedTime === time && selectedDate === todayDate
                      ? "bg-blue-600 text-white"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleTimeSelection(time, todayDate)}
                >
                  {time}
                </button>
                
                ))
              ) : (
                <p className="text-muted">Bugun mavjud vaqtlar yo'q.</p>
              )}
            </div>
          </div>

          {/* Display available times for tomorrow */}
          <div className="mt-4">
            <h5>Ertaga ({tomorrowDate})</h5>
            <div className="grid grid-cols-3 gap-3">
              {availableTimesTomorrow.length > 0 ? (
                availableTimesTomorrow.map((time) => (
                  <button
                    key={time}
                    className="btn btn-outline-primary"
                    onClick={() => handleTimeSelection(time, tomorrowDate)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="text-muted">Ertaga mavjud vaqtlar yo'q.</p>
              )}
            </div>
          </div>
        </div>

        {/* Barber selection button */}
        <button
          className={`btn btn-outline-primary ${isSelected ? "disabled" : ""}`}
          onClick={() => {
          setIsSelected(true); 
          setSelectedBarber(barber)
          }} // Mark the barber as selected
          disabled={isSelected}
        >
          {isSelected ? "Boshqa kunni tanlash" : "Boshqa kun tanlanadi"}
        </button>
      </div>
    </div>
  );
};

const BarberList = () => {
  const navigate = useNavigate();
  const { barbersData } = useContext(DatabaseContext); // Accessing barbers data from context
  const [go, setGo] = useState(false); // State to control when the button should appear

  if (!barbersData || barbersData.length === 0) {
    return <p className="text-center">No barbers available at the moment.</p>;
  }

  return (
    <div className="row">
      {barbersData.map((barber) => (
        <BarberCard key={barber.id} barber={barber} setGo={setGo} />
      ))}
      {go && (
        <div className="text-center mt-4">
          <button
            className={`btn btn-primary transform transition-all duration-2000 ease-in-out ${
              go ? 'opacity-300 -translate-y-30 w-2/3 h-16' : 'opacity-0 translate-y-10'
            }`}
            onClick={() => navigate("/choosinghaircut")}
          >
            Davom etish
          </button>
        </div>
      )}
    </div>
  );
};






const Barber = () => {
  const { setBarbersData } = useContext(DatabaseContext);

  const barbersData = [
    {
      name: "Aslbek Abdullayev",
      image: "https://example.com/barber1.jpg",
      reviews: 45,
      times: {
      "08-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30"],
      "09-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30", "19:00", "20:00"],
      "10-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30", "19:00", "20:00"],
      "11-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30", "19:00", "20:00"],
      "12-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30", "19:00", "20:00"],
      "13-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30", "19:00", "20:00"],
      },
      contact: "+998 91 234 56 78",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/aslbek_abdullayev",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
      location: [41.311081, 69.240562], // Adding the location here
    },
    {
      name: "Axmadjon Orziqulov",
      image: "https://example.com/barber2.jpg",
      reviews: 30,
      times: {
        "08-04-2025": ["10:00", "15:30", "16:30", "17:00", "17:30"],
        "09-04-2025": ["10:00", "11:30",  "16:30", "17:00", "17:30", "19:00", "20:00"],
        "10-04-2025": ["10:00", "11:30",  "16:30", "17:00", "17:30", "19:00", "20:00"],
        "11-04-2025": ["10:00", "11:30",  "16:30", "17:00", "17:30", "19:00", "20:00"],
        "12-04-2025": ["10:00", "11:30",  "16:30", "17:00", "17:30", "19:00", "20:00"],
        "13-04-2025": ["10:00", "11:30",  "16:30", "17:00", "17:30", "19:00", "20:00"],
        },
      contact: "+998 99 876 54 32",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/axmadjon_orziqulov",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
      location: [41.2995, 69.2401], // Adding the location here
    },
    {
      name: "Shohrux Hamraqulov",
      image: "https://example.com/barber3.jpg",
      reviews: 25,
      times: {
        "08-04-2025": ["10:00", "11:30", "14:00", "17:00", "17:30"],
        "09-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "20:00"],
        "10-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "20:00"],
        "11-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "20:00"],
        "12-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "20:00"],
        "13-04-2025": ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "20:00"],
        },
      contact: "+998 94 532 24 56",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/shohrux_hamraqulov",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
      location: [41.310000, 69.250000], // Adding the location here
    },
  ];

  useEffect(() => {
    setBarbersData(barbersData);
  }, [setBarbersData]);

  return <BarberList barbers={barbersData} />;
};

export default Barber;
