import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
const NoteForm = () => {
  const { dispatch } = useNoteContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, body };
    const response = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setBody("");
      setError(null);
      console.log("New note added", json);
      dispatch({ type: "CREATE_NOTE", payload: json });
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
