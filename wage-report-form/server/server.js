import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// app.use(cors({
//   origin: "https://redesigned-space-adventure-q7qrrxw9rw6gfxxx7-3000.app.github.dev",
//   methods: ["GET", "POST", "DELETE"],
//   credentials: true,
// }));

app.use(cors());

app.use(express.json());

app.use("/pages", express.static(path.join(__dirname, "..", "pages")));

let wages = [];

app.post("/api/wages", (req, res) => {
  try {
    const {
      role,
      region,
      industry,
      experience,
      companyName,
      wage,
      currency,
      userId,
      benefits,
      bonuses,
      hours,
    } = req.body;

    const effectiveHourly = hours
      ? (Number(wage) + Number(bonuses || 0)) / Number(hours)
      : null;

    const newWage = {
      role,
      region,
      industry,
      experience: Number(experience),
      companyName,
      wage: Number(wage),
      currency,
      userId,
      benefits: benefits || "",
      bonuses: bonuses ? Number(bonuses) : 0,
      hours: hours ? Number(hours) : null,
      effectiveHourly,
      createdAt: new Date(),
    };

    wages.push(newWage);
    res.status(200).json({ wage: newWage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error submitting wage" });
  }
});

app.get("/api/wages", (req, res) => {
  const { role, region, industry, minExperience, maxExperience } = req.query;
  let result = [...wages];

  if (role) result = result.filter((w) => w.role === role);
  if (region) result = result.filter((w) => w.region === region);
  if (industry) result = result.filter((w) => w.industry === industry);
  if (minExperience) result = result.filter((w) => w.experience >= Number(minExperience));
  if (maxExperience) result = result.filter((w) => w.experience <= Number(maxExperience));

  res.json(result);
});

app.delete("/api/wages/:userId", (req, res) => {
  const { userId } = req.params;
  const index = wages.findIndex((w) => w.userId === userId);

  if (index === -1) {
    return res.status(404).json({ error: "Submission not found" });
  }

  const deleted = wages.splice(index, 1);
  res.status(200).json({ message: "Submission deleted", deleted });
});


app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
