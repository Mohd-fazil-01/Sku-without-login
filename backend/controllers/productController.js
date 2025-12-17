// // controllers/productController.js
// import Product from "../models/Product.js";
// import { generateSKU } from "../utils/skuGenerator.js";

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getProductBySKU = async (req, res) => {
//   try {
//     const { sku } = req.params;
//     if (!sku) return res.status(400).json({ message: "SKU is required" });

//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // Update product quantity by SKU
// export const updateQtyBySKU = async (req, res) => {
//   try {
//     const { sku, addedQty } = req.body;

//     if (!sku) return res.status(400).json({ message: "SKU is required" });
//     if (addedQty == null) return res.status(400).json({ message: "Quantity to add is required" });

//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ message: "Product not found with this SKU" });

//     product.Qty += Number(addedQty);
//     await product.save();

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// export const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// };

// // export const createProduct = async (req, res) => {
// //   try {
// //     // expected fields in req.body: name, description, category, color, size, img, price, contact (optional)
// //     const { category, color, size } = req.body;

// //     const sku = await generateSKU({ category, color, size });

// //     const newProduct = new Product({
// //       ...req.body,
// //       sku
// //     });

// //     const saved = await newProduct.save();
// //     res.status(201).json(saved);
// //   } catch (error) {
// //     console.error("Create product error:", error);
// //     res.status(400).json({ message: "Invalid data or SKU generation failed" });
// //   }
// // };


// export const createProduct = async (req, res) => {
//   try {
//     const { name, category, color, size } = req.body;

//     const sku = await generateSKU({
//       name,        // ⭐ very important!
//       category,
//       color,
//       size
//     });

//     const newProduct = new Product({
//       ...req.body,
//       sku
//     });

//     const saved = await newProduct.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.error("Create product error:", error);
//     res.status(400).json({ message: "Invalid data or SKU generation failed" });
//   }
// };
// export const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Product not found" });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: "Update failed" });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(400).json({ message: "Delete failed" });
//   }
// };


// controllers/productController.js
import Product from "../models/Product.js";
import { generateSKU } from "../utils/skuGenerator.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by SKU
export const getProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    if (!sku) return res.status(400).json({ message: "SKU is required" });

    const product = await Product.findOne({ sku });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update product quantity by SKU (ADD or REMOVE)
export const updateQtyBySKU = async (req, res) => {
  try {
    const { sku, addedQty, removeQty } = req.body;

    if (!sku) {
      return res.status(400).json({ message: "SKU is required" });
    }

    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(404).json({ message: "Product not found with this SKU" });
    }

    // ADD QTY
    if (addedQty != null) {
      const add = Number(addedQty);
      if (isNaN(add) || add <= 0) {
        return res.status(400).json({ message: "Invalid quantity to add" });
      }

      product.Qty += add;
    }

    // REMOVE QTY
    if (removeQty != null) {
      const remove = Number(removeQty);
      if (isNaN(remove) || remove <= 0) {
        return res.status(400).json({ message: "Invalid quantity to remove" });
      }

      if (remove > product.Qty) {
        return res
          .status(400)
          .json({ message: "Remove quantity cannot be greater than current stock" });
      }

      product.Qty -= remove;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Qty Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD Qty by SKU
// export const updateQtyBySKU = async (req, res) => {
//   try {
//     const { sku, addedQty } = req.body;

//     if (!sku) return res.status(400).json({ message: "SKU is required" });
//     if (addedQty == null) return res.status(400).json({ message: "Quantity to add is required" });

//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ message: "Product not found with this SKU" });

//     product.Qty += Number(addedQty);
//     await product.save();

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // SUBTRACT Qty by SKU
// export const subtractQtyBySKU = async (req, res) => {
//   try {
//     const { sku, subtractQty } = req.body;

//     if (!sku) return res.status(400).json({ message: "SKU is required" });
//     if (subtractQty == null || Number(subtractQty) <= 0)
//       return res.status(400).json({ message: "Quantity to subtract must be > 0" });

//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ message: "Product not found with this SKU" });

//     // Prevent negative stock
//     if (product.Qty - Number(subtractQty) < 0)
//       return res.status(400).json({ message: "Cannot subtract more than available stock" });

//     product.Qty -= Number(subtractQty);
//     await product.save();

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Get product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Create product with auto SKU
export const createProduct = async (req, res) => {
  try {
    const { name, category, color, size } = req.body;

    const sku = await generateSKU({
      name,
      category,
      color,
      size
    });

    const newProduct = new Product({
      ...req.body,
      sku
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ message: "Invalid data or SKU generation failed" });
  }
};

// Update product details
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};
