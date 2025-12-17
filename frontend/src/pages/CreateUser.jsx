import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    number: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:7000/api/users", form);
      alert("User Created Successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error creating user");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: 30,
          borderRadius: 20,
          width: "90%",
          maxWidth: 500,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Create New User</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* USER TYPE SELECT */}
        <select
          name="userType"
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            padding: "12px",
            background: "white",
          }}
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="superuser">Superuser</option>
          <option value="user">User</option>
        </select>

        <button
          type="submit"
          style={{
            marginTop: 15,
            padding: "12px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 10,
            width: "100%",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create User
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  fontSize: "15px",
};
