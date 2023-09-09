import { CartItemModel } from "../../../models/CartItemModel"
import "./BasketProduct.css"
import { ReactComponent as CloseIcon } from "../../../icons/close.svg"
import { ReactComponent as SmallTriangleDown } from "../../../icons/small-triangle-down.svg"
import { useEffect, useRef, useState } from "react"
import { useShoppingCart } from "../../../context/ShoppingCartContext"

export const BasketProduct: React.FC<{
  cartItem: CartItemModel
}> = (props) => {
  const cart = useShoppingCart()

  const [showQtyBody, setShowQtyBody] = useState(false)

  const qtyOpener = useRef<HTMLButtonElement>(null)
  const qtyBody = useRef<HTMLUListElement>(null)

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [showQtyBody])

  const onMouseDown = (e: any) => {
    if (qtyOpener.current?.contains(e.target) || qtyBody.current?.contains(e.target) || !showQtyBody) {
      return
    }

    closeQtyBody()
  }

  const closeQtyBody = () => {
    qtyBody.current!.style.animation = "200ms ease-in 0s 1 normal none running fadeExit"
    setTimeout(() => setShowQtyBody(false), 180)
  }

  const handleQtyOpener = () => {
    if (showQtyBody) {
      closeQtyBody()
      return
    }
    setShowQtyBody(true)
  }

  const handleQtyOption = (quantity: number) => {
    closeQtyBody()
    cart.changeCartQuantity(props.cartItem.product.productUrl.split("/")[2], props.cartItem.size!, quantity)
  }

  const calculatePrice = () => {
    return (Number(props.cartItem?.product.price.slice(0, -4)) * Number(props.cartItem?.quantity)).toFixed(2)
  }

  const remove = () => {
    const cartItem = cart.cartItems.find(elem => (elem.id === props.cartItem.product.productUrl.split("/")[2] 
    && elem.size === props.cartItem.size))
    cart.removeFromCart(cartItem!)
  }

  return (
    <div className="basket-product">
      <div className="basket-product-img-container">
        <img src={props.cartItem?.product.img[0]} alt="product" className="basket-product-img" />
      </div>
      <div className="basket-product-description-container">
        <div className="basket-product-details">
          <div className="basket-product-details-div">
            <h3 className="basket-product-details-brand">{props.cartItem?.product.brand}</h3>
            <p className="basket-product-details-p">{props.cartItem?.product.title}</p>
            <p className="basket-product-details-p">{props.cartItem?.size}</p>
            <p className="basket-product-details-p">{props.cartItem?.product.color}</p>
          </div>
          <div className="basket-product-remove" onClick={remove}>
            <CloseIcon className="basket-product-close-icon" />
            <div className="basket-product-remove-text">Remove</div>
          </div>
        </div>
        <div className="basket-product-values">
          <p className="basket-product-price">{calculatePrice()} BGN</p>
        </div>
      </div>
      <div className="basket-product-qty">
        <button className="basket-product-qty-opener" onClick={handleQtyOpener} ref={qtyOpener}>
          <div className="basket-product-qty-text">{props.cartItem?.quantity}</div>
          <SmallTriangleDown className="basket-product-qty-smtrd" />
        </button>
        {showQtyBody &&
          <ul className="basket-product-qty-body" ref={qtyBody}>
            <li onClick={() => handleQtyOption(1)}>1</li>
            <li onClick={() => handleQtyOption(2)}>2</li>
            <li onClick={() => handleQtyOption(3)}>3</li>
            <li onClick={() => handleQtyOption(4)}>4</li>
            <li onClick={() => handleQtyOption(5)}>5</li>
            <li onClick={() => handleQtyOption(6)}>6</li>
          </ul>
        }
      </div>
    </div>
  )
}