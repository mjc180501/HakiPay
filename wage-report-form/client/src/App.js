import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import WageReport from "./pages/WageReport";
import LeafletMap from './pages/LeafletMap';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/wage-report">Wage Report</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wage-report" element={<WageReport />} />
        <Route path="/map" element={<LeafletMap/>} />
      </Routes>
    </Router>
  );
}

export default App;
