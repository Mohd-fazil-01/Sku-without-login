import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChartFilter({ data }) {
  const [filterBy, setFilterBy] = useState("category");

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
      <h3>Bar Chart — {filterBy.toUpperCase()}</h3>

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

      <Bar
        data={{
          labels: Object.keys(finalData),
          datasets: [
            {
              label: "Quantity",
              data: Object.values(finalData),
              backgroundColor: "#42a5f5",
            },
          ],
        }}
      />
    </div>
  );
}
