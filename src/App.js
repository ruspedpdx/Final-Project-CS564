import "./style.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavMenu from "./components/Navbar";
import Home from "./pages/Home";
import Raghad from "./pages/Raghad";
import Russ from "./pages/Russ";
import SearchPage from "./pages/SearchPage";
import CollegePage from "./components/CollegePage";

function App() {
  return (
    <Router>
      <NavMenu />

      <Routes>
        {" "}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/SearchPage"
          element={<SearchPage title="Search Page" />}
        />
        <Route path="/raghad" element={<Raghad />} />
        <Route path="/russ" element={<Russ title="Russ Page" />} />
        <Route path="/college/:name" element={<CollegePage />} />
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
export default App;
