import { Book } from "epubjs";
import { useState, useEffect } from "react";


const Cover: React.FC<{ bookPath: string }> = ({ bookPath }) => {
    
    const [coverUrl, setCoverUrl] = useState<string>();
    const [title, setTitle] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);
    useEffect(() => {
        const loadBookMetadata = async () => {
          try {
            //fetch the data (thank you epubjs)
            const book = new Book(bookPath);
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

    return(
        <div style={{margin: "30px"}}>
            <img width="200" height="300" src={coverUrl} style={{borderRadius: "5px"}}/>
            <div style={{width: "200px", display: "flex", flexDirection: "column", textAlign: "left"}}>
                <p style={{fontWeight: "bold", fontSize: "1.1em", marginTop: "10px", marginBottom: "2px"}}>{title}</p>
                <p style={{alignSelf: "flex-start", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{author}</p>
            </div>
        </div>
    );
}
export default Cover;