import { DatabaseContext } from '@/DataBase'
import Nav from '@/Nav'
import Info from './Info'
import React, { useContext } from 'react'
import PersonalInfoForm from './Form';

const FillingInfo = () => {
  const { selectedTime, selectedDate, selectedBarber, selectedHaircut, setSelectedTime, setSelectedDate } = useContext(DatabaseContext);

  console.log("selectedBarber:", selectedBarber); // ✅ Check if this has a value

  const handleUpdate = (updatedData) => {
    if (updatedData.selectedTime !== undefined) setSelectedTime(updatedData.selectedTime);
    if (updatedData.selectedDate !== undefined) setSelectedDate(updatedData.selectedDate);
    // If you want to handle other updates, add them here.
  };

  return (
    <div>
      {/* <Nav /> */}
      <div>
        <Info
          selectedBarber={selectedBarber}
          selectedDate={selectedDate}
          selectedHaircut={selectedHaircut}
          selectedTime={selectedTime}
          onUpdate={handleUpdate}  // ✅ Passing onUpdate prop
        />
      </div>
      <div><PersonalInfoForm/></div>
    </div>
  );
};

export default FillingInfo;
