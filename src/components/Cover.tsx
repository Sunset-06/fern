import { readFile } from "@tauri-apps/plugin-fs";
import { Book } from "epubjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


const Cover: React.FC<{ bookPath: string }> = ({ bookPath }) => {
    
    const [coverUrl, setCoverUrl] = useState<string>();
    const [title, setTitle] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);
    useEffect(() => {
        const loadBookMetadata = async () => {
          try {
            //fetch the book as a blob
            const fileData = await readFile(bookPath);
            const blob = new Blob([fileData], { type: "application/epub+zip" });
            //some sort of witchcraft (thank you @tuphan-dn, random github users are what make the world a better place)
            const buf = await blob.arrayBuffer()
            const book = new Book(buf as any, { openAs: 'binary' })
            const metadata = await book.loaded.metadata;
            const cover = await book.coverUrl(); 
            //set the fetched data
            setTitle(metadata.title || "Unknown Title");
            setAuthor(metadata.creator || "Unknown Author");
            setCoverUrl(cover || undefined);
            //free memory, the book will be loaded again when opened, I don't want
            //larger libraries to hog memory
            book.destroy(); 
          } catch (error) {
            console.error("Error loading book metadata:", error);
          }
        };
    
        loadBookMetadata();
      }, [bookPath]);

      const navigateTo=useNavigate();;

      const openReader = () => {
        navigateTo(`/reader?path=${encodeURIComponent(bookPath)}`);
      };

    return(
        <div className="main-book" onClick={openReader}>
            <img width="200" height="300" src={coverUrl} style={{borderRadius: "5px"}}/>
            <div className="cover-text-box">
                <p className="title-text">{title}</p>
                <p className="author-text">{author}</p>
            </div>
        </div>
    );
}
export default Cover;