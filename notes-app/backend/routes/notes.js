const express = require("express");
const mongoose = require("mongoose");
const {
  createNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const router = express.Router();

// get all notes
router.get("/", getNotes);
//get one note
router.get("/:id", getNote);
// post notes
router.post("/", createNote);
// delete note
router.delete("/:id", deleteNote);
// update note
router.patch("/:id", updateNote);
module.exports = router;
