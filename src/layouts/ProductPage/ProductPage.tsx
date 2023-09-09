import { useEffect, useRef, useState } from "react"
import { ProductModel } from "../../models/ProductModel"
import "./ProductPage.css"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ReactComponent as ArrowLeft } from "../../icons/arrow-left.svg"
import { ReactComponent as ArrowRight } from "../../icons/arrow-right.svg"
import { ReactComponent as SmallTriangeDown } from "../../icons/small-triangle-down.svg"
import { ReactComponent as Heart } from "../../icons/heart.svg"
import { ReactComponent as HeartBlack } from "../../icons/heart-black.svg"
import { ProductInformationBox } from "./components/ProductInformationBox/ProductInformationBox"
import { useShoppingCart } from "../../context/ShoppingCartContext"

export const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const cart = useShoppingCart()

  const [product, setProduct] = useState<ProductModel>()
  const [productsWithOtherColors, setProductsWithOtherColors] = useState<ProductModel[]>()

  const [colorOptionPopup, setColorOptionPopup] = useState("")

  const [showChooseSize, setShowChooseSize] = useState(false)

  const [size, setSize] = useState("")

  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false)

  const [heart, setHeart] = useState(false)

  const chooseSize = useRef<HTMLButtonElement>(null)
  const chooseSizeDropdown = useRef<HTMLUListElement>(null)

  const addToBasketWithoutSize = useRef<boolean>(false)

  useEffect(() => {
    const getProduct = async () => {
      const url = `${process.env.REACT_APP_API}/api/${params.productId?.split("-")[0] + "s"}/findByProductId?productId=${params.productId}`
      try {
        const res = await axios.get(url)
        setProduct(res.data)
      }
      catch (err: any) {
        console.log(err)
      }
      window.scrollTo(0, 0)
    }
    getProduct()
  }, [params])

  useEffect(() => {
    if (!product) return
    const fetchProductsWithOtherColors = async () => {
      let url = `${process.env.REACT_APP_API}/api/${params.productId?.split("-")[0]}s/findProductsByIds`

      if (product.productsWithOtherColors.length > 0) {
        url += "?"
        for (const productWithOtherColor of product.productsWithOtherColors) {
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
  }, [product])


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

  const brandLogo = () => {
    if (product?.brand === "FC BAYERN MÜNCHEN") {
      return "/brands/fc-bayern-munchen.avif"
    }
    else if (product?.brand === "Calvin Klein Jeans") {
      return "/brands/calvin-klein-jeans.avif"
    }
    else if (product?.brand === "G-Star RAW") {
      return "/brands/g-star-raw.avif"
    }
  }

  const handleSize = (selectedSize: string) => {
    setSize(selectedSize)
    setShowChooseSize(false)

    if (addToBasketWithoutSize.current) {
      cart.addCartItem(product!.productUrl.split("/")[2], selectedSize)
      addToBasketWithoutSize.current = false
      setAlreadyAddedToCart(true)
    }
  }

  const productPageColorOptionOnClick = (productElem: ProductModel) => {
    navigate(`/p${productElem.productUrl}`)
    setColorOptionPopup("")
  }

  const addToBasket = () => {
    if (!size) {
      addToBasketWithoutSize.current = true
      setShowChooseSize(true)
      return
    }
    
    cart.addCartItem(product!.productUrl.split("/")[2], size)
  }

  const addToBasketBtnText = () => {
    if (alreadyAddedToCart) {
      return "Already added to cart"
    }
    else if (size) {
      return `${size} - Add to basket`
    }
    return "Add to basket"
  }
  
  return (
    <div className="product-page" key={product?._id}>
      <section className="product-page-top ay-padding">
        <div className="product-page-section-start">
          <ArrowLeft className="product-page-back-btn" />
          <ul className="product-page-images">
            {product?.img.length === 7 &&
              <>
                <li className="product-page-img-container">
                  <img className="product-page-img-90" src={product?.img[0]} alt="Product" />
                </li>
                <li className="product-page-img-container">
                  <img className="product-page-img-100" src={product?.img[1]} alt="Product" />
                </li>
                <li className="product-page-img-container">
                  <img className="product-page-img-90" src={product?.img[2]} alt="Product" />
                </li>
                <li className="product-page-img-container-md">
                  <img className="product-page-img-100" src={product?.img[3]} alt="Product" />
                </li>
                <li className="product-page-img-container-sm">
                  <img className="product-page-img-100" src={product?.img[4]} alt="Product" />
                </li>
                <li className="product-page-img-container-sm">
                  <img className="product-page-img-100" src={product?.img[5]} alt="Product" />
                </li>
                <li className="product-page-img-container-sm">
                  <img className="product-page-img-100" src={product?.img[6]} alt="Product" />
                </li>
              </>
            }
            {product?.img.length === 5 &&
              <>
                <li className="product-page-img-container">
                  <img className="product-page-img-90" src={product?.img[0]} alt="Product" />
                </li>
                <li className="product-page-img-container">
                  <img className="product-page-img-100" src={product?.img[1]} alt="Product" />
                </li>
                <li className="product-page-img-container-md2">
                  <img className="product-page-img-100" src={product?.img[2]} alt="Product" />
                </li>
                <li className="product-page-img-container-sm">
                  <img className="product-page-img-100" src={product?.img[3]} alt="Product" />
                </li>
                <li className="product-page-img-container-sm">
                  <img className="product-page-img-100" src={product?.img[4]} alt="Product" />
                </li>
              </>
            }
          </ul>
        </div>
        <div className="product-page-section-end">
          <div className="product-page-section-end-content">
            <ul className="breadcrumbs">
              <li>
                <a className="breadcrumb-link" href="#">Mans</a>
              </li>
              <li>
                <ArrowRight className="breadcrumb-arrow" />
                <a className="breadcrumb-link" href="#">Clothes</a>
              </li>
              <li>
                <ArrowRight className="breadcrumb-arrow" />
                <a className="breadcrumb-link" href="#">Shirts</a>
              </li>
              <li>
                <ArrowRight className="breadcrumb-arrow" />
                <a className="breadcrumb-link" href="#">Everyday shirts</a>
              </li>
              <li>
                <ArrowRight className="breadcrumb-arrow" />
                <a className="breadcrumb-link" href="#">{product?.brand} Everyday shirts</a>
              </li>
            </ul>
            <div>
              <img className="product-page-brand-logo" src={brandLogo()} alt="Brand" />
            </div>
            <h3 className="product-page-title">{product?.title}</h3>
            <h2 className="product-page-price">{product?.price}</h2>
            <p className="product-page-price-vat">incl. VAT</p>
            <div className="product-page-color">
              <span>Color</span>
              <span>:&nbsp;</span>
              <span className="product-page-color-span3">{product?.color}</span>
            </div>
            <div className="product-page-color-options">
              {colorOptionPopup &&
                <div className="product-page-color-option-popup">
                  <img src={require("../../icons/shadow-triangle.png")} alt="triangle"
                    className="product-page-color-option-popup-triangle"></img>
                  <div className="product-page-color-option-popup-content">
                    <img className="product-page-color-option-img" src={colorOptionPopup} alt="Product" />
                  </div>
                </div>
              }
              {productsWithOtherColors?.map(productElem =>
                <div className={`product-page-color-option${productElem._id === product?._id ? " product-page-color-option-active" : ""}`}
                  key={productElem._id}
                  onMouseEnter={productElem._id === product?._id ? undefined : () => setColorOptionPopup(productElem.img[0])}
                  onMouseLeave={() => setColorOptionPopup("")}
                  onClick={() => productPageColorOptionOnClick(productElem)}>
                  <img className="product-page-color-option-img" src={productElem?.img[0]} alt="Product" />
                </div>
              )}
            </div>
            <div className="product-page-choose-size">
              <button className="product-page-choose-size-btn" onClick={() => setShowChooseSize(!showChooseSize)} ref={chooseSize}>
                <div className="product-page-choose-size-text">
                  {size ? `${size}` : "Choose size"}
                </div>
                <SmallTriangeDown className="product-page-choose-small-triangle-down" />
              </button>
              {showChooseSize &&
                <ul className="product-page-choose-size-dropdown" ref={chooseSizeDropdown}>
                  {product?.sizes.map(elem =>
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
              <button className="add_to_basket_btn" onClick={addToBasket}>{addToBasketBtnText()}</button>
              {heart ?
                <HeartBlack className="add_to_basket_heart" onClick={() => setHeart(!heart)} />
                :
                <Heart className="add_to_basket_heart" onClick={() => setHeart(!heart)} />
              }
            </div>
            <ul className="product-page-usp">
              <a href="#" className="product-page-usp-a">
                <img className="product-page-usp-img" src={require("../../icons/cash_on_delivery_icon.webp")} alt="Icon" />
                <span className="product-page-usp-span">CASH ON DELIVERY</span>
              </a>
              <a href="#" className="product-page-usp-a">
                <img className="product-page-usp-img" src={require("../../icons/free-delivery-icon.avif")} alt="Icon" />
                <span className="product-page-usp-span">FREE DELIVERY* AND RETURN</span>
              </a>
              <a href="#" className="product-page-usp-a">
                <img className="product-page-usp-img" src={require("../../icons/right-of-return-icon.webp")} alt="Icon" />
                <span className="product-page-usp-span">100 DAYS RIGHT OF RETURN</span>
              </a>
            </ul>
          </div>
        </div>
      </section>
      <ProductInformationBox product={product!} />
    </div>
  )
}