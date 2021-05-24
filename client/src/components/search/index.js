import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

function Search(props) {
  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [redirect, setRedirect] = useState(null);

  function searchApi(event) {
    event.preventDefault();
    API.searchBooks(bookSearch)
      .then((apiData) => {
        setBooks(apiData.data.items);
      })
      .catch((err) => console.log(err));
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBookSearch(value);
  };

  const handleSaveBook = (id) => {
    const book = books.find((book) => book.id === id);
    API.saveBook({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.toString(),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.previewLink,
    }).then(() => setRedirect("/saved"));
  };

  return (
    <div className="d-flex flex-column align-items-start p-3">
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <div>
          <form>
            <input
              placeholder="Search Titles"
              value={bookSearch}
              onChange={handleInputChange}
            ></input>
            <button onClick={searchApi}>Submit</button>
          </form>
          {!books.length ? (
            <h4 className="pt-3">No Books Returned</h4>
          ) : (
            <div>
              {books.map((book) => {
                return (
                  <div
                    className="card p-2 m-3 w-50"
                    key={book.id}
                  >
                    <div className="card-body">
                    <h4 className="card-title">{book.volumeInfo.title}</h4>
                    <h5 className="card-subtitle">{book.volumeInfo.authors}</h5>
                    <p className="card-text">
                      {book.volumeInfo.description}
                    </p>
                    <div className="p-3">
                      <img
                        className="img-thumbnail"
                        src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/150"}
                        alt={book.volumeInfo.title}
                      />
                      <a
                        className="card-link p-2"
                        href={book.volumeInfo.previewLink}
                      >
                        Link
                      </a>
                      <button
                        className="btn-primary p-2"
                        onClick={() => handleSaveBook(book.id)}
                      >
                        Save
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
