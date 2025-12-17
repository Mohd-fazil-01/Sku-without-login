import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Graphs from "./pages/Graphs";
import AddProduct from "./pages/AddProduct";
import CreateUser from "./pages/CreateUser";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="/create-user" element={<CreateUser />} />

      </Routes>
    </BrowserRouter>
  );
}
