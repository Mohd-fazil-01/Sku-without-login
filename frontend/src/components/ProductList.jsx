import React, { useState } from "react";

function ProductList({ products, onEdit, onDelete }) {
  const [view, setView] = useState("table"); // table OR box

  return (
    <div style={{ padding: "10px" }}>
      <h2>📦 Products</h2>

      <button
        style={styles.toggleBtn}
        onClick={() => setView(view === "table" ? "box" : "table")}
      >
        Switch to {view === "table" ? "Box View" : "Table View"}
      </button>

      {view === "table" ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S. No.</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>Size</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Costing Price</th>
                <th style={styles.th}>GST</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Supplier</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} style={styles.row}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>{product.color}</td>
                  <td style={styles.td}>{product.size}</td>
                  <td style={styles.td}>₹{product.price}</td>
                  <td style={styles.td}>₹{product.costing_price}</td>
                 <td style={styles.td}>{product.gst}%</td> 
                  <td style={styles.td}>{product.Qty}</td>
                  <td style={styles.td}>{product.Supplier_name}</td>
                  <td style={styles.td}>{product.sku}</td>

                  <td style={styles.td}>
                    {product.img && (
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </td>

                  <td style={styles.td}>
                    <button onClick={() => onEdit(product)} style={styles.editBtn}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(product._id)} style={styles.delBtn}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.grid}>
          {products.map((product, index) => (
            <div key={product._id} style={styles.card}>
              <h3>
                <b>#{index + 1} — {product.name}</b>
              </h3>

              <p><b>Category:</b> {product.category}</p>
              <p><b>Color:</b> {product.color}</p>
              <p><b>Size:</b> {product.size}</p>
              <p><b>Price:</b> ₹{product.price}</p>
              <p><b>Costing Price + GST:</b> ₹{product.costing_price}</p>
              
              <p><b>Qty:</b> {product.Qty}</p>
              <p><b>Supplier:</b> {product.Supplier_name}</p>
              <p><b>SKU:</b> {product.sku}</p>

              {product.img && (
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ maxWidth: "120px", borderRadius: "8px" }}
                />
              )}

              <button onClick={() => onEdit(product)} style={styles.editBtn}>Edit</button>
              <button onClick={() => onDelete(product._id)} style={styles.delBtn}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  toggleBtn: {
    padding: "10px 20px",
    background: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
  },

  // ⭐ Responsive + No Horizontal Scroll
  tableWrapper: {
    maxHeight: "480px",
    overflowY: "auto",
    overflowX: "auto",
    border: "1px solid #d0d0d0",
    borderRadius: "10px",
    padding: "10px",
    background: "#fff",
  },

  // ⭐ Compact Table
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },

  th: {
    padding: "10px",
    background: "#f7f7f7",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #ddd",
    fontSize: "13px",
    whiteSpace: "nowrap",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },

  td: {
    padding: "8px 10px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    fontSize: "13px",
    wordWrap: "break-word",
  },

  row: {
    background: "#fff",
  },

  // ⭐ Compact Buttons
  editBtn: {
    marginRight: "6px",
    padding: "5px 10px",
    fontSize: "12px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  delBtn: {
    padding: "5px 10px",
    fontSize: "12px",
    background: "#E53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  // ⭐ Responsive Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fafafa",
  },
};

export default ProductList;
