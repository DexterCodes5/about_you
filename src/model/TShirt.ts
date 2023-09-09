import mongoose from "mongoose"

const TShirtScema = new mongoose.Schema(
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
      type: String
    },
    sleeveLength: {
      type: String
    },
    lenght: {
      type: String
    },
    cut: {
      type: String
    },
    model: {
      type: String
    },
    material: {
      type: String
    },
    countryOfOrigin: {
      type: String
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

export default mongoose.model("Tshirt", TShirtScema)