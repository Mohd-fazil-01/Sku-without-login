import React, { useEffect, useState } from "react";
import axios from "axios";
// import PieChartByCategory from "./charts/PieChartFilter";
// import BarChartTopProducts from "./charts/BarChartFilter";
import PieChartFilter from "./charts/PieChartFilter";
import BarChartFilter from "./charts/BarChartFilter";
import LineChartFilter from "./charts/LineChartFilter";
import DoughnutChartFilter from "./charts/DoughnutChartFilter";

// import PieChartByCategory from "./charts/BarChartTopProducts";

export default function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:7000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    // 🔹 Total Products
    const totalProducts = products.length;

    // 🔹 Total Qty
    const totalQty = products.reduce((sum, p) => sum + p.Qty, 0);

    // 🔹 Category wise qty
    const categoryWise = {};
    products.forEach((p) => {
        if (!categoryWise[p.category]) categoryWise[p.category] = 0;
        categoryWise[p.category] += p.Qty;
    });

    // 🔹 Top 5 products by qty
    const topProducts = [...products]
        .sort((a, b) => b.Qty - a.Qty)
        .slice(0, 5);

    // 🔹 Low stock
    const lowStock = products.filter(p => p.Qty <= 5);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard Overview</h1>

            {/* Summary Cards */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div style={{ padding: "20px", background: "#e3f2fd", borderRadius: "8px" }}>
                    <h3>Total Products</h3>
                    <h2>{totalProducts}</h2>
                </div>

                <div style={{ padding: "20px", background: "#e8f5e9", borderRadius: "8px" }}>
                    <h3>Total Quantity</h3>
                    <h2>{totalQty}</h2>
                </div>

                <div style={{ padding: "20px", background: "#fff3e0", borderRadius: "8px" }}>
                    <h3>Categories</h3>
                    <h2>{Object.keys(categoryWise).length}</h2>
                </div>
            </div>

            {/* Charts */}
            {/* <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <PieChartByCategory data={categoryWise} />
        <BarChartTopProducts data={topProducts} />
      </div> */}
            <div style={{ display: "flex", gap: "20px" }}>
                <PieChartFilter data={products} />
                <BarChartFilter data={products} />
                <LineChartFilter data={products} />
                
            </div>
            <div>
                <DoughnutChartFilter data={products} />
            </div>


            {/* Low Stock List */}
            <div style={{ marginTop: "30px" }}>
                <h2>Low Stock Items (Qty ≤ 5)</h2>
                <ul>
                    {lowStock.map((p) => (
                        <li key={p._id}>{p.name} — Qty: {p.Qty}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
