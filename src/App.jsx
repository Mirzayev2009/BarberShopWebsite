import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Homepage from "./pages/Homepage/Homepage";
import ChoosingBarber from "./pages/ChoosingBareber/ChoosingBarber";
import ChoosingHaircut from "./pages/ChoosingHaircut/ChoosingHaircut";
import ChoosingDate from "./pages/ChoosingDate/ChoosingDate";
import { DatabaseProvider } from "./Database"; // Make sure this uses the fetched data
import FillingInfo from "./pages/FillingInfoPage/FillingInfo";
import FinalPage from "./pages/FinalPage/FinalPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "@/components/ui/sonner"; 

const App = () => {

  

  return (
    <DatabaseProvider >
      <MantineProvider withGlobalStyles withNormalizeCSS>
            <Toaster />
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
