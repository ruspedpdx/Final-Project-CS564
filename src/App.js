import "./style.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavMenu from "./components/Navbar";
import Home from "./pages/Home";
import Raghad from "./pages/Raghad";
import Russ from "./pages/Russ";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <NavMenu />

      <Routes>
        <Route path="/" element={<Home title="Home Page" />} />
        <Route
          path="/SearchPage"
          element={<SearchPage title="Search Page" />}
        />
        <Route path="/Raghad" element={<Raghad title="Raghad Page" />} />
        <Route path="/Russ" element={<Russ title="Russ Page" />} />
      </Routes>
    </Router>
  );
};
export default App;
