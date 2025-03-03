import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconCaretRightFilled, IconCaretLeftFilled, IconArrowLeft } from "@tabler/icons-react";
import "./Header.css"

interface Props{
  renditionRef:React.MutableRefObject<ePub.Rendition | null>,
  title: string
}

export default function Header(props: Props) {
  const [fontSize, setFontSize] = useState(16);
  const navigateTo=useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!props.renditionRef.current) return; 
      if ((event.altKey && event.key === "ArrowLeft") || event.key ==="KeyL") {
        handleCloseBook();
      }
      else if (event.key === "ArrowLeft") {
        props.renditionRef.current.prev();
      }
      else if (event.key === "ArrowRight") {
        props.renditionRef.current.next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  //function to go back and cleanup
  const handleCloseBook = () =>{
    props.renditionRef.current?.destroy();
    props.renditionRef.current = null;
    navigateTo("/");
  }

  //switch themes
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.renditionRef.current) return;
    
    switch (event.target.value) {
        case "white":
          props.renditionRef.current.themes.override("color", "#000");
          props.renditionRef.current.themes.override("background", "#fff");
          break;
        case "black":
          props.renditionRef.current.themes.override("color", "#fff");
          props.renditionRef.current.themes.override("background", "#000");
          break;
        case "sepia":
          props.renditionRef.current.themes.override("color", "#000");
          props.renditionRef.current.themes.override("background", "#FAEBC8");
          break;
        default:
          break;
      }
  };
  
  //Change font size of the rendition
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setFontSize(newSize);
    props.renditionRef.current?.themes.fontSize(`${newSize}px`);
  };

  return (
    <>
    <div className="outer">
      <div className="left-controls">
        <button onClick={handleCloseBook}><IconArrowLeft /></button> 
        <h3>{props.title}</h3>
      </div>

      <div className="right-controls">
        <select value={fontSize} onChange={handleFontSizeChange}>
          {[10, 12, 14, 16, 18, 20, 24, 28, 30, 32].map((size) => (
              <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        <select onChange={handleThemeChange}>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="sepia">Sepia</option>
        </select>

        <button onClick={() => props.renditionRef.current?.prev()}><IconCaretLeftFilled /></button>
        <button onClick={() => props.renditionRef.current?.next()}><IconCaretRightFilled /></button>
      </div>
    </div>
    </>
  );
}