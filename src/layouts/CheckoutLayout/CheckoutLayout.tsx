import { Outlet, useNavigate } from "react-router-dom"
import { FooterTop } from "../Footer/components/FooterTop/FooterTop"
import { FooterBottom } from "../Footer/components/FooterBottom/FooterBottom"
import "./CheckoutLayout.css"
import { useEffect, useState } from "react"
import { ReactComponent as ChevronRight } from "../../icons/chevronRight.svg"
import { ReactComponent as Econt} from "../../icons/econtbg.svg"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { CartItemModel } from "../../models/CartItemModel"
import { CheckoutProduct } from "./CheckoutProduct/CheckoutProduct"

export const CheckoutLayout = () => {
  const navigate = useNavigate()
  const cart = useShoppingCart()
  const [cartItems, setCartItems] = useState<CartItemModel[]>()
  useEffect(() => {
    if (window.location.href === `${process.env.REACT_APP_URL}/checkout`) {
      navigate("/checkout/delivery")
    }
  }, [])

  useEffect(() => {
    const getCartItems = async () => {
      const res = await cart.getCartItemsWithProducts()
      setCartItems(res)
    }
    getCartItems()
  }, [cart.cartItems])
 
  return (
    <>
      <div className="checkout-header">
        <div className="ay-logo">
          <div className="about-logo" style={{ marginRight: 2 }}>ABOUT</div>
          <div className="about-logo you-logo">
            YOU
            <img className="circle-logo" src={require("../../icons/about_you_logo_circle.png")} alt="Circle" />
          </div>
        </div>
        <a href="#" className="checkout-header-help">Help</a>
      </div>
      <main className="checkout-main">
        <div className="checkout-content">
          <div className="checkout-content-max-width">
            <div className="checkout-breadcrumbs">
              <div className="checkout-breadcrumb checkout-breadcrumb-active">
                Delivery
              </div>
              <ChevronRight className="checkout-breadcrumbs-chevron-right" />
              <div className="checkout-breadcrumb">
                Payment
              </div>
            </div>
            <Outlet />
          </div>
        </div>
        <div className="checkout-basket">
          <h2 className="checkout-main-headline" style={{ marginTop: 48 }}>Information about the order</h2>
          <div className="checkout-basket-delivery-row">
            <p className="checkout-basket-delivery-text">Delivery on th, 14.09 - m, 18.09&nbsp;&#x2022;&nbsp;</p>
            <Econt className="checkout-basket-delivery-icon" />
          </div>
          {cartItems?.map(cartItem => <CheckoutProduct cartItem={cartItem} key={cartItem.product._id! + cartItem.size} />)}
        </div>
      </main>
      <FooterTop />
      <FooterBottom />
    </>
  )
}