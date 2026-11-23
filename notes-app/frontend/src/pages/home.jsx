import { useState, useEffect } from "react";
//components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const handleCreate = (note) => {
    setNotes((prev) => [note, ...prev]);
  };
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:5000/api/notes");
      const json = await response.json();
      if (response.ok) {
        setNotes(json);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="home">
      <NoteForm onCreate={handleCreate} />

      <section className="list-side">
        <h2>Saved Notes</h2>
        {notes &&
          notes.map((note) => <NoteDetails key={note._id} note={note} />)}
      </section>
    </div>
  );
};
export default Home;
