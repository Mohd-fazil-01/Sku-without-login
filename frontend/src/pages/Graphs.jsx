import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChartFilter from "../components/charts/BarChartFilter";
import PieChartFilter from "../components/charts/PieChartFilter";
import LineChartFilter from "../components/charts/LineChartFilter";
import DoughnutChartFilter from "../components/charts/DoughnutChartFilter";
import { useNavigate } from "react-router-dom";

export default function Graphs() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:7000/api/products");
    setProducts(res.data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px 20px",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#1976D2",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          marginBottom: 25,
        }}
      >
        ⬅ Back to Home
      </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: 10,
          fontSize: "32px",
          color: "#222",
        }}
      >
        📊 Graphical Representation
      </h1>

      <p style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
        Complete visual insights of your inventory.
      </p>

      {/* CHARTS CENTERED & REDUCED WIDTH */}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div
          style={{
            background: "#fff",
            padding: 25,
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          <PieChartFilter data={products} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 25,
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          <BarChartFilter data={products} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 25,
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          <LineChartFilter data={products} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 25,
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          <DoughnutChartFilter data={products} />
        </div>

      </div>
    </div>
  );
}
