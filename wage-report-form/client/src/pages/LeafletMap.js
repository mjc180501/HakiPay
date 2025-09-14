import React, { useEffect } from "react";
import L from "leaflet";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import csvFile from "./employers.csv";
import { Link } from "react-router-dom";

function LeafletMap() {
  useEffect(() => {
    // 1. Setup map
    const map = L.map("map").setView([-6.8, 39.2], 6);
    L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);



    let circles = [];
    let employerData = [];

    // Color scale (dark red → pale yellow → dark green)
    function salaryColor(value, min, max) {
      const ratio = (value - min) / (max - min);
      const r = Math.round(180 - 180 * ratio);
      const g = Math.round(60 + 160 * ratio);
      const b = 40;
      return `rgb(${r},${g},${b})`;
    }

    function reviewSize(count) {
      return Math.min(6 + count * 1.3, 16); // matches the HTML version
    }


    // 2. Load CSV
    Papa.parse(csvFile, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        employerData = results.data.filter((r) => r.latitude && r.longitude);
        populateJobFilter();
        updateMap();
        fitToData();
      },
    });

    function fitToData() {
      const bounds = employerData.map((e) => [
        parseFloat(e.latitude),
        parseFloat(e.longitude),
      ]);
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }

    function populateJobFilter() {
      const jobs = [...new Set(employerData.map((e) => e.job))];
      const jobSelect = document.getElementById("jobFilter");
      jobs.forEach((job) => {
        const option = document.createElement("option");
        option.value = job;
        option.textContent = job;
        jobSelect.appendChild(option);
      });
    }

    function updateMap() {
      circles.forEach((c) => map.removeLayer(c));
      circles = [];

      const jobFilter = document.getElementById("jobFilter").value;
      const companyOnly = document.getElementById("companyFilter").checked;
      const salaryMin = parseFloat(document.getElementById("salaryFilter").value);
      const envMin = parseFloat(document.getElementById("envFilter").value);
      const socialMin = parseFloat(document.getElementById("socialFilter").value);

      const salaries = employerData.map((e) => parseFloat(e.avg_salary) || 0);
      const minSalary = Math.min(...salaries);
      const maxSalary = Math.max(...salaries);

      employerData.forEach((emp) => {
        const salary = parseFloat(emp.avg_salary) || 0;
        const env = parseFloat(emp.avg_envir_rating) || 0;
        const social = parseFloat(emp.avg_social_rating) || 0;
        const reviews = parseInt(emp.review_count) || 1;
        const isCompany = emp.display_name !== "Private employer";

        if (jobFilter !== "all" && emp.job !== jobFilter) return;
        if (companyOnly && !isCompany) return;
        if (salary < salaryMin || env < envMin || social < socialMin) return;

        const circle = L.circleMarker([emp.latitude, emp.longitude], {
          radius: reviewSize(reviews),
          fillColor: salaryColor(salary, minSalary, maxSalary),
          color: "#333",
          weight: 0.6,
          opacity: 0.6,
          fillOpacity: 0.9,
        }).addTo(map);

        const tooltipHtml = `
          <b>Employer:</b> ${emp.display_name}<br>
          <b>Location:</b> ${emp.loc}<br>
          <b>Job:</b> ${emp.job}<br>
          <b>Reviews:</b> ${reviews}<br>
          <b>Average Salary:</b> ${(salary * 1000).toLocaleString()} TSh<br>
          <b>Environment Rating:</b> ${env} / 5<br>
          <b>Social Rating:</b> ${social} / 5
        `;
        circle.bindTooltip(tooltipHtml, { sticky: true });
        circles.push(circle);
      });
    }

    // Event listeners
    document.getElementById("jobFilter").addEventListener("change", updateMap);
    document.getElementById("companyFilter").addEventListener("change", updateMap);
    document.getElementById("salaryFilter").addEventListener("input", (e) => {
      document.getElementById("salaryValue").innerText = e.target.value;
      updateMap();
    });
    document.getElementById("envFilter").addEventListener("input", (e) => {
      document.getElementById("envValue").innerText = e.target.value;
      updateMap();
    });
    document.getElementById("socialFilter").addEventListener("input", (e) => {
      document.getElementById("socialValue").innerText = e.target.value;
      updateMap();
    });
  }, []);

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <div className="dropdown">
          <button className="dropbtn">Services ▾</button>
          <div className="dropdown-content">
            <Link to="/wage-report">Share your wages now</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <Link to="/defining-the-problem">Defining the Problem</Link>
        <Link to="/solutions">Solution</Link>
        <Link to="/map">Wage Map</Link>
      </div>
      <div className="controls" style={{ margin: "10px", fontFamily: "sans-serif" }}>
        <div>
          <label>
            Filter by Job:{" "}
            <select id="jobFilter">
              <option value="all">All</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" id="companyFilter" /> Show companies only
          </label>
        </div>

        <div>
          <label>
            Minimum Salary:
            <input type="range" id="salaryFilter" min="0" max="1500" step="50" defaultValue="0" />
            <span id="salaryValue">0</span>
          </label>
        </div>

        <div>
          <label>
            Minimum Environment Rating:
            <input type="range" id="envFilter" min="1" max="5" step="1" defaultValue="1" />
            <span id="envValue">1</span>
          </label>
        </div>

        <div>
          <label>
            Minimum Social Rating:
            <input type="range" id="socialFilter" min="1" max="5" step="1" defaultValue="1" />
            <span id="socialValue">1</span>
          </label>
        </div>
      </div>

      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
}

export default LeafletMap;