import React, { useState, useEffect } from "react";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useFirebase } from "../context/Firebase";

const HomePage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
};
export default HomePage;
