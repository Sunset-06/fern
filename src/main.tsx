import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //Enabling Strict mode will render the reader twice as the useEffect runs twice
  //<React.StrictMode> 
    <App />
  //</React.StrictMode>
);
