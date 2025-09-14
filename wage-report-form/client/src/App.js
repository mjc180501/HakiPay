import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import WageReport from "./pages/WageReport";
import LeafletMap from './pages/LeafletMap';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import DefiningProblemPage from './pages/DefiningProblemPage';
import SolutionsPage from './pages/SolutionsPage';


function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/wage-report">Wage Report</Link>
      </nav> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wage-report" element={<WageReport />} />
          <Route path="/map" element={<LeafletMap />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/defining-the-problem" element={<DefiningProblemPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route 
  path="/calculator" 
  element={
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe 
        src="http://localhost:5000" 
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Financial Calculator"
      />
    </div>
  } 
/>

        </Routes>

    </Router>
  );
}

export default App;
