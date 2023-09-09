import { ReactNode, createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { CartItemIdModel } from "../models/CartItemIdModel"
import { CartItemModel } from "../models/CartItemModel"
import axios from "axios"

type ShoppingCartContext = {
  addCartItem: (id: string, size: string) => void
  getItemQuantity: (id: string) => number
  changeCartQuantity: (id: string, size: string, quantity: number) => void
  removeFromCart: (cartItem: CartItemIdModel) => void
  cartQuantity: number
  cartItems: CartItemIdModel[]
  getCartItemsWithProducts: () => Promise<CartItemModel[]>
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItemIdModel[]>("shopping-cart", [])

  const cartQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)

  const addCartItem = (id: string, size: string) => {
    const item = cartItems.find(item => (item.id === id && item.size === size))
    if (!item) {
      cartItems.push({id, size, quantity: 1})
    }
    else {
      item.quantity++
    }
    setCartItems([...cartItems])
  }

  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const changeCartQuantity = (id: string, size: string, quantity: number) => {
    const item = cartItems.find(item => (item.id === id && item.size === size))
    if (!item) return
    item.quantity = quantity
    setCartItems([...cartItems])
  }

  const removeFromCart = (cartItem: CartItemIdModel) => {
    const idx = cartItems.indexOf(cartItem)
    cartItems.splice(idx, 1)
    setCartItems([...cartItems])
  }

  const getCartItemsWithProducts = async () => {
    const tempCartItems: CartItemModel[] = []
      // I will get the products 1 by 1
      for (let i = 0; i < cartItems.length; i++) {
        const currCartItem = cartItems[i]
        const item = tempCartItems.find(cartItem => cartItem.product.productUrl.split("/")[2] === currCartItem.id)
        if (item) {
          continue
        }

        let url = `${process.env.REACT_APP_API}/api/${currCartItem.id.split("-")[0]}s/findByProductId?productId=${currCartItem.id}`

        try {
          const res = await axios.get(url)
          tempCartItems.push(new CartItemModel(res.data, currCartItem.quantity, currCartItem.size))

          if (i === cartItems.length - 1) continue
          for (let j = i + 1; j < cartItems.length; j++) {
            if (cartItems[j].id === currCartItem.id) {
              tempCartItems.push(new CartItemModel(res.data, cartItems[j].quantity, cartItems[j].size))
            }
          }
        }
        catch (err: any) {
          console.log(err)
        }
      }
    return tempCartItems
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addCartItem,
        getItemQuantity,
        changeCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        getCartItemsWithProducts
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}