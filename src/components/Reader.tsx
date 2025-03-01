import ePub from "epubjs";
import { readFile } from "@tauri-apps/plugin-fs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";


export default function Reader() {
  const [searchParams] = useSearchParams();
  const bookPath = searchParams.get("path");
  const viewer = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<ePub.Rendition | null>(null);

  useEffect(() => {
    const loadReader = async() =>{
      if (!bookPath || !viewer.current) return;
      //all over again
      const fileData = await readFile(bookPath);
      const blob = new Blob([fileData], { type: "application/epub+zip" });
      const buf = await blob.arrayBuffer()
      const book = ePub(buf as any, { openAs: 'binary' })
      const rendition = book.renderTo(viewer.current, {
        width: "100%",
        height: "100vh",
      });
      renditionRef.current = rendition;

      rendition.display();
      return () => {
        if(renditionRef.current !=null)
          renditionRef.current.destroy(); 
      }
    };
    loadReader();
  }, [bookPath]);

  if (!bookPath) {
    return <p>Error: No book loaded.</p>;
  }

  return (
    <div>
      <div ref={viewer} />
      <button onClick={() => renditionRef.current?.prev()}>Prev</button>
      <button onClick={() => renditionRef.current?.next()}>Next</button>
    </div>
  );
}