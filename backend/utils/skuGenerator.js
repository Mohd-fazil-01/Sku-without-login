// // utils/skuGenerator.js
// import Counter from "../models/Counter.js";

// const BRAND_CODE = "CT"; // Claptales

// // CATEGORY CODES
// const CATEGORY_CODES = {
//   "Soft Toy": "SFT",
//   "Die-cast": "DC",
//   "Remote Control": "RC",
//   "Board Game": "BG",
//   "Scooter": "SC"
// };

// // COLOR CODES
// const COLOR_CODES = {
//   Black: "BL",
//   White: "WH",
//   Red: "RD",
//   Blue: "BU",
//   Green: "GR",
//   Yellow: "YL",
//   Orange: "OR",
//   Broun: "BR",
//   Grey: "GY"
// };

// // SERIAL INCREMENT
// export const getNextSerial = async (counterName = "productSerial") => {
//   const updated = await Counter.findOneAndUpdate(
//     { name: counterName },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return updated.seq;
// };

// // 🔥 Product Name Code Generator
// const getNameCode = (name) => {
//   if (!name) return "NA";

//   const parts = name.trim().split(" ");

//   if (parts.length >= 2) {
//     return (
//       parts[0][0].toUpperCase() +
//       parts[1][0].toUpperCase()
//     );
//   }

//   return parts[0].substring(0, 2).toUpperCase();
// };

// // Extract clean size for SKU
// const getCleanSizeCode = (size) => {
//   if (!size) return "NA";

//   // Case 1: 1:32 → 32
//   if (size.includes(":")) {
//     return size.split(":")[1];
//   }

//   // Case 2: 20 cm / 30 inch → 20 / 30 (remove letters)
//   const numeric = size.replace(/[^0-9]/g, "");

//   // If S, M, L, XL → no numeric, so return original
//   if (numeric === "") return size.toUpperCase();

//   return numeric; // number only
// };

// // SKU Generator
// export const generateSKU = async ({ category, color, size, name }) => {
//   const categoryCode = CATEGORY_CODES[category] || "XX";
//   const colorCode = COLOR_CODES[color] || "XX";
//   const nameCode = getNameCode(name);
//   const sizeCode = getCleanSizeCode(size);

//   const serial = await getNextSerial();
//   const finalSerial = String(serial).padStart(4, "0");

//   // Final SKU Format:
//   // CT-DC-BL-RR-32-0001
//   return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
// };



// utils/skuGenerator.js
import Counter from "../models/Counter.js";

const BRAND_CODE = "CT";

const CATEGORY_CODES = {
  "Soft Toy": "SFT",
  "Die-cast": "DC",
  "Remote Control": "RC",
  "Board Game": "BG",
  "Scooter": "SC"
};

const COLOR_CODES = {
  Black: "BL",
  White: "WH",
  Red: "RD",
  Blue: "BU",
  Green: "GR",
  Yellow: "YL",
  Orange: "OR",
  Brown: "BR",     // ⭐ FIXED
  Grey: "GY"
};

// SERIAL
export const getNextSerial = async (counterName = "productSerial") => {
  const updated = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return updated.seq;
};

// NAME CODE
const getNameCode = (name) => {
  if (!name || !name.trim()) return "NA";

  const parts = name.trim().split(" ");

  if (parts.length >= 2) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  }

  return parts[0].substring(0, 2).toUpperCase();
};

export const generateSKU = async ({ category, color, size, name }) => {
  const categoryCode = CATEGORY_CODES[category] || "XX";
  const colorCode = COLOR_CODES[color] || "XX";
  const nameCode = getNameCode(name);

  let sizeCode = "";

  // Soft Toy & Board Game → number only
  if (["Soft Toy", "Board Game"].includes(category)) {
    if (!size || !size.trim()) size = "0"; // ⭐ Prevent empty
    sizeCode = size.replace(/cm|inch|in/gi, "").trim();
  }

  // Scooter → S,M,L,XL
  else if (category === "Scooter") {
    sizeCode = size ? size.toUpperCase() : "NA";
  }

  // Other → ratio 1:32 → 32
  else {
    sizeCode = size ? (size.includes(":") ? size.split(":")[1] : size) : "0";
  }

  const serial = await getNextSerial();
  const finalSerial = String(serial).padStart(4, "0");

  return `${BRAND_CODE}-${categoryCode}-${colorCode}-${nameCode}-${sizeCode}-${finalSerial}`;
};
