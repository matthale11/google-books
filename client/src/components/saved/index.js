import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "bootstrap/dist/css/bootstrap.css";

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
    <div className="d-flex flex-column align-items-start p-3">
      {!books.length ? (
        <h4 className="pt-3">No Saved Books</h4>
      ) : (
        <div>
          <h3>Saved Books</h3>
          {books.map((book) => {
            return (
              <div className="card p-2 m-3 w-50" key={book._id}>
                <div className="card-body">
                  <h4 className="card-title">{book.title}</h4>
                  <h5 className="card-subtitle">{book.authors}</h5>
                  <p className="card-text">{book.description}</p>
                  <img
                    className="img-thumbnail"
                    src={book.image}
                    alt={book.title}
                  />
                  <a className="card-link p-2" href={book.link}>
                    Link
                  </a>
                  <button
                    className="btn-danger p-2"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Saved;
