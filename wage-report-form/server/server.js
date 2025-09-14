import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const dbPath = path.join(process.cwd(), "db");
const __dirname = path.dirname(__filename);

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/pages", express.static(path.join(__dirname, "..pages")));

// Simple in-memory storage for demo
let wages = [];

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Make uploads folder publicly accessible
app.use("/uploads", express.static("uploads"));

// POST wage submission with optional image
app.post("/api/wages", upload.single("image"), (req, res) => {
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

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const effectiveHourly = hours ? (Number(wage) + Number(bonuses || 0)) / Number(hours) : null;

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
      image: imagePath,
      createdAt: new Date(),
    };
    wages.push(newWage);
    res.status(200).json(newWage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error submitting wage" });
  }
});

// GET wages with optional filters
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
// Delete a wage by userId
app.delete("/api/wages/:userId", (req, res) => {
  const { userId } = req.params;
  const index = wages.findIndex((w) => w.userId === userId);

  if (index === -1) {
    return res.status(404).json({ error: "Submission not found" });
  }

  const deleted = wages.splice(index, 1);
  res.status(200).json({ message: "Submission deleted", deleted });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
