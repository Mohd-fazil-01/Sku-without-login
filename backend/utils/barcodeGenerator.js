import bwipjs from "bwip-js";
import cloudinary from "../config/cloudinary.js";

export const generateAndUploadBarcode = async (sku) => {
  // 1️⃣ Barcode buffer generate
  const pngBuffer = await bwipjs.toBuffer({
    bcid: "code128",
    text: sku,
    scale: 3,
    height: 10,
    includetext: true,
    textxalign: "center",
  });

  // 2️⃣ Cloudinary upload (base64)
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${pngBuffer.toString("base64")}`,
    {
      folder: "barcodes",
      public_id: sku,
    }
  );

  return result.secure_url;
};
