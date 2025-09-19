import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userhome from "./pages/Userhome";
import Usersinglebook from "./pages/Usersinglebook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Userhome />} />
        <Route path="/singlebook/:id" element={<Usersinglebook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
