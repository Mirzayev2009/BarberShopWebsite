import { DatabaseContext } from '@/DataBase'
import Nav from '@/Nav'
import  Info from './Info'
import React, { useContext } from 'react'
import PersonalInfoForm from './Form';

const FillingInfo = () => {
  const { selectedTime, selectedDate, selectedBarber, selectedHaircut } = useContext(DatabaseContext);

  console.log("selectedBarber:", selectedBarber); // ✅ Check if this has a value

  return (
    <div>
      <Nav />
      <div>
        <Info
          selectedBarber={selectedBarber}
          selectedDate={selectedDate}
          selectedHaircut={selectedHaircut}
          selectedTime={selectedTime}
        />
      </div>
      <div><PersonalInfoForm/></div>
    </div>
  );
};

export default FillingInfo