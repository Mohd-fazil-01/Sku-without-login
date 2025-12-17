// import express from "express";
// import { 
//   getProducts, 
//   getProductBySKU, 
//   updateQtyBySKU, 
//   getProduct, 
//   createProduct, 
//   updateProduct, 
//   deleteProduct
//   // subtractQtyBySKU
// } from "../controllers/productController.js";

// const router = express.Router();

// // Get all
// router.get("/", getProducts);

// // ✅ SKU route FIRST (VERY IMPORTANT)
// router.get("/sku/:sku", getProductBySKU);

// // Get product by ID
// router.get("/:id", getProduct);

// // Update qty by SKU
// router.put("/update-qty-sku", updateQtyBySKU);

// // Create, update, delete
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);
// // router.put("/update-qty-sku-subtract", subtractQtyBySKU);


// export default router;




import express from "express";
import {
  getProducts,
  getProductBySKU,
  updateQtyBySKU,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import upload from "../middlewares/multer.js";   // <-- ADD THIS

const router = express.Router();

// ----------------------
// 🔥 IMAGE UPLOAD ROUTE
// ----------------------


router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    return res.json({ url: req.file.path }); // Cloudinary URL
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});
// router.post("/upload", upload.single("image"), (req, res) => {
//   try {
//     res.json({
//       success: true,
//       url: req.file.path,  // Cloudinary URL
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// ----------------------
// PRODUCT ROUTES BELOW
// ----------------------

// Get all products
router.get("/", getProducts);

// SKU route (IMPORTANT!)
router.get("/sku/:sku", getProductBySKU);

// Get by ID
router.get("/:id", getProduct);

// Update qty
router.put("/update-qty-sku", updateQtyBySKU);

// Create
router.post("/", createProduct);

// Update
router.put("/:id", updateProduct);

// Delete
router.delete("/:id", deleteProduct);

export default router;
