const Company = require("../models/companyModel");
const { buildFilterQuery } = require("../utils/filterUtils");

// GET all companies with filters
const getCompanies = async (req, res) => {
  try {
    const { search, location, industry } = req.query;
    const query = buildFilterQuery({ search, location, industry });

    const companies = await Company.find(query);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCompanies, getCompanyById };
