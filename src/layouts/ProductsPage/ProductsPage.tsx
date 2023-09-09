import "./ProductsPage.css"
import { ReactComponent as BreadcrumbArrow } from "../../icons/arrow-right.svg"
import { ReactComponent as ShirtIcon } from "../../icons/shirt.svg"
import { ReactComponent as SmallTriangleDown } from "../../icons/small-triangle-down.svg"
import { ReactComponent as Sorting } from "../../icons/sorting.svg"
import { Product } from "./components/Product/Product"
import { FilterBar } from "./components/FilterBar/FilterBar"
import { Categories } from "./components/Categories/Categories"
import { useEffect, useState } from "react"
import { ProductModel } from "../../models/ProductModel"
import axios from "axios"
import { useParams } from "react-router-dom"
import { AddToCartModal } from "./components/AddToCartModal/AddToCartModal"

export const ProductsPage = () => {
  const params = useParams()

  const [products, setProducts] = useState<ProductModel[]>([])

  const [productWithoutSize, setProductWithoutSize] = useState<ProductModel>()

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `${process.env.REACT_APP_API}/api/${params.clothing}`
      const res = await axios.get(url)
      setProducts(res.data)
    }
    fetchProducts()
  }, [params])

  useEffect(() => {
    if (productWithoutSize) {
      document.body.classList.add("lock-body-scroll")
      return
    }
    document.body.classList.remove("lock-body-scroll")
  }, [productWithoutSize])

  const title = () => {
    if (!params.clothing) return
    if (params.clothing === "tshirts") {
      return "T-Shirts"
    }
    return params.clothing.slice(0, 1).toUpperCase() + params.clothing.slice(1)
  }

  return (
    <>
      <section className="split-view ay-padding">
        <Categories />
        <div className="section-end">
          <ul className="breadcrumbs">
            <li>
              <a className="breadcrumb-link" href="#">Mans</a>
            </li>
            <li>
              <BreadcrumbArrow className="breadcrumb-arrow" />
              <a className="breadcrumb-link" href="#">Clothes</a>
            </li>
            <li>
              <BreadcrumbArrow className="breadcrumb-arrow" />
              <a className="breadcrumb-link" href="#">Shirts</a>
            </li>
          </ul>
          <div className="category-header">
            <h3 className="category-header-title">{title()}<span className="number__badge">{products.length}</span></h3>
            <div className="sorting-and-view">
              <div className="opener">
                <div className="opener-content">
                  <ShirtIcon className="opener-icon" />
                  <div>Review</div>
                  <SmallTriangleDown className="small-triangle-down" />
                </div>
              </div>
              <div className="opener">
                <div className="opener-content">
                  <Sorting className="opener-icon" />
                  <div>Sort</div>
                  <SmallTriangleDown className="small-triangle-down" />
                </div>
              </div>
            </div>
          </div>
          <FilterBar />
          <ul className="products-grid">
            {products.map(product => <Product product={product} key={product._id} setProductWithoutSize={setProductWithoutSize} />)}
          </ul>
        </div>
      </section>
      {productWithoutSize &&
        <AddToCartModal product={productWithoutSize} setProductWithoutSize={setProductWithoutSize} />
      }
    </>
  )
}