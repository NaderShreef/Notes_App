const express = require("express");
const mongoose = require("mongoose");
const { createNote, getNote } = require("../controllers/noteController");
const router = express.Router();

// get all notes
router.get("/", getNote);
// post notes
router.post("/", createNote);
module.exports = router;
