import mongoose from "mongoose";

const ShirtSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    otherColors: {
      type: [String]
    },
    sizes: {
      type: [String],
      required: true
    },
    designAndCharacteristics: {
      type: [String]
    },
    number: {
      type: String,
      required: true
    },
    sleeveLength: {
      type: String
    },
    cut: {
      type: String
    },
    shirtCollar: {
      type: String
    },
    material: {
      type: String
    },
    countryOfOrigin: {
      type: String
    },
    support: {
      type: [String]
    },
    img: {
      type: [String]
    },
    productUrl: {
      type: String,
      required: true
    }
  }
)

export default mongoose.model("Shirt", ShirtSchema)