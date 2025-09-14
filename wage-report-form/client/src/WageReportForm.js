import React, { useState } from "react";
import axios from "axios";

export default function WageReportForm() {
  const [formData, setFormData] = useState({
    userName: "",
    companyName: "",
    role: "",
    region: "",
    wage: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.role ||
      !formData.region ||
      !formData.wage ||
      formData.wage <= 0
    ) {
      return alert("Please enter valid data.");
    }
    try {
      await axios.post("/api/wages", formData);
      alert("Wage reported anonymously!");
      setFormData({
        userName: "",
        companyName: "",
        role: "",
        region: "",
        wage: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting wage report");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Report Your Wage Anonymously</h2>
      <input
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="Your Name (optional)"
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <input
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <input
        name="region"
        value={formData.region}
        onChange={handleChange}
        placeholder="Region"
        className="mb-2 w-full p-2 border rounded"
        required
      />
      <input
        name="wage"
        value={formData.wage}
        onChange={handleChange}
        placeholder="Wage"
        type="number"
        className="mb-4 w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
