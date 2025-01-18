//import { useState, useEffect } from "react";
//import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs";
import fetchBooks from "./parser/fetchBooks";
import Cover from "./components/Cover";
import "./App.css";
import { useState, useEffect } from "react";
import { coverData } from "./types";

function App() {
  const [booksList, setBooksList] = useState<coverData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const books = await fetchBooks(); 
      setBooksList(books);
  };
  fetchData()
}, []);

  console.log(booksList);
  return (
    <div className="library">
      <h1 className="title">Your Books</h1>
      <div className="shelf">
      {booksList.map(book => {
        return(
          <Cover title={book.title} author={book.author} coverUrl={book.coverUrl} />
        );
      })}
      </div>
    </div>
  );
}

export default App;