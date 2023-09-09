import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    streetOrNeighborhood: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    additionalInformation: {
      type: String
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    userId: {
      type: ObjectId,
      required: true
    }
  }
)

export default mongoose.model("Address", AddressSchema)