import { useEffect } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
//components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";
const Home = () => {
  const { notes, dispatch } = useNoteContext();
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:5000/api/notes");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="home">
      <NoteForm />

      <section className="list-side">
        <h2>Saved Notes</h2>
        {notes &&
          notes.map((note) => <NoteDetails key={note._id} note={note} />)}
      </section>
    </div>
  );
};
export default Home;
