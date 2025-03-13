import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ChoosingBarber from "./ChoosingBareber/ChoosingBarber";
import ChoosingHaircut from "./ChoosingHaircut/ChoosingHaircut";
import ChoosingDate from "./ChoosingDate/ChoosingDate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choosingbarber" element={<ChoosingBarber />} />
        <Route path="/choosingdate" element={<ChoosingDate />} />
        <Route path="/choosinghaircut" element={<ChoosingHaircut />} />
      </Routes>
    </Router>
  );
};

export default App;

