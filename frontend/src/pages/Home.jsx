import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import SkuUpdate from "../components/SkuUpdate";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showData, setShowData] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSearch = async () => {
    if (!search.trim() && !categoryFilter) {
      return alert("Enter something or select a category to search.");
    }

    await fetchProducts();
    setShowData(true);
  };

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();

    const matchSearch =
      p.name.toLowerCase().includes(s) ||
      p.color.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s);

    const matchCategory =
      categoryFilter === "" || categoryFilter === "All"
        ? true
        : p.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  useEffect(() => {
    if (!search.trim() && !categoryFilter) {
      setShowData(false);
    }
  }, [search, categoryFilter]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "36px", marginBottom: 30, color: "#202124" }}>
        Inventory Search
      </h1>

      {/* Search Box Area – Styled like Google */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 30,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "90%",
          maxWidth: "650px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, color, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 18px",
            borderRadius: 25,
            border: "1px solid #ddd",
            fontSize: "15px",
          }}
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: 25,
            border: "1px solid #ddd",
            fontSize: "15px",
            background: "white",
          }}
        >
          <option value="">Choose Category</option>
          <option value="All">All Categories</option>
          <option value="Die-cast">Die-cast</option>
          <option value="Remote Control">Remote Control</option>
          <option value="Soft Toy">Soft Toy</option>
          <option value="Board Game">Board Game</option>
          <option value="Scooter">Scooter</option>
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: 25,
            border: "none",
            background: "#1a73e8",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Page Buttons */}
      <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
        <button
          onClick={() => navigate("/add-product")}
          style={{
            padding: "10px 20px",
            borderRadius: 25,
            background: "#34a853",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Add Product
        </button>

        <button
          onClick={() => navigate("/graphs")}
          style={{
            padding: "10px 20px",
            borderRadius: 25,
            background: "#673ab7",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          📊 Graphs
        </button>
      </div>
      <button
        onClick={() => navigate("/create-user")}
        style={{
          padding: "10px 20px",
          borderRadius: 25,
          background: "#ff9800",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        👤 Create User
      </button>


      {/* SKU Update Form */}
      <div style={{ marginTop: 30 }}>
        <SkuUpdate onUpdated={fetchProducts} />
      </div>

      {/* Results Section */}
      {showData && (
        <div style={{ width: "95%", maxWidth: 1100, marginTop: 30 }}>
          <button
            onClick={() => setShowData(false)}
            style={{
              padding: "8px 15px",
              background: "#d93025",
              color: "white",
              border: "none",
              borderRadius: 25,
              marginBottom: 15,
            }}
          >
            Close Results
          </button>

          {/* ⭐ ProductList Wahi Andar Rahega ⭐ */}
          <ProductList
            products={filteredProducts}
            onEdit={() => alert("Edit only from Add Product Page.")}
            onDelete={async (id) => {
              await axios.delete(`http://localhost:7000/api/products/${id}`);
              fetchProducts();
            }}
          />
        </div>
      )}

    </div>
  );
}
