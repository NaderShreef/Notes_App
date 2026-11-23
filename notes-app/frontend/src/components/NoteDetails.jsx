const NoteDetails = ({ note }) => {
  return (
    <div className="note-card" key={note._id}>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <div className="actions">
        <button className="secondary">Edit</button>
        <button className="danger">Delete</button>
      </div>
    </div>
  );
};
export default NoteDetails;
