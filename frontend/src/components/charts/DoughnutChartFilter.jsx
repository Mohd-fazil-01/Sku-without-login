import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartFilter({ data }) {

  const inStockItems = data.filter((p) => p.Qty > 0);
  const outStockItems = data.filter((p) => p.Qty === 0);

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      
      {/* LEFT SIDE: Doughnut Chart */}
      <div style={{ width: "300px" }}>
        <h3>Stock Status</h3>
        <Doughnut
          data={{
            labels: ["In Stock", "Out of Stock"],
            datasets: [
              {
                data: [inStockItems.length, outStockItems.length],
                backgroundColor: ["#42a5f5", "#ef5350"],
              },
            ],
          }}
        />
      </div>

      {/* RIGHT SIDE: ITEM LIST */}
      <div style={{ width: "250px" }}>
        <h4>Out of Stock Items:</h4>
        {outStockItems.length === 0 ? (
          <p style={{ color: "green" }}>No Out of Stock Items</p>
        ) : (
          <ul>
            {outStockItems.map((item) => (
              <li key={item._id} style={{ color: "red" }}>
                {item.name} — Qty: {item.Qty}
              </li>
            ))}
          </ul>
        )}
        </div>
<div>
        <h4 style={{ marginTop: "20px" }}>In Stock Items:</h4>
        <ul>
          {inStockItems.map((item) => (
            <li key={item._id} style={{ color: "green" }}>
              {item.name} — Qty: {item.Qty}
            </li>
          ))}
        </ul>
        </div>
      

    </div>
  );
}
