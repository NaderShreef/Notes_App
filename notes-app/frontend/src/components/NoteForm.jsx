import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
//variable
const API_URL = `${import.meta.env.VITE_API_URL}/notes`;
const NoteForm = () => {
  const { dispatch } = useNoteContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        return;
      }

      setTitle("");
      setBody("");
      setError(null);
      dispatch({ type: "CREATE_NOTE", payload: json });
    } catch (err) {
      setError("Could not reach the server");
    }
  };
  return (
    <section className="form-side">
      <h2>What's on your mind?</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder="Body"
        />
        <button type="submit">Save Note</button>
      </form>
    </section>
  );
};
export default NoteForm;
