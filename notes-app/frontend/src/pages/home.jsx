const Home = () => {
  return (
    <div className="home">
      <section className="form-side">
        <h2>What's on your mind?</h2>
        <form className="note-form">
          <input type="text" placeholder="Title" />
          <textarea placeholder="Body" />
          <button type="submit">Save Note</button>
        </form>
      </section>

      <section className="list-side">
        <h2>Saved Notes</h2>
        <div className="note-card">
          <h3>Groceries</h3>
          <p>Bread, Milk and Eggs</p>
          <div className="actions">
            <button className="secondary">Edit</button>
            <button className="danger">Delete</button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
