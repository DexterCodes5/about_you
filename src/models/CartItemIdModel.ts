export class CartItemIdModel {
  id: string
  size?: string
  quantity: number

  constructor(id: string, quantity: number, size?: string) {
    this.id = id
    this.size = size
    this.quantity = quantity
  }
}