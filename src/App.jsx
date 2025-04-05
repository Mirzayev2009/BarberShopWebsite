import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import Homepage from "./Homepage/Homepage";
import ChoosingBarber from "./ChoosingBareber/ChoosingBarber";
import ChoosingHaircut from "./ChoosingHaircut/ChoosingHaircut";
import ChoosingDate from "./ChoosingDate/ChoosingDate";
import { DatabaseProvider } from "./Database"; // Import provider
import FillingInfo from "./FillingInfoPage/FillingInfo";
import FinalPage from "./FinalPage/FinalPage";

const App = () => {
  return (
    <DatabaseProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS> {/* Wrap with MantineProvider */}
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
