import { CartItemIdModel } from "./CartItemIdModel"

export class GuestModel {
  sessionId: string
  cart: CartItemIdModel[]

  constructor(sessionId: string, cart: CartItemIdModel[]) {
    this.sessionId = sessionId
    this.cart = cart
  }
}