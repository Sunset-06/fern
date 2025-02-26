import { homeDir, join } from "@tauri-apps/api/path";
import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import Cover from "./Cover.tsx";
import { useState, useEffect } from "react";
import "../App.css"; 

export default function Library() {
  const [booksState, setBooksState] = useState<string[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const homePath = await homeDir();
        const entries = await readDir("Books", { baseDir: BaseDirectory.Home });
        const epubFiles = await Promise.all(entries
          //only want epub files
          .filter((entry) => entry.name?.endsWith(".epub"))
          //only want the path of the book
          .map(async(entry) => await join(homePath, "Books", entry.name!)));

        setBooksState(epubFiles);
        console.log(epubFiles);
        
      } catch (error) {
        console.error("Error reading directory:", error);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="library">
      <h1 className="title">Your Books</h1>
      <div className="shelf">
      {booksState.map((entry) => {
        return(
          <Cover bookPath={entry} />
        );
      })}
      </div>
    </div>
  );
}