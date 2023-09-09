import mongoose from "mongoose"

export class CartItem {
  id: string
  size?: string
  quantity: number

  constructor(id: string, quantity: number) {
    this.id = id
    this.quantity = quantity
  }
}

export class UserModel {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  emailUpdates: boolean
  refreshToken?: string
  cart?: CartItem[]

  constructor(firstName: string, lastName: string, email: string, password: string, gender: string, emailUpdates: boolean) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.gender = gender
    this.emailUpdates = emailUpdates
  }
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    emailUpdates: {
      type: Boolean,
    },
    refreshToken: {
      type: String,
    },
    cart: {
      type: Object
    }
  }
)

export default mongoose.model("User", UserSchema)