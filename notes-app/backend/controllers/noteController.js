const Note = require("../models/note.js");
const mongoose = require("mongoose");
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
const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "That note does not exist" });
  }
  try {
    const notes = await Note.findById(id);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
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
const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "That note does not exist" });
  }
  try {
    const notes = await Note.findOneAndDelete({ _id: id });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "That note does not exist" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "That note does not exist" });
  }
  try {
    const notes = await Note.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { returnDocument: "after" },
    );

    if (!notes) {
      return res.status(404).json({ error: "No such note" });
    }

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
};
