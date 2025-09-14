import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 chars

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error(`ENCRYPTION_KEY must be 32 characters long. Current length: ${ENCRYPTION_KEY.length}`);
}
const IV_LENGTH = 16;

// In-memory array to store wages
const wages = [];

// Encryption / Decryption
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// POST route: submit wage
app.post("/api/wages", (req, res) => {
  try {
    const { role, region, industry, experience, wage, userId, companyName } = req.body;

    const newWage = {
      role,
      region,
      industry,
      experience,
      wage,
      userIdEncrypted: encrypt(userId),
      companyNameEncrypted: encrypt(companyName),
      createdAt: new Date()
    };

    wages.push(newWage);
    res.json({ success: true });
  } catch (err) {
    console.error("Error submitting wage:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET route: fetch wages (anonymize names if <20 reports)
app.get("/api/wages", (req, res) => {
  try {
    const { role, region } = req.query;
    const MIN_REPORTS = 20;

    const filtered = wages.filter(w => w.role === role && w.region === region);
    const hideNames = filtered.length < MIN_REPORTS;

    const result = filtered.map(w => ({
      role: w.role,
      region: w.region,
      industry: w.industry,
      experience: w.experience,
      wage: w.wage,
      userId: hideNames ? null : decrypt(w.userIdEncrypted),
      companyName: hideNames ? "Anonymous" : decrypt(w.companyNameEncrypted),
      createdAt: w.createdAt
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching wages:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



