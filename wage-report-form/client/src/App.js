import React, { useState } from "react";
import axios from "axios";

function App() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [wage, setWage] = useState("");
  const [userId, setUserId] = useState("");
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
        userId: userId || Math.random().toString(36).substring(2, 10)
      });
      alert("Wage submitted!");
      setRole(""); setRegion(""); setIndustry(""); setExperience(""); setCompanyName(""); setWage(""); setUserId("");
      fetchWages();
    } catch (err) {
      console.error(err);
      alert("Error submitting wage");
    }
  };

  const fetchWages = async () => {
    if (!role || !region) return;
    try {
      const res = await axios.get("http://localhost:5000/api/wages", { params: { role, region } });
      setWages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const averageWage = wages.length ? (wages.reduce((sum, w) => sum + w.wage, 0) / wages.length).toFixed(2) : 0;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Anonymous Wage Reporting</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
        <input placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} required />
        <input placeholder="Industry" value={industry} onChange={e => setIndustry(e.target.value)} required />
        <input placeholder="Experience (years)" type="number" value={experience} onChange={e => setExperience(e.target.value)} required />
        <input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
        <input placeholder="Wage" type="number" value={wage} onChange={e => setWage(e.target.value)} required />
        <button type="submit">Submit Wage</button>
      </form>

      <button onClick={fetchWages}>Fetch Wages</button>
      <h2>Average Wage: {averageWage}</h2>

      <table border="1" cellPadding="5" style={{ marginTop: "1rem", borderCollapse: "collapse" }}>
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
  );
}

export default App;

