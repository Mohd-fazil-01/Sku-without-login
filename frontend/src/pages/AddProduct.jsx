import React from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  // API Call: Add product to database
  const saveProduct = async (data) => {
    try {
      await axios.post("http://localhost:7000/api/products", data);
      alert("Product Added Successfully!");
      navigate("/");
    } catch (err) {
      console.error("Add Product Error:", err);
      alert("Failed to add product. Check console!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
        background: "#f8f9fa",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ width: "90%", maxWidth: "600px", textAlign: "center", marginBottom: 40 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "none",
            color: "#1a73e8",
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ fontWeight: 400, fontSize: 32, marginBottom: 8 }}>Add New Product</h1>
        <p style={{ color: "#5f6368", fontSize: 16 }}>
          Fill out the form below to add a product to your inventory.
        </p>
      </div>

      {/* Form Container */}
      <div
        style={{
          width: "90%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "30px 35px",
          borderRadius: 8,
          boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
        }}
      >
        <ProductForm
          onSubmit={saveProduct}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
}
