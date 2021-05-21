import axios from "axios";

export default {
  getBooks: function (query) {
    return axios.get("/api/book", { params: { q: query } });
  },
  searchBooks: function (searchTerm) {
    return axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm
    );
  },
};
