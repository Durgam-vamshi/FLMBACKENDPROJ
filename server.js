const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const companyRoutes = require("./routes/companyRoutes");
const { db } = require("./models/companyModel");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/companies", companyRoutes);

// Ensure table exists with UNIQUE constraint
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      industry TEXT NOT NULL,
      UNIQUE(name, location, industry)  -- Prevent duplicates
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Companies table ready.");
        app.listen(PORT, () =>
          console.log(`Server running on port ${PORT}`)
        );
      }
    }
  );
});
