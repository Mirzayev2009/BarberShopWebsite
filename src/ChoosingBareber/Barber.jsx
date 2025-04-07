import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { DatabaseContext } from "../Database";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";

const BarberCard = ({ barber }) => {
  const navigate = useNavigate();
  const { selectedTime, setSelectedTime, selectedDate, setSelectedDate, selectedBarber, setSelectedBarber, personalInfo, setPersonalInfo } = useContext(DatabaseContext);

  const isSelectedBarber = selectedBarber?.name === barber.name;

  const handleTimeClick = (time) => {
    setSelectedBarber(barber);
    setSelectedTime(time);
    setPersonalInfo((prev) => ({ ...prev, selectedTime: time, selectedBarber: barber }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPersonalInfo((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleBarberSelection = () => {
    setSelectedBarber(barber);
    setPersonalInfo((prev) => ({ ...prev, selectedBarber: barber }));

    toast.success(`Sartarosh tanlandi: ${barber.name}. Endi vaqtni tanlang.`, {
      action: {
        label: "Tanlash",
        onClick: () => navigate("/choosingdate"),
      },
    });
  }; 

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card shadow-lg rounded-3 p-4">
        <img
          src={barber.image}
          alt={barber.name}
          className="card-img-top rounded-circle mx-auto d-block"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{barber.name}</h5>
          <p className="card-text text-muted">Reviews: {barber.reviews}</p>

          {/* Date Picker */}
          {isSelectedBarber && selectedTime && (
            <div className="mt-3">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control"
              />
            </div>
          )}

          <h6 className="mt-3">Bo'sh vaqtlar:</h6>
          <div className="btn-group mt-2 d-flex justify-content-center flex-wrap">
            {barber.times.map((time, index) => (
              <button
                key={index}
                onClick={() => handleTimeClick(time)}
                className={`btn btn-${selectedTime === time ? "primary" : "warning"} m-1`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Proceed Button */}
          {isSelectedBarber && selectedTime && selectedDate && (
            <button className="btn btn-primary w-100 mt-4" onClick={() => navigate("/choosinghaircut")}>
              Davom etish
            </button>
          )}

          <div className="mt-3">
            <p className="d-flex justify-content-between">
              <span>
                <i className="bx bxs-phone"></i> {barber.contact}
              </span>
              {barber.socials.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={social.icon}
                    className="social-icon"
                    alt={social.name}
                    style={{ width: "30px", height: "30px" }}
                  />
                </a>
              ))}
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

const BarberList = ({ barbers }) => {
  return (
    <div className="container">
      <div className="row">
        {barbers.map((barber, index) => (
          <BarberCard key={index} barber={barber} />
        ))}
      </div>
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
      times: ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30"],
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
      times: ["09:00", "12:30", "14:30", "15:00", "17:00"],
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
      times: ["08:00", "10:30", "16:00", "16:30", "17:00", "17:30"],
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
