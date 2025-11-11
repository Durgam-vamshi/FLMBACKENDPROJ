





const { db } = require("../models/companyModel"); // SQLite connection
const { buildFilterQuery } = require("../utils/filterUtils");

// Helper to convert filter object into SQL WHERE clause
function buildWhereClause(filters) {
  const conditions = [];
  const values = [];

  if (filters.search) {
    conditions.push("name LIKE ?");
    values.push(`%${filters.search}%`);
  }
  if (filters.location) {
    conditions.push("location = ?");
    values.push(filters.location);
  }
  if (filters.industry) {
    conditions.push("industry = ?");
    values.push(filters.industry);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return { whereClause, values };
}

// GET all companies with filters
const getCompanies = (req, res) => {
  try {
    const { search, location, industry } = req.query;
    const { whereClause, values } = buildWhereClause({ search, location, industry });

    const query = `SELECT * FROM companies ${whereClause}`;
    db.all(query, values, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET company by ID
const getCompanyById = (req, res) => {
  try {
    const query = `SELECT * FROM companies WHERE id = ?`;
    db.get(query, [req.params.id], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      if (!row) return res.status(404).json({ error: "Company not found" });
      res.json(row);
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCompanies, getCompanyById };
