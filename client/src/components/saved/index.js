import React, { useEffect, useState } from "react";
import API from "../../utils/API";

function Saved(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getSavedBooks();
  });

  const getSavedBooks = () => {
    API.getSavedBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    API.deleteBook(id).then((res) => getSavedBooks());
  };

  return (
    <div>
      {!books.length ? (
        <h3>No Saved Books</h3>
      ) : (
        <div>
          <h3>Saved Books</h3>
          {books.map((book) => {
            return (
              <div key={book._id}>
                <h4>{book.title}</h4>
                <h5>{book.authors}</h5>
                <p>{book.description}</p>
                <img src={book.image} alt={book.title}/>
                <a href={book.link}>
                  Link
                </a>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Saved;
