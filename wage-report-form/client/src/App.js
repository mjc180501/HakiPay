import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const LANGUAGES = {
  en: {
    title: "Anonymous Wage Report",
    submit: "Submit",
    fetch: "Fetch Wages",
    export: "Export CSV",
    placeholders: {
      role: "Select Role",
      region: "Select Region",
      industry: "Industry",
      experience: "Years of Experience",
      company: "Company Name",
      wage: "Base Wage",
      bonuses: "Bonuses",
      benefits: "Benefits",
      hours: "Hours Worked"
    },
    belowBenchmark: "Warning: Wage below recommended minimum",
    error: "Error submitting wage",
    dbLink: "View Company Database"
  },
  sw: { // Swahili
    title: "Ripoti ya Mishahara Bila Kutambulika",
    submit: "Tuma",
    fetch: "Pata Mishahara",
    export: "Hamisha CSV",
    placeholders: {
      role: "Chagua Kazi",
      region: "Chagua Mkoa",
      industry: "Sekta",
      experience: "Miaka ya Uzoefu",
      company: "Jina la Kampuni",
      wage: "Mshahara Msingi",
      bonuses: "Bonasi",
      benefits: "Manufaa",
      hours: "Masaa ya Kazi"
    },
    belowBenchmark: "Onyo: Mshahara chini ya kiwango kilichopendekezwa",
    error: "Hitilafu katika kutuma mshahara",
    dbLink: "Tazama Hifadhidata ya Kampuni"
  },
  fr: { // French
    title: "Rapport de Salaire Anonyme",
    submit: "Soumettre",
    fetch: "Récupérer les Salaires",
    export: "Exporter CSV",
    placeholders: {
      role: "Sélectionner le Poste",
      region: "Sélectionner la Région",
      industry: "Industrie",
      experience: "Années d'Expérience",
      company: "Nom de l'Entreprise",
      wage: "Salaire de Base",
      bonuses: "Bonus",
      benefits: "Avantages",
      hours: "Heures Travaillées"
    },
    belowBenchmark: "Attention : Salaire en dessous du minimum recommandé",
    error: "Erreur lors de la soumission du salaire",
    dbLink: "Voir la Base de Données des Entreprises"
  },
  es: { // Spanish
    title: "Informe Anónimo de Salarios",
    submit: "Enviar",
    fetch: "Obtener Salarios",
    export: "Exportar CSV",
    placeholders: {
      role: "Seleccionar Rol",
      region: "Seleccionar Región",
      industry: "Industria",
      experience: "Años de Experiencia",
      company: "Nombre de la Empresa",
      wage: "Salario Base",
      bonuses: "Bonificaciones",
      benefits: "Beneficios",
      hours: "Horas Trabajadas"
    },
    belowBenchmark: "Advertencia: Salario por debajo del mínimo recomendado",
    error: "Error al enviar el salario",
    dbLink: "Ver Base de Datos de Empresas"
  }
};

