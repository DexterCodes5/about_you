import { CartItemModel } from "../../../models/CartItemModel"
import "./CheckoutProduct.css"
import { ReactComponent as Minus } from "../../../icons/minus.svg"
import { ReactComponent as Plus } from "../../../icons/plus.svg"
import { useShoppingCart } from "../../../context/ShoppingCartContext"
import { useEffect, useState } from "react"

export const CheckoutProduct: React.FC<{ cartItem: CartItemModel }> = (props) => {
  const cart = useShoppingCart()

  const [qty, setQty] = useState(props.cartItem.quantity.toString())

  useEffect(() => {
    setQty(props.cartItem.quantity.toString())
  }, [props.cartItem.quantity])

  const qtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target

    setQty(value)
  }
  
  const qtyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = (e.target as HTMLInputElement)
      const valueNum = Number(input.value)
      if (valueNum < 0) {
        cart.changeCartQuantity(props.cartItem.product.productUrl.split("/")[2], props.cartItem.size!, -valueNum)
      } 
      input.blur()
    }
  }
  
  return (
    <div className="checkout-product">
      <div className="checkout-product-img-container">
        <img src={props.cartItem.product.img[0]} alt="product" className="checkout-product-img" />
      </div>
      <div className="checkout-product-info">
        <p className="checkout-product-brand">{props.cartItem.product.brand}</p>
        <p className="checkout-product-title">{props.cartItem.product.title}</p>
        <p className="checkout-product-number">{props.cartItem.product.number}</p>
        <p className="checkout-product-smll-txt">Color: {props.cartItem.product.color}</p>
        <p className="checkout-product-smll-txt">Size: {props.cartItem.size}</p>
        <div className="checkout-product-qty-and-price">
          <div className="checkout-product-qty">
            <Minus className={`checkout-product-qty-icon${props.cartItem.quantity === 1 ? " checkout-product-qty-icon-disabled" : ""}`} />
            <input type="number" className="checkout-product-qty-input" value={qty} onChange={qtyChange}
            onKeyDown={qtyKeyDown} />
            <Plus className="checkout-product-qty-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}