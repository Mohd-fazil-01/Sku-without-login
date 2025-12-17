import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChartFilter({ data }) {
  const [filterBy, setFilterBy] = useState("price");

  const getChartData = () => {
    if (filterBy === "price") {
      return {
        labels: data.map((p) => p.name),
        values: data.map((p) => p.price),
      };
    } else {
      return {
        labels: data.map((p) => p.name),
        values: data.map((p) => p.Qty),
      };
    }
  };

  const chart = getChartData();

  return (
    <div style={{ width: "400px" }}>
      <h3>Line Chart — {filterBy.toUpperCase()}</h3>

      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="price">Price Trend</option>
        <option value="qty">Quantity Trend</option>
      </select>

      <Line
        data={{
          labels: chart.labels,
          datasets: [
            {
              label: filterBy === "price" ? "Price" : "Quantity",
              data: chart.values,
              borderColor: "#66bb6a",
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
}