function App() {
  const MIN_REPORTS = 20;
  const [lang, setLang] = useState("en");
  const t = LANGUAGES[lang];

  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [wage, setWage] = useState("");
  const [bonuses, setBonuses] = useState("");
  const [benefits, setBenefits] = useState("");
  const [hours, setHours] = useState("");
  const [image, setImage] = useState(null);

  const [wages, setWages] = useState([]);
  const [message, setMessage] = useState("");
  const [sortField, setSortField] = useState("wage");
  const [sortDirection, setSortDirection] = useState("desc");

  const predefinedRoles = ["Cleaning", "Teaching", "Engineering", "Healthcare", 
  "Hospitality", "IT / Tech", "Construction", "Retail", "Other"];
  const predefinedRegions = ["Zanzibar North", "Dar es Salaam", "Arusha", "Mwanza", 
  "Dodoma", "Mbeya", "Kilimanjaro", "Other"];
  const predefinedIndustries = ["Hospitality", "Tech", "Construction", "Other"];
  const currencies = ["USD", "TZS", "EUR"];

  const minRecommended = 300; // Example benchmark

  useEffect(() => {
    fetchWages();
  }, [role, region, industry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (experience < 0 || wage < 0 || bonuses < 0 || hours < 0) {
      setMessage(t.error);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("region", region);
      formData.append("industry", industry);
      formData.append("experience", experience);
      formData.append("companyName", companyName);
      formData.append("wage", wage);
      formData.append("bonuses", bonuses);
      formData.append("benefits", benefits);
      formData.append("hours", hours);
      formData.append("currency", "USD");
      formData.append("userId", Math.random().toString(36).substring(2, 10));
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/wages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(t.success);
      // Reset
      setRole(""); setRegion(""); setIndustry(""); setExperience("");
      setCompanyName(""); setWage(""); setBonuses(""); setBenefits(""); setHours(""); setImage(null);
      fetchWages();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setMessage(t.error);
    }
  };

  const fetchWages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wages", {
        params: { role, region, industry },
      });
      setWages(res.data);
    } catch (err) {
      console.error(err);
      setMessage(t.error);
    }
  };

  const sortedWages = [...wages].sort((a, b) => {
    if (sortDirection === "asc") return a[sortField] - b[sortField];
    else return b[sortField] - a[sortField];
  });

  const averageWage = wages.length ? (wages.reduce((sum, w) => sum + w.wage, 0) / wages.length).toFixed(2) : 0;
  const minWage = wages.length ? Math.min(...wages.map((w) => w.wage)) : 0;
  const maxWage = wages.length ? Math.max(...wages.map((w) => w.wage)) : 0;

  const exportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Role,Region,Industry,Experience,Company,Wage,Currency,Bonuses,Benefits,Hours,Effective Hourly,Submitted At\n";
    sortedWages.forEach((w) => {
      const companyDisplay = wages.length >= MIN_REPORTS ? w.companyName : "Hidden Company";
      csvContent += `${w.role},${w.region},${w.industry},${w.experience},${companyDisplay},${w.wage},USD,${w.bonuses},${w.benefits},${w.hours},${w.effectiveHourly || ""},${new Date(w.createdAt).toLocaleString()}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDelete = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this submission?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/wages/${userId}`);
    setMessage("Submission deleted!");
    fetchWages(); // Refresh table
    setTimeout(() => setMessage(""), 3000);
  } catch (err) {
    console.error(err);
    setMessage("Error deleting submission");
  }
};


  return (
    <div className="container">
      <h1>{t.title}</h1>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="sw">Swahili</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <p className="notice">{t.notice}</p>
      {message && <div className="message">{message}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">{t.placeholders.role}</option>
          {predefinedRoles.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>

        <select value={region} onChange={(e) => setRegion(e.target.value)} required>
          <option value="">{t.placeholders.region}</option>
          {predefinedRegions.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>

        <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
          <option value="">{t.placeholders.industry}</option>
          {predefinedIndustries.map((i) => (<option key={i} value={i}>{i}</option>))}
        </select>

        <input type="number" placeholder={t.placeholders.experience} value={experience} onChange={(e) => setExperience(e.target.value)} required/>
        <input type="text" placeholder={t.placeholders.company} value={companyName} onChange={(e) => setCompanyName(e.target.value)} required/>
        <input type="number" placeholder={t.placeholders.wage} value={wage} onChange={(e) => setWage(e.target.value)} required/>
        <input type="number" placeholder={t.placeholders.bonuses} value={bonuses} onChange={(e) => setBonuses(e.target.value)} />
        <input type="text" placeholder={t.placeholders.benefits} value={benefits} onChange={(e) => setBenefits(e.target.value)} />
        <input type="number" placeholder={t.placeholders.hours} value={hours} onChange={(e) => setHours(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        {wage && wage < minRecommended && <p className="alert">{t.belowBenchmark}</p>}

        <button type="submit">{t.submit}</button>
      </form>

      <div className="stats">
        <p>Average Wage: {averageWage}</p>
        <p>Min Wage: {minWage}</p>
        <p>Max Wage: {maxWage}</p>
        <p>Total Reports: {wages.length}</p>
      </div>

      <button className="fetch-btn" onClick={fetchWages}>{t.fetch}</button>
      <button className="export-btn" onClick={exportCSV}>{t.export}</button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => {setSortField("role"); setSortDirection(sortDirection==="asc"?"desc":"asc")}}>Role</th>
              <th>Region</th>
              <th>Industry</th>
              <th>Experience</th>
              <th>Company</th>
              <th>Wage</th>
              <th>Bonuses</th>
              <th>Benefits</th>
              <th>Hours</th>
              <th>Effective Hourly</th>
              <th>Image</th>
              <th>Submitted At</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {sortedWages.map((w, idx) => (
              <tr key={idx}>
                <td>{w.role}</td>
                <td>{w.region}</td>
                <td>{w.industry}</td>
                <td>{w.experience}</td>
                <td>{wages.length >= MIN_REPORTS ? w.companyName : "Hidden Company"}</td>
                <td>{w.wage}</td>
                <td>{w.bonuses}</td>
                <td>{w.benefits}</td>
                <td>{w.hours}</td>
                <td>{w.effectiveHourly || ""}</td>
                <td>
                  {w.image ? <a href={w.image} target="_blank" rel="noopener noreferrer"><img src={w.image} alt="attachment" style={{width:"50px",height:"50px"}}/></a> : "No Image"}
                </td>
                <td>{new Date(w.createdAt).toLocaleString()}</td>
                <td>
  <button 
    className="delete-btn" 
    onClick={() => handleDelete(w.userId)}
  >
    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="db-link">
        <a href="https://example.com/sql-database" target="_blank" rel="noopener noreferrer">{t.dbLink}</a>
      </div>
    </div>
  );
}

export default App;
