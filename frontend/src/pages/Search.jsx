import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import axios from "axios";

export default function Search() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showData, setShowData] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, []);

  const handleSearch = () => {
    if (!search.trim() && !categoryFilter) return alert("Enter something or select category");
    setShowData(true);
  };

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(s) || p.color.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
    const matchCategory = !categoryFilter || categoryFilter === "All" ? true : p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: 20 }}>⬅ Back to Home</button>
      <h2>Inventory Search</h2>

      <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">Choose Category</option>
        <option value="All">All</option>
        <option value="Die-cast">Die-cast</option>
        <option value="Remote Control">Remote Control</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      {showData && (
        <ProductList
          products={filteredProducts}
          onEdit={() => alert("Edit from Add Product page")}
          onDelete={async (id) => {
            await axios.delete(`http://localhost:7000/api/products/${id}`);
            dispatch(fetchProducts());
          }}
        />
      )}
    </div>
  );
}
