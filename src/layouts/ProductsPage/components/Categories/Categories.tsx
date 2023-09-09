import { useParams } from "react-router-dom"
import "./Categories.css"

export const Categories = () => {
  const params = useParams()

  return (
    <div className="section-start">
      <a className="section-clothes-link section-clothes-link-active" href="#">Clothes</a>
      <ul className="categories__tree">
        <a href="#">NEW</a>
        <a href="#">Popular</a>
        <a href="#" className={params.clothing === "tshirts" ? "category-active" : undefined}>T-Shirts</a>
        {params.clothing === "tshirts" &&
          <ul className="categories__tree  categories__childtree">
            <a href="#">T-shirts with short sleeves</a>
            <a href="#">T-shirts with long sleeves</a>
            <a href="#">Polo t-shirts</a>
            <a href="#">Multipack</a>
            <a href="#">Tank tops</a>
          </ul>
        }
        <a href="#">Jeans</a>
        <a href="#">Pants</a>
        <a href="#">Sweatshirts</a>
        <a className={params.clothing === "shirts" ? "category-active" : undefined} href="#">Shirts</a>
        {params.clothing === "shirts" &&
          <ul className="categories__tree  categories__childtree">
            <a href="#">Everyday shirts</a>
            <a href="#">Bussiness shirts</a>
            <a href="#">Plaid shirts</a>
            <a href="#">Denim shirts</a>
          </ul>
        }
        <a href="#">Underwear</a>
        <a href="#">Suits and jackets</a>
        <a href="#">Sweaters and knitted cardigans</a>
        <a href="#">Swimwear and beachwear</a>
        <a href="#">Special occasions</a>
        <a href="#">Large sizes</a>
        <a href="#">Coats</a>
        <a href="#">EXPLOSIVE</a>
        <a href="#">Sustainability</a>
        <a href="#">Recycling</a>
      </ul>
      <a className="section-clothes-link" href="#">Shoes</a>
      <a className="section-clothes-link" href="#">Sport</a>
      <a className="section-clothes-link" href="#">Accessories</a>
      <a className="section-clothes-link" href="#">Premium</a>
      <a className="section-clothes-link" href="#" style={{ color: "rgb(231, 45, 52)" }}>PROMOTIONS</a>
      <a className="section-clothes-link" href="#">Top 100</a>
    </div>
  )
}