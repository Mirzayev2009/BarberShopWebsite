import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BarberCard = ({ barber, handleBarberSelection }) => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="w-[500px] p-8 mt-28 bg-white shadow-lg rounded-2xl text-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Image Section */}
      <div className="w-full h-52 flex justify-center">
        <img
          src={barber.image}
          alt={barber.name}
          className="w-52 h-52 object-cover rounded-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Barber Name & Reviews */}
      <h2 className="text-3xl font-bold mt-4">{barber.name}</h2>
      <p className="text-gray-600 text-lg">Reviews: {barber.reviews}</p>

      {/* Available Time Slots */}
      <div className="mt-4 h-4/12">
        <h3 className="text-2xl font-semibold">Bo'sh vaqtlar:</h3>
        <div className="flex flex-wrap gap-3 justify-center mt-3">
          {barber.times.map((time, index) => (
            <span
              key={index}
              className="bg-amber-500 text-white px-5 py-2 rounded-lg text-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Contact & Button Section */}
      <div className="mt-2 mb-4 flex justify-between items-center text-2xl gap-6 text-gray-700">
        {/* Contact (Phone & Instagram) */}
        <div className="items-center gap-4">
          {/* Phone */}
          <div className="flex items-center gap-2 text-lg">
            <i className="bx bxs-phone bx-md cursor-pointer hover:scale-110 transition-transform"></i>
            <p className="text-gray-700 text-lg">{barber.contact}</p>
          </div>

          {/* Instagram */}
          {barber.socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-75"
            >
              <img src={social.icon} className="w-8 h-8" />
              <p className="text-gray-700 text-lg">{barber.social_contact}</p>
            </a>
          ))}
        </div>

        {/* Selection Button */}
        <button
          className="text-2xl"
          onClick={() => {
            handleBarberSelection(barber);
            toast.success(`Sartarosh tanlandi: ${barber.name}    Ana endi aniq vaqtni tanlang`, {
              action: {
                label: "Tanlash",
                onClick: () => navigate("/choosingdate"), // Navigate when toast is clicked
              },
            });
          }}
        >
          <i className="bx bx-radio-circle text-6xl"></i>
        </button>
      </div>
    </div>
  );
};


const BarberList = ({ barbers, setChoosenBarber }) => {
  const handleBarberSelection = (barber) => {
    setChoosenBarber(barber);
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {barbers.map((barber, index) => (
        <BarberCard key={index} barber={barber} handleBarberSelection={handleBarberSelection} />
      ))}
    </div>
  );
};

const Barber = ({ setChoosenBarber }) => {
  const barbersData = [
    {
      name: "Aslbek Abdullayev",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 45,
      times: ["10:00", "11:30", "14:00", "15:30"],
      contact: "+998 91 234 56 78",
      social_contact: "aslbek_abdullayev",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
    {
      name: "Axmadjon Orziqulov",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 30,
      times: ["9:00", "12:30", "15:00", "14:30", "17:00"],
      contact: "+998 99 876 54 32",
      social_contact: "axmadjon_orziqulov",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
    {
      name: "Shohrux Hamraqulov",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 25,
      times: ["8:00", "1:30", "4:00"],
      contact: "+998 94 532 24 56",
      social_contact: "shohrux_hamraqulov",
      socials: [
        {
          name: "Instagram",
          link: "https://instagram.com",
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        },
      ],
    },
  ];

  return <BarberList barbers={barbersData} setChoosenBarber={setChoosenBarber} />;
};

export default Barber;

