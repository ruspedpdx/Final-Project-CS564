import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavMenu from "./Navbar/Nav";
import Home from "./Views/Home";
import Raghad from "./Views/Raghad";
import Russ from "./Views/Russ";
import DatPage from "./Views/Dat";

const App = () => {
  return (
    <Router>
      <NavMenu />

      <Routes>
        <Route path="/" element={<Home title="Home Page" />} />
        <Route path="/Dat" element={<DatPage title="Dat Page" />} />
        <Route path="/Raghad" element={<Raghad title="Raghad Page" />} />
        <Route path="/Russ" element={<Russ title="Russ Page" />} />
      </Routes>
    </Router>
  );
};
export default App;