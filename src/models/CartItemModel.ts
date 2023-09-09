import { ProductModel } from "./ProductModel"

export class CartItemModel {
  product: ProductModel
  size?: string
  quantity: number

  constructor(product: ProductModel, quantity: number, size?: string) {
    this.product = product
    this.size = size
    this.quantity = quantity
  }
}