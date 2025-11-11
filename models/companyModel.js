


const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database (or create if it doesn't exist)
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create "companies" table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    industry TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Companies table ready.");
    }
  }
);

// Function to insert a new company
function addCompany(name, location, industry) {
  const query = `INSERT INTO companies (name, location, industry) VALUES (?, ?, ?)`;
  db.run(query, [name, location, industry], function (err) {
    if (err) {
      console.error("Error inserting company:", err.message);
    } else {
      console.log(`Company added with ID: ${this.lastID}`);
    }
  });
}

// Function to get all companies
function getAllCompanies(callback) {
  db.all(`SELECT * FROM companies`, [], (err, rows) => {
    if (err) {
      console.error("Error fetching companies:", err.message);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

// Example usage
addCompany("TechCorp", "New York", "Software");

getAllCompanies((err, companies) => {
  if (!err) console.log(companies);
});

module.exports = { db, addCompany, getAllCompanies };
