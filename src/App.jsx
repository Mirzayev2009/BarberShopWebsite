import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ChoosingBarber from "./ChoosingBareber/ChoosingBarber";
import ChoosingHaircut from "./ChoosingHaircut/ChoosingHaircut";
import ChoosingDate from "./ChoosingDate/ChoosingDate";
import { DatabaseProvider } from "./Database"; // Import provider
import FillingInfo from "./FillingInfoPage/FillingInfo";

const App = () => {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choosingbarber" element={<ChoosingBarber />} />
          <Route path="/choosingdate" element={<ChoosingDate />} />
          <Route path="/choosinghaircut" element={<ChoosingHaircut />} />
          <Route path="/fillinginfopage" element = {<FillingInfo/>} />
        </Routes>
      </Router>
    </DatabaseProvider>
  );
};

export default App;


