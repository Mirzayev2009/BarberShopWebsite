import React from "react";

const BarberCard = ({ barber }) => {
  return (
    <div className="w-[450px] p-6 bg-white shadow-lg rounded-2xl text-center transition-transform transform hover:scale-103 hover:shadow-2xl duration-300">
      <div className="w-full h-48 object-cover flex justify-center">
        <img
           src={barber.image}
           alt={barber.name}
           className="w-48 h-48 object-cover rounded-[100px] transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h2 className="text-3xl font-bold mt-4">{barber.name}</h2>
      <p className="text-gray-600 text-xl">Reviews: {barber.reviews}</p>
      <div className="mt-3">
        <h3 className="text-2xl font-semibold">Bo'sh vaqtlar:</h3>
        <div className="flex flex-wrap gap-3 justify-center mt-3">
          {barber.times.map((time, index) => (
            <span
              key={index}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg text-xl transition-colors duration-300 hover:bg-blue-700"
            >
              {time}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-semibold">Contact:</h3>
        <p className="text-gray-700 text-xl">{barber.contact}</p>
        <div className="flex justify-center gap-6 mt-3">
          {barber.socials.map((social, index) => (
            <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-300 hover:opacity-75">
              <img src={social.icon}  className="w-10 h-10" />
            </a>
          ))}
        </div>
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
  const barbersData = [
    {
      name: "Aslbek Abdullayev",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 45,
      times: ["10:00 ", "11:30 ", "14:00 ", "15:30", ],
      contact: "+998 91 234 56 78",
      socials: [
        { name: "Instagram", link: "https://instagram.com", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" },
        
      ]
    },
    {
      name: "John Doe",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 30,
      times: ["9:00 ", "12:30", "15:00 ", "14:30", "17:00"],
      contact: "+998 99 876 54 32",
      socials: [
        { name: "Instagram", link: "https://instagram.com", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" },
        
      ]
    },
    {
      name: "Jane Smith",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s",
      reviews: 25,
      times: ["8:00 ", "1:30 ", "4:00 "],
      contact: "+998 94 532 24 56",
      socials: [
        { name: "Instagram", link: "https://instagram.com", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" },
        
      ]
    }
  ];

  return <BarberList barbers={barbersData} />;
};

export default Barber;

