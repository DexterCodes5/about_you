import "./BasketPage.css"
import { ReactComponent as EmptyBasket } from "../../icons/empty_basket.svg"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { BasketProduct } from "./components/BasketProduct"
import { useEffect, useState } from "react"
import axios from "axios"
import { CartItemModel } from "../../models/CartItemModel"

export const BasketPage = () => {
  const cart = useShoppingCart()

  const [cartItems, setCartItems] = useState<CartItemModel[]>([])

  // I need to get the products here so I can calculate Total
  useEffect(() => {

    const getCartItems = async () => {
      const tempCartItems: CartItemModel[] = []
      // I will get the products 1 by 1
      for (let i = 0; i < cart.cartItems.length; i++) {
        const currCartItem = cart.cartItems[i]
        const item = tempCartItems.find(cartItem => cartItem.product.productUrl.split("/")[2] === currCartItem.id)
        if (item) {
          continue
        }

        let url = `${process.env.REACT_APP_API}/api/${currCartItem.id.split("-")[0]}s/findByProductId?productId=${currCartItem.id}`

        try {
          const res = await axios.get(url)
          tempCartItems.push(new CartItemModel(res.data, currCartItem.quantity, currCartItem.size))

          if (i === cart.cartItems.length - 1) continue
          for (let j = i + 1; j < cart.cartItems.length; j++) {
            if (cart.cartItems[j].id === currCartItem.id) {
              tempCartItems.push(new CartItemModel(res.data, cart.cartItems[j].quantity, cart.cartItems[j].size))
            }
          }
        }
        catch (err: any) {
          console.log(err)
        }
      }
      setCartItems(tempCartItems)
    }
    getCartItems()
  }, [cart.cartItems])

  return (
    <section className="basket ay-padding">
      {cart.cartQuantity > 0 ?
        <>
          <h1 className="basket-h1">Basket</h1>
          <div className="basket-splitview">
            <div className="basket-section-start">
              <div className="delivery-info-text">
                <p className="delivery-info-text-p">THE PRODUCTS ARE NOT RESERVED</p>
              </div>
              <div className="delivery-inner-section">
                <div className="delivery-inner-section-row">
                  <p className="delivery-inner-section-row-p">Delivery</p>
                  <div className="delivery-inner-section-row-div">w, 30.08 - th, 31.08</div>
                </div>
                {cartItems.map(cartItem => <BasketProduct cartItem={cartItem} key={cartItem.product._id! + cartItem.size} />)}
              </div>
            </div>
            <div className="basket-section-end">
              <div className="basket__summary_and_vouchers">
                <div className="basket__summary">
                  <div className="basket__summary_row">
                    <p className="basket__summary_row-p">Subtotal</p>
                    <p>249,28 BGN</p>
                  </div>
                  <div className="basket__summary_row">
                    <p className="basket__summary_row-p">Delivery</p>
                    <p>0,00 BGN</p>
                  </div>
                  <div className="basket__summary_row">
                    <h1 className="basket__summary_row-h1">Total<span className="basket__summary-vat">With included VAT</span></h1>
                    <h1 className="basket__summary_row-h1">249.28 BGN</h1>
                  </div>
                  <div className="proceed-to-checkout">
                    <a href={`${process.env.REACT_APP_URL}/checkout`} className="proceed-to-checkout-btn">Proceed to checkout</a>
                  </div>
                  <div className="basket-payment-methods">
                    <div className="basket-payment-method">
                      <img className="basket-payment-method-img" src={require("../../icons/cards/mastercard.avif")} alt="cart" />
                    </div>
                    <div className="basket-payment-method">
                      <img className="basket-payment-method-img" src={require("../../icons/cards/visa.avif")} alt="cart" />
                    </div>
                    <div className="basket-payment-method">
                      <img className="basket-payment-method-img" src={require("../../icons/cards/gpay.webp")} alt="cart" />
                    </div>
                    <div className="basket-payment-method">
                      <img className="basket-payment-method-img" src={require("../../icons/cards/apple_pay.avif")} alt="cart" />
                    </div>
                    <div className="basket-payment-method">
                      <img className="basket-payment-method-img" src={require("../../icons/cards/maestro.avif")} alt="cart" />
                    </div>
                  </div>
                  <div className="basket__summary-border"></div>
                </div>
                <div className="basket-vouchers">
                  <div className="basket-vouchers-content">
                    <img width="16" height="16" src={require("../../icons/present.webp")} alt="icon" />
                    <p className="basket-vouchers-p">
                      A voucher is a bond of the redeemable transaction type which is worth a certain monetary value and which may be spent only for specific reasons or on specific goods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <div className="basket-empty">
          <EmptyBasket className="basket-empty-icon" />
          <div>
            <h2 className="basket-empty-h2">Your basket is empty!</h2>
            <p className="basket-empty-p">Add products or sign in</p>
            <button className="basket-empty-sign-in-btn">Sign in</button>
          </div>
        </div>
      }
    </section>
  )
}