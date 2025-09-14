import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(bodyParser.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const wageSchema = new mongoose.Schema({
  role: String,
  region: String,
  encryptedCompanyName: String,
  encryptedUserName: String,
  wage: Number,
  createdAt: { type: Date, default: Date.now },
});

const Wage = mongoose.model("Wage", wageSchema);

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

app.post("/api/wages", async (req, res) => {
  const { userName, companyName, role, region, wage } = req.body;
  if (!companyName || !role || !region || !wage || wage <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const wageDoc = new Wage({
    role,
    region,
    encryptedCompanyName: encrypt(companyName),
    encryptedUserName: encrypt(userName || ""),
    wage,
  });
  await wageDoc.save();
  res.json({ success: true });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
