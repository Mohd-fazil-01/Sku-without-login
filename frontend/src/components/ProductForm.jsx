import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Die-cast",
    color: "Black",
    size: "",
    img: "",
    price: "",
    costing_price: "",
    Supplier_name: "",
    Qty: 0,
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Prefill when editing product
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });

      // Split size like "30 cm"
      const parts = (initialData.size || "").split(" ");
      if (parts.length === 2) {
        setSizeValue(parts[0]);
        setSizeUnit(parts[1]);
      }
      setPreview(initialData.img || "");
    }
  }, [initialData]);

  // Reset size when category changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, size: "" }));
    setSizeValue("");
    setSizeUnit("");
  }, [formData.category]);

  // Normal fields update
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image select + instant upload to Cloudinary
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    // Show instant preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const imgData = new FormData();
      imgData.append("image", file);

      const res = await axios.post(
        "http://localhost:7000/api/products/upload",
        imgData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!res.data.url) throw new Error("Upload failed");

      setFormData((p) => ({ ...p, img: res.data.url }));
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload failed");
    }

    setUploading(false);
  };

  // Submit data
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.img) {
  //     return alert("Please upload an image before submitting.");
  //   }

  //   setSubmitting(true);

  //   // Handle final size
  //   let finalSize = formData.size; // Default for other categories

  //   if (formData.category === "Soft Toy" || formData.category === "Board Game") {
  //     if (!sizeValue || !sizeUnit) {
  //       alert("Please enter size value and unit.");
  //       setSubmitting(false);
  //       return;
  //     }
  //     finalSize = `${sizeValue} ${sizeUnit}`;
  //   }

  //   const finalData = {
  //     ...formData,
  //     size: finalSize,
  //     price: Number(formData.price),
  //     Qty: Number(formData.Qty),
  //   };

  //   onSubmit(finalData);
  //   setSubmitting(false);
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.img) {
      return alert("Please upload an image before submitting.");
    }

    let finalSize = "";

    // DIE-CAST / REMOTE CONTROL / SCOOTER
    if (
      formData.category === "Die-cast" ||
      formData.category === "Remote Control" ||
      formData.category === "Scooter"
    ) {
      if (!formData.size) {
        return alert("Please select a size.");
      }
      finalSize = formData.size;
    }

    // SOFT TOY / BOARD GAME
    if (formData.category === "Soft Toy" || formData.category === "Board Game") {
      if (!sizeValue || !sizeUnit) {
        return alert("Please enter size value AND select a unit.");
      }
      finalSize = `${sizeValue} ${sizeUnit}`;
    }

    const finalData = {
      ...formData,
      size: finalSize,
      price: Number(formData.price),
      costing_price: Number(formData.costing_price),
      gst: Number(formData.gst),
      Qty: Number(formData.Qty),
    };

    onSubmit(finalData);
  };




  useEffect(() => {
    if (formData.category === "Soft Toy" || formData.category === "Board Game") {
      if (sizeValue && sizeUnit) {
        setFormData((prev) => ({
          ...prev,
          size: `${sizeValue} ${sizeUnit}`,
        }));
      } else {
        setFormData((prev) => ({ ...prev, size: "" }));
      }
    }
  }, [sizeValue, sizeUnit, formData.category]);

  const inputStyle = {
    height: "35px",
    padding: "8px 10px",
    marginBottom: "15px",
    width: "100%",
    maxWidth: "400px",
    border: "1.5px solid #ccc",
    borderRadius: "8px",
  };

  const labelStyle = { fontWeight: "600", marginBottom: "5px", display: "block" };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>

      <label style={labelStyle}>Product Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />

      <label style={labelStyle}>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        style={{ ...inputStyle, height: "80px" }}
      />

      <label style={labelStyle}>Category:</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Die-cast">Die-cast</option>
        <option value="Remote Control">Remote Control</option>
        <option value="Soft Toy">Soft Toy</option>
        <option value="Board Game">Board Game</option>
        <option value="Scooter">Scooter</option>
      </select>

      {/* Size Logic */}
      <label style={labelStyle}>Size:</label>

      {(formData.category === "Die-cast" || formData.category === "Remote Control") && (
        <select name="size" value={formData.size} onChange={handleChange} style={inputStyle}>
          <option value="1:12">1:12</option>
          <option value="1:19">1:19</option>
          <option value="1:20">1:20</option>
          <option value="1:24">1:24</option>
          <option value="1:32">1:32</option>
        </select>
      )}

      {formData.category === "Scooter" && (
        <select name="size" value={formData.size} onChange={handleChange} style={inputStyle}>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      )}

      {(formData.category === "Soft Toy" || formData.category === "Board Game") && (
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Enter size"
            value={sizeValue}
            onChange={(e) => setSizeValue(e.target.value)}
            style={{ ...inputStyle, width: "60%" }}
          />
          <select
            value={sizeUnit}
            onChange={(e) => setSizeUnit(e.target.value)}
            style={{ ...inputStyle, width: "40%" }}
          >
            <option value="">Unit</option>
            <option value="cm">cm</option>
            <option value="inch">inch</option>
          </select>
        </div>
      )}

      <label style={labelStyle}>Product Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={inputStyle}
        disabled={uploading}
      />
      {preview && (
        <img
          src={preview}
          width="140"
          style={{ borderRadius: "6px", marginTop: "10px" }}
        />
      )}
      {uploading && <p style={{ color: "orange" }}>Uploading...</p>}

      <label style={labelStyle}>Price:</label>
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label style={labelStyle}>Cost Price (CP):</label>
      <input
        name="costing_price"
        type="number"
        value={formData.costing_price}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <label style={labelStyle}>GST:</label>
      <select
        name="gst"
        value={formData.gst || ""}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        required
      >
        <option value="">GST %</option>
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="12">12%</option>
        <option value="18">18%</option>
        <option value="28">28%</option>
      </select>


      <label style={labelStyle}>Supplier Name:</label>
      <input
        name="Supplier_name"
        value={formData.Supplier_name}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Quantity (Qty):</label>
      <input
        name="Qty"
        type="number"
        min="0"
        value={formData.Qty}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <div style={{ marginTop: "20px" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 20px",
            background: submitting ? "gray" : "#1976D2",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          {submitting
            ? "Submitting..."
            : initialData
              ? "Update Product"
              : "Add Product & Generate SKU"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              background: "#E53935",
              color: "#fff",
              borderRadius: "8px",
              marginLeft: 10,
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
