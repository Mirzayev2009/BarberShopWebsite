import React from 'react';
import Nav from '../Nav';
import { MyDatePicker } from '@/components/ui/calendar';
import TimePicker from './TimePicker';

const ChoosingDate = () => {
  return (
    <div>
      <Nav />
      <div className="mt-28 flex flex-col md:flex-row h-screen bg-white shadow-md gap-2 p-6 items-center justify-center">
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <MyDatePicker />
        </div>
        <div className="w-full h-full shadow-md md:w-1/2 flex justify-center">
          <TimePicker />
        </div>
      </div>
    </div>
  );
};

export default ChoosingDate;
