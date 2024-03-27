import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../components/Card";
// import CardGroup from "react-bootstrap/CardGroup";

function HomePage() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div>
      {books.map((book) => (
        <BookCard {...book.data()} />
      ))}
    </div>
  );
}

export default HomePage;
