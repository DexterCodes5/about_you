import { findSourceMap } from "module"
import { ProductModel } from "../../../../models/ProductModel"
import "./Product.css"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../../../../context/ShoppingCartContext"

export const Product: React.FC<{ product: ProductModel, setProductWithoutSize: React.Dispatch<React.SetStateAction<ProductModel | undefined>> }> = (props) => {
  
  const color = (color: string, idx: number) => {
    if (!color) return
    
    if (color.includes("black"))
      return <li className="color__bubble" style={{ backgroundColor: "black" }} key={color}></li>

    else if (color.includes("green"))
      return <li className="color__bubble" style={{ backgroundColor: "green" }} key={color}></li>

    else if (color.includes("blue"))
      return <li className="color__bubble" style={{ backgroundColor: "blue" }} key={color}></li>

    else if (color.includes("blue"))
      return <li className="color__bubble" style={{ backgroundColor: "blue" }} key={color}></li>

    else if (color.includes("white"))
      return <li className="color__bubble" style={{ backgroundColor: "white", border: "1px solid rgb(229, 229, 229)" }} key={color}></li>

    else if (color.includes("brown"))
      return <li className="color__bubble" style={{ backgroundColor: "rgb(102, 51, 0)" }} key={color}></li>
  }

  const formatSizes = (sizes: string[]) => {
    if (!sizes) return
    let result = "";
    for (let i = 0; i < sizes.length; i++) {
      result += " " + sizes[i] + ","
    }
    return result.slice(0, -1)
  }

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!props.product._id) return
    props.setProductWithoutSize(props.product)
  }
  
  return (
    <Link to={`/p${props.product?.productUrl}`} className="product">
      <div className="product-img-container">
        <img className="product-img" src={props.product?.img[0]} alt="Shirt" />
        <img className="product-img-hover" src={props.product?.img[1]} alt="Shirt" />
      </div>
      <div className="product-info">
        <div className="product-brand">{props.product?.brand}</div>
        <div className="product-title">{props.product?.title}</div>
        <div className="product-price">{props.product?.price}</div>
        <div className="product-colors-and-available-sizes">
          <ul className="color__bubbles">
            {color(props.product?.color, 0)}
            {props.product?.otherColors.slice(0, 3).map(color)}
          </ul>
          <div className="product-available-sizes">Available sizes: {formatSizes(props.product?.sizes)}</div>
        </div>
        <div className="product-add-to-basket-container">
          <div className="product-add-to-basket" onClick={addToCart}>
            Add to basket
          </div>
        </div>
      </div>
    </Link>
  )
}