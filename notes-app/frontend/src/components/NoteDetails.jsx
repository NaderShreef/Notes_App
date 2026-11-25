import { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
const NoteDetails = ({ note }) => {
  const { dispatch } = useNoteContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [error, setError] = useState(null);
  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:5000/api/notes/" + note._id,
      {
        method: "DELETE",
      },
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };
  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/" + note._id,
        {
          method: "PATCH",
          body: JSON.stringify({ title, body }),
          headers: { "Content-Type": "application/json" },
        },
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        return;
      }

      dispatch({ type: "UPDATE_NOTE", payload: json });
      setError(null);
      setIsEditing(false);
    } catch (err) {
      setError("Could not reach the server");
    }
  };
  const handleCancel = () => {
    setTitle(note.title);
    setBody(note.body);
    setError(null);
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <div className="note-card editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button className="secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="note-card">
        <h3>{note.title}</h3>
        <p>{note.body}</p>
        <div className="actions">
          <button className="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
};
export default NoteDetails;
