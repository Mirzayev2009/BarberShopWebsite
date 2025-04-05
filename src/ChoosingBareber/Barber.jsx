import { useContext , useEffect} from "react";
import { toast } from "sonner";
import { DatabaseContext } from "../Database";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";

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
    <div className="w-[500px] p-8 mt-28 bg-white shadow-lg rounded-2xl text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      <img src={barber.image} alt={barber.name} className="w-52 h-52 object-cover rounded-full mx-auto hover:scale-105 transition-transform duration-300" />
      <h2 className="text-3xl font-bold mt-4">{barber.name}</h2>
      <p className="text-gray-600 text-lg">Reviews: {barber.reviews}</p>

      {/* Date Picker */}
      {isSelectedBarber && selectedTime && (
        <div className="mt-4 flex flex-col items-center">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full max-w-[280px] border-2 border-gray-300 rounded-lg p-4 shadow-lg"
            styles={{
              input: {
                height: 45,
                fontSize: '16px',
                paddingLeft: '10px',
                paddingRight: '10px',
                borderRadius: '8px',
              },
              calendar: {
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              },
              day: {
                fontWeight: 'bold',
                borderRadius: '6px',
                '&[dataSelected]': {
                  backgroundColor: '#4A90E2',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#E4F0FF',
                },
              },
            }}
          />
        </div>
      )}

      <h3 className="text-2xl font-semibold mt-4">Bo'sh vaqtlar:</h3>
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {barber.times.map((time, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(time)}
            className={`px-5 py-2 rounded-lg text-lg transition-all duration-300 ${selectedTime === time ? 'bg-blue-700 text-white scale-105' : 'bg-amber-500 text-white hover:bg-blue-700 hover:scale-105'}`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Proceed Button */}
      {isSelectedBarber && selectedTime && selectedDate && (
        <button className="mt-4 w-[70%] bg-blue-700 text-white py-2 rounded-lg text-xl" onClick={() => navigate("/choosinghaircut")}>
          Davom etish
        </button>
      )}

      <div className="mt-4 flex justify-between items-center text-lg text-gray-700">
        <p className="flex items-center gap-2">
          <i className="bx bxs-phone bx-md"></i> {barber.contact}
        </p>
        {barber.socials.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-75">
            <img src={social.icon} className="w-8 h-8" />
            <span>{barber.social_contact}</span>
          </a>
        ))}
        <button className="text-4xl hover:text-blue-600 transition-colors" onClick={handleBarberSelection}>
          <i className="bx bx-check-circle text-6xl"></i>
        </button>
      </div>
    </div>
  );
};




const BarberList = ({ barbers }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {barbers.map((barber, index) => (
        <BarberCard key={index} barber={barber} />
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
      times: ["10:00", "11:30", "14:00", "15:30", "16:30", "17:00", "17:30"],
      contact: "+998 91 234 56 78",
      social_contact: "aslbek_abdullayev",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/aslbek_abdullayev",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
    {
      name: "Axmadjon Orziqulov",
      image: "https://example.com/barber2.jpg",
      reviews: 30,
      times: ["09:00", "12:30", "14:30", "15:00", "17:00"],
      contact: "+998 99 876 54 32",
      social_contact: "axmadjon_orziqulov",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/axmadjon_orziqulov",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
    {
      name: "Shohrux Hamraqulov",
      image: "https://example.com/barber3.jpg",
      reviews: 25,
      times: ["08:00", "10:30", "16:00", "16:30", "17:00", "17:30"],
      contact: "+998 94 532 24 56",
      social_contact: "shohrux_hamraqulov",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com/shohrux_hamraqulov",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
  ];

  // Set the barbers data after initializing it
  useEffect(() => {
    setBarbersData(barbersData);
  }, [setBarbersData]);

  return (
    <BarberList barbers={barbersData} />
  );
};


export default Barber;


