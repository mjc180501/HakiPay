import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS

function App() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [wage, setWage] = useState("");
  const [wages, setWages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/wages", {
        role,
        region,
        industry,
        experience: Number(experience),
        companyName,
        wage: Number(wage),
        userId: Math.random().toString(36).substring(2, 10),
      });
      alert("Wage submitted successfully!");
      setRole("");
      setRegion("");
      setIndustry("");
      setExperience("");
      setCompanyName("");
      setWage("");
      fetchWages();
    } catch (err) {
      console.error(err);
      alert("Error submitting wage");
    }
  };

  const fetchWages = async () => {
    if (!role || !region) return;
    try {
      const res = await axios.get("http://localhost:5000/api/wages", {
        params: { role, region },
      });
      setWages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const averageWage = wages.length
    ? (wages.reduce((sum, w) => sum + w.wage, 0) / wages.length).toFixed(2)
    : 0;

  return (
    <div className="container">
      <h1>Anonymous Wage Reporting</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Wage"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          required
        />
        <button type="submit">Submit Wage</button>
      </form>

      <div className="average">
        <strong>Average Wage:</strong> {averageWage}
      </div>

      <button className="fetch-btn" onClick={fetchWages}>
        Fetch Wages
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Region</th>
              <th>Industry</th>
              <th>Experience</th>
              <th>Company</th>
              <th>Wage</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {wages.map((w, i) => (
              <tr key={i}>
                <td>{w.role}</td>
                <td>{w.region}</td>
                <td>{w.industry}</td>
                <td>{w.experience}</td>
                <td>{w.companyName}</td>
                <td>{w.wage}</td>
                <td>{new Date(w.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
