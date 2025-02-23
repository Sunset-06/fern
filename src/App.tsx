import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./components/Library.tsx";
import Reader from "./components/Reader.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} /> 
        <Route path="/reader/:bookPath" element={<Reader />} /> 
      </Routes>
    </Router>
  );
}

export default App;