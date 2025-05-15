import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Homepage from "./Homepage/Homepage";
import ChoosingBarber from "./ChoosingBareber/ChoosingBarber";
import ChoosingHaircut from "./ChoosingHaircut/ChoosingHaircut";
import ChoosingDate from "./ChoosingDate/ChoosingDate";
import { DatabaseProvider } from "./Database"; // Make sure this uses the fetched data
import FillingInfo from "./FillingInfoPage/FillingInfo";
import FinalPage from "./FinalPage/FinalPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  

  return (
    <DatabaseProvider >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choosingbarber" element={<ChoosingBarber />} />
            <Route path="/choosingdate" element={<ChoosingDate />} />
            <Route path="/choosinghaircut" element={<ChoosingHaircut />} />
            <Route path="/fillinginfopage" element={<FillingInfo />} />
            <Route path="/finalpage" element={<FinalPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </DatabaseProvider>
  );
};

export default App;
