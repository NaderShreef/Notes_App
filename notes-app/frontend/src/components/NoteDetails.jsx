import { useNoteContext } from "../hooks/useNoteContext";
const NoteDetails = ({ note }) => {
  const { dispatch } = useNoteContext();
  const handleClick = async () => {
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
  return (
    <div className="note-card" key={note._id}>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <div className="actions">
        <button className="secondary">Edit</button>
        <button className="danger" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default NoteDetails;
