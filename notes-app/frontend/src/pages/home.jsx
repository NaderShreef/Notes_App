import { useEffect } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
//components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";
//variable
const API_URL = `${import.meta.env.VITE_API_URL}/notes`;
const Home = () => {
  const { notes, dispatch } = useNoteContext();
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(API_URL);
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
