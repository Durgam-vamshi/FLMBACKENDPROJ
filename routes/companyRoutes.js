const express = require("express");
const router = express.Router();
const { getCompanies, getCompanyById } = require("../controllers/companyController");

router.get("/", getCompanies);        // /api/companies?search=&location=&industry=
router.get("/:id", getCompanyById);   // /api/companies/:id

module.exports = router;
