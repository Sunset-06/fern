import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCaretRightFilled, IconCaretLeftFilled, IconArrowLeft } from "@tabler/icons-react";
import "./Header.css";

export default function Header({renditionRef}: {renditionRef: React.MutableRefObject<ePub.Rendition | null>}) {
  const [fontSize, setFontSize] = useState(16);
  const navigateTo=useNavigate();

  //function to go back and cleanup
  const handleCloseBook = () =>{
    renditionRef.current?.destroy();
    renditionRef.current = null;
    navigateTo("/");
  }

  //switch themes
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!renditionRef.current) return;
    
    switch (event.target.value) {
        case "white":
          renditionRef.current.themes.override("color", "#000");
          renditionRef.current.themes.override("background", "#fff");
          break;
        case "black":
          renditionRef.current.themes.override("color", "#fff");
          renditionRef.current.themes.override("background", "#000");
          break;
        case "sepia":
          renditionRef.current.themes.override("color", "#000");
          renditionRef.current.themes.override("background", "#FAEBC8");
          break;
        default:
          break;
      }
  };
  
  //Change font size of the rendition
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setFontSize(newSize);
    renditionRef.current?.themes.fontSize(`${newSize}px`);
  };

  return (
    <>
    <div style={{ display:"flex",justifyContent:"space-between", background: "#333", color: "white", padding: "10px"}}>
      <div style={{}}>
        <button onClick={handleCloseBook} style={{background: "#333", color: "white"}}><IconArrowLeft /></button> 
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
      </div>
      <div className="right-controls">
        <button onClick={() => renditionRef.current?.prev()} style={{background: "#333", color: "white"}}><IconCaretLeftFilled /></button>
        <button onClick={() => renditionRef.current?.next()} style={{background: "#333", color: "white"}}><IconCaretRightFilled /></button>
      </div>
    </div>
    </>
  );
}