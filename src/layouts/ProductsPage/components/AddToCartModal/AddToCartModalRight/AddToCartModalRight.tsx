import { useEffect, useRef, useState } from "react"
import { ProductModel } from "../../../../../models/ProductModel"
import axios from "axios"
import { ReactComponent as ChevronRight } from "../../../../../icons/chevronRight2.svg"
import { ReactComponent as SmallTriangleDown } from "../../../../../icons/small-triangle-down.svg"
import { ReactComponent as ArrowRight } from "../../../../../icons/arrow-right2.svg"
import { useShoppingCart } from "../../../../../context/ShoppingCartContext"
import "./AddToCartModalRight.css"
import { Link } from "react-router-dom"

export const AddToCartModalRight: React.FC<{
  product: ProductModel, closeModal: () => void,
  setProductWithoutSize: React.Dispatch<React.SetStateAction<ProductModel | undefined>>
}> = (props) => {
  const cart = useShoppingCart()

  const [productsWithOtherColors, setProductsWithOtherColors] = useState<ProductModel[]>()

  const [showChooseSize, setShowChooseSize] = useState(false)
  const [size, setSize] = useState("")

  const chooseSize = useRef<HTMLButtonElement>(null)
  const chooseSizeDropdown = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!props.product) return
    const fetchProductsWithOtherColors = async () => {
      let url = `${process.env.REACT_APP_API}/api/${props.product.productUrl.split("/")[2].split("-")[0]}s/findProductsByIds`

      if (props.product.productsWithOtherColors.length > 0) {
        url += "?"
        for (const productWithOtherColor of props.product.productsWithOtherColors) {
          url += "productWithOtherColor=" + productWithOtherColor + "&"
        }
        url = url.slice(0, -1)
      }

      try {
        const res = await axios.get(url)
        setProductsWithOtherColors(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchProductsWithOtherColors()
  }, [props.product])

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [showChooseSize])

  const onMouseDown = (e: any) => {
    if (chooseSize.current?.contains(e.target) || chooseSizeDropdown.current?.contains(e.target)) {
      return
    }
    setShowChooseSize(false)
  }
  console.log(props.product)
  const getBrandImage = () => {
    if (props.product.brand === "G-Star RAW") {
      return "./brands2/g-star.avif"
    }
    else if (props.product.brand === "Calvin Klein Jeans") {
      return "./brands2/calvin-klein-jeans.avif"
    }
  }

  const handleSize = (selectedSize: string) => {
    setSize(selectedSize)
    setShowChooseSize(false)
  }

  const addToBasket = () => {
    if (!size) {
      setShowChooseSize(true)
      return
    }

    cart.addCartItem(props.product!.productUrl.split("/")[2], size)
    props.closeModal()
  }

  return (
    <div className="prod-modal-side">
      <img src={getBrandImage()} alt="brand" className="prod-modal-right-brand" />
      <p className="prod-modal-right-title">{props.product.title}</p>
      <h3 className="prod-modal-right-price">{props.product.price.replace(".", ",")}</h3>
      <p className="prod-modal-right-vat">inc VAT</p>
      <div className="prod-modal-right-color-row">
        <div className="prod-modal-right-color-row1">
          <span className="prod-modal-right-color-row2">Color:&nbsp;</span>
          <span>{props.product.color}</span>
        </div>
        {props.product.otherColors.length > 0 &&
          <div className="prod-modal-right-color-row-cvrn-cont">
            <ChevronRight className="prod-modal-right-color-row-cvrn prod-modal-right-color-row-cvrn-left" data-disabled="true" />
            <ChevronRight className="prod-modal-right-color-row-cvrn" />
          </div>
        }
      </div>
      <div className="product-page-color-options">
        {productsWithOtherColors?.map(productElem =>
          <div className={`product-page-color-option${productElem._id === props.product?._id ? " product-page-color-option-active" : ""} prod-modal-color-option`}
            key={productElem._id}
            onClick={() => props.setProductWithoutSize(productElem)}>
            <img className="product-page-color-option-img" src={productElem?.img[0]} alt="Product" />
          </div>
        )}
      </div>
      <div className="product-page-choose-size">
        <button className="product-page-choose-size-btn prod-modal-right-choose-size-btn" onClick={() => setShowChooseSize(!showChooseSize)} ref={chooseSize}>
          <div className="product-page-choose-size-text">
            {size ? `${size}` : "Choose size"}
          </div>
          <SmallTriangleDown className="product-page-choose-small-triangle-down" />
        </button>
        {showChooseSize &&
          <ul className="product-page-choose-size-dropdown prod-modal-choose-size-dropdown" ref={chooseSizeDropdown}>
            {props.product?.sizes.map(elem =>
              <li className="product-page-choose-size-dropdown-item" onClick={(e) => handleSize(elem)} key={elem}>
                <div className="product-page-choose-size-label">
                  <input type="radio" className="product-page-choose-size-input" checked={size === elem}
                    readOnly></input>
                  <div className="product-page-choose-size-input-mask"></div>
                </div>
                <div className="product-page-choose-size-name">{elem}</div>
              </li>
            )}
          </ul>
        }
      </div>
      <div className="add_to_basket">
        <button className="add_to_basket_btn prod-modal-right-add-to-basket" onClick={addToBasket}>Add to basket</button>
      </div>
      <div className="atcmr-more-info">
        <Link to={`/p${props.product?.productUrl}`} className="atcmr-more-info2">
          More information
          <ArrowRight className="add-to-cart-modal-right-arrow-right" />
        </Link>
      </div>
    </div>
  )
}