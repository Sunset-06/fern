import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import Cover from "./Cover.tsx";
import { useState, useEffect } from "react";

export default function Library() {
  const [booksState, setBooksState] = useState<string[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const entries = await readDir("Books", { baseDir: BaseDirectory.Home });
        const epubFiles = entries
          //only want epub files
          .filter((entry) => entry.name?.endsWith(".epub"))
          //only want the path of the book
          .map((entry) => `${BaseDirectory.Home}/Books/${entry.name}`);

        setBooksState(epubFiles);
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