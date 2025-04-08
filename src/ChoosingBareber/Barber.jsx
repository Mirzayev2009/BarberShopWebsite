import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { DatabaseContext } from "../Database";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // Ensure dayjs is imported

const BarberCard = ({ barber }) => {
  const navigate = useNavigate();
  const {
    selectedTime,
    setSelectedTime,
    selectedBarber,
    setSelectedBarber,
    personalInfo,
    setPersonalInfo,
  } = useContext(DatabaseContext);

  const isSelectedBarber = selectedBarber?.name === barber.name;

  const handleTimeClick = (time) => {
    if (!selectedBarber) {
      setSelectedBarber(barber);
    }
    setSelectedTime(time);

    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedTime: time,
    }));
  };

  const handleBarberSelection = () => {
    setSelectedBarber(barber);
    setSelectedTime(null);

    setPersonalInfo((prev) => ({
      ...prev,
      selectedBarber: barber,
      selectedTime: null,
    }));

    toast.success(`Sartarosh tanlandi: ${barber.name}. Endi sanani tanlang.`, {
      action: {
        label: "Davom etish",
        onClick: () => navigate("/choosingdate"),
      },
    });
  };

  // Get today's and tomorrow's dates in the format "DD-MM-YYYY"
  const today = dayjs().format("DD-MM-YYYY");
  const tomorrow = dayjs().add(1, "day").format("DD-MM-YYYY");

  // Get times available for today's and tomorrow's dates
  const availableTimesToday = barber.times[today] || [];
  const availableTimesTomorrow = barber.times[tomorrow] || [];

  return (
    <div className="col-md-4 col-sm-6 mb-4 mt-32">
      <div className={`card shadow-lg rounded-3 p-4 ${isSelectedBarber ? "border border-primary" : ""}`}>
        <img
          src={barber.image}
          alt={barber.name}
          className="card-img-top rounded-circle mx-auto d-block"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{barber.name}</h5>
          <p className="card-text text-muted">Reviews: {barber.reviews}</p>

          {availableTimesToday.length > 0 && (
            <>
              <h6 className="mt-3">Bugungi bo'sh vaqtlar:</h6>
              <div className="btn-group mt-2 d-flex justify-content-center flex-wrap">
                {availableTimesToday.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    className={`btn btn-${selectedTime === time ? "primary" : "warning"} m-1`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

          {availableTimesTomorrow.length > 0 && (
            <>
              <h6 className="mt-3">Ertangi bo'sh vaqtlar:</h6>
              <div className="btn-group mt-2 d-flex justify-content-center flex-wrap">
                {availableTimesTomorrow.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    className={`btn btn-${selectedTime === time ? "primary" : "warning"} m-1`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

          {availableTimesToday.length === 0 && availableTimesTomorrow.length === 0 && (
            <p className="text-muted">Bugun va ertaga uchun vaqt mavjud emas</p>
          )}

          {isSelectedBarber && selectedTime && (
            <button
              className="btn btn-primary w-100 mt-4"
              onClick={() => navigate("/choosinghaircut")}
            >
              Davom etish
            </button>
          )}

          <div className="mt-3">
            <p className="d-flex justify-content-between align-items-center">
              <span>
                <i className="bx bxs-phone"></i> {barber.contact}
              </span>
              <span className="d-flex gap-2">
                {barber.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon}
                      className="social-icon"
                      alt={social.name}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </a>
                ))}
              </span>
            </p>
            <button className="btn btn-outline-primary" onClick={handleBarberSelection}>
              <i className="bx bx-check-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarberList = () => {
  const { barbersData } = useContext(DatabaseContext);

  if (!barbersData || barbersData.length === 0) {
    return <p className="text-center">No barbers available at the moment.</p>;
  }

  return (
    <div className="row">
      {barbersData.map((barber) => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
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
