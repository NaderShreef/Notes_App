const Note = require("../models/note.js");

//Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//Get a note

//Create a note
const createNote = async (req, res) => {
  const { title, body } = req.body;
  try {
    const note = await Note.create({ title, body });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a note

//Update a note
mode.exports = {
  createWorkout,
  getNotes,
};
