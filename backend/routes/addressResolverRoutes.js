const express = require("express");
const router = express.Router();
const {
  resolveAddress,
  generateDigiPIN,
  saveResolvedAddress,
} = require("../controllers/addressResolverController");

// @route POST /api/address/resolve
router.post("/resolve", resolveAddress);

// @route POST /api/address/digipin
router.post("/digipin", generateDigiPIN);

// @route POST /api/address/save
router.post("/save", saveResolvedAddress);

module.exports = router;
