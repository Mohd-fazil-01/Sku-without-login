import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartFilter({ data }) {
  const [filterBy, setFilterBy] = useState("category");

  // 🔹 Grouping function
  const groupData = (key) => {
    const result = {};
    data.forEach((item) => {
      if (!result[item[key]]) result[item[key]] = 0;
      result[item[key]] += item.Qty;
    });
    return result;
  };

  const finalData = groupData(filterBy);

  return (
    <div style={{ width: "400px" }}>
      <h3>Pie Chart — {filterBy.toUpperCase()}</h3>

      {/* 🔹 Dropdown */}
      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="category">Category</option>
        <option value="color">Color</option>
        <option value="size">Size</option>
        <option value="supplier">Supplier</option>
      </select>

      <Pie
        data={{
          labels: Object.keys(finalData),
          datasets: [
            {
              data: Object.values(finalData),
              backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350"],
            },
          ],
        }}
      />
    </div>
  );
}
