import ePub from "epubjs";
import { readFile } from "@tauri-apps/plugin-fs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "./Header.tsx";


export default function Reader() {
  const [searchParams] = useSearchParams();
  const bookPath = searchParams.get("path");
  const viewer = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<ePub.Rendition | null>(null);

  useEffect(() => {
    const loadReader = async() =>{
      if (!bookPath || !viewer.current) return;
      //open the book all over again
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
    };
    loadReader();

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
        renditionRef.current = null;
      }
    };
  }, [bookPath]);

  if (!bookPath) {
    return <p>Error: No book loaded.</p>;
  }

  return (
    <div>
      <Header renditionRef={renditionRef} />
      <div ref={viewer} />
    </div>
  );
}