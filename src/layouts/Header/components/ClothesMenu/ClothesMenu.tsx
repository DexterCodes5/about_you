import { Link, useNavigate } from "react-router-dom"
import "./ClothesMenu.css"

export const ClothesMenu: React.FC<{ setClothesMenu: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  const navigate = useNavigate()

  const handleCategory = (category: string) => {
    navigate(category)
    props.setClothesMenu(false)
  }

  return (
    <div className="clothes-menu" onMouseEnter={() => props.setClothesMenu(true)} onMouseLeave={() => props.setClothesMenu(false)}>
      <div className="clothes-menu-wrapper">
        <div className="clothes-menu-triangle"></div>
        <div className="clothes-menu-wrapper2">
          <div className="ay-padding clothes-sections">
            <div>
              <p className="clothes-menu-p">SHOP BY CATEGORY</p>
              <ul className="clothes-menu-ul">
                <li>See all</li>
                <li>Underwear</li>
                <li onClick={() => handleCategory("tshirts")}>T-Shirts</li>
                <li>Suits and jackects</li>
                <li>Jeans</li>
                <li>Sweater and knitted cardigans</li>
                <li>Pants</li>
                <li>Swimwear and beachwear</li>
                <li>Sweatshirts</li>
                <li>Large sizes</li>
                <li>Jackets</li>
                <li>Coat</li>
                <li onClick={() => handleCategory("shirts")}>Shirts</li>
              </ul>
            </div>
            <div>
              <p className="clothes-menu-p">ACCENTS</p>
              <ul className="clothes-menu-ul2">
                <li>NEW</li>
                <li>Special occasions</li>
                <li>Popular</li>
                <li>Sustainability</li>
                <li>EXPLOSIVE</li>
                <li>Premium</li>
                <li>Recycle</li>
              </ul>
            </div>
            <div>
              <p className="clothes-menu-p">TOP BRANDS</p>
              <ul className="clothes-menu-ul3">
                <li>
                  <img src={"/brands/boss-orange.avif"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/boss.avif"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/dan-fox.webp"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/denim-culture.avif"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/denim-tom-tailor.webp"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/eton.webp"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/HUGO.avif"} alt="brand" />
                </li>
                <li>
                  <img src={"/brands/hollister.avif"} alt="brand" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}