import "./Header.css"
import { ReactComponent as QuestionIcon } from "../../icons/question.svg"
import signInIcon from "../../icons/sign_in.svg"
import favouriteIcon from "../../icons/favourite.svg"
import basketIcon from "../../icons/basket.svg"
import { ReactComponent as ArrowRightIcon } from "../../icons/arrow-right.svg"
import { ReactComponent as ArrowLeftIcon } from "../../icons/arrow-left.svg"
import { ReactComponent as SearchBarIcon } from "../../icons/search.svg"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { useEffect, useRef, useState } from "react"
import { ClothesMenu } from "./components/ClothesMenu/ClothesMenu"
import { Link, useNavigate } from "react-router-dom"
import { SignInOutDialog } from "./components/SignInOutDialog/SignInOutDialog"
import { useAuth } from "../../context/AuthContext"
import { useShoppingCart } from "../../context/ShoppingCartContext"

export const Header = () => {
  const auth = useAuth()
  console.log(auth)
  const cart = useShoppingCart()
  const windowDimensions = useWindowDimensions()
  const navigate = useNavigate()

  const [render, setRender] = useState(false)

  const [showUserLogo, setShowUserLogo] = useState(false)

  const headerCategories = useRef<HTMLUListElement>(null)
  const firstCategory = useRef<HTMLLIElement>(null)
  const lastCategory = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (auth.user) {
      setTimeout(() => {
        setShowUserLogo(true)
      }, 800)

    }
  }, [auth.user])

  const headerCategoriesPrev = () => {
    firstCategory.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    setTimeout(() => {
      setRender(!render)
    }, 500)
  }

  const headerCategoriesNext = () => {
    lastCategory.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    setTimeout(() => {
      setRender(!render)
    }, 500)
  }

  const isFirstCategoryInViewport = () => {
    if (!headerCategories.current || !firstCategory.current) return true

    if (firstCategory.current.getBoundingClientRect().x < -20) return false
    return true
  }

  const isLastCategoryInViewport = () => {
    if (!headerCategories.current || !lastCategory.current) return true
    const diff = (headerCategories.current.getBoundingClientRect().x + headerCategories.current.getBoundingClientRect().width)
      - (lastCategory.current.getBoundingClientRect().x + lastCategory.current.getBoundingClientRect().width)
    if (diff < -20) return false
    return true
  }

  const [clothesMenu, setClothesMenu] = useState(false)

  const clothesLabel = useRef<HTMLDivElement>(null)

  const onClothesMouseEnter = () => {
    setClothesMenu(true)
  }

  return (
    <header>
      <div className="campaign-banner">
        Find our SUMMER PROMOTION
      </div>
      <section className="header-meta-bar ay-padding">
        <div className="header-meta-bar-col">
          <QuestionIcon className="question-icon" />
          <div>
            Contact & Help
          </div>
        </div>
        <div className="header-meta-bar-col">
          <img src={require("../../icons/BG.png")} alt="BG" />
          <div className="header-meta-bar-text">
            BG
          </div>
        </div>
      </section>
      <section className="header-main ay-padding">
        <div className="gender-switch">
          <div className="gender-switch-btn gender-switch-btn-active">Woman</div>
          <div className="gender-switch-btn">Man</div>
          <div className="gender-switch-btn">Kids</div>
        </div>
        <Link to="/shirts">
          <div className="ay-logo">
            <div className="about-logo" style={{ marginRight: 2 }}>ABOUT</div>
            {!showUserLogo &&
              <div className="about-logo you-logo">
                YOU
                <img className="circle-logo" src={require("../../icons/about_you_logo_circle.png")} alt="Circle" />
              </div>
            }
            {showUserLogo &&
              <div className="ay-username">
                DIMITAR
                <img className="circle-logo" src={require("../../icons/about_you_logo_circle.png")} alt="Circle" />
              </div>
            }
          </div>
        </Link>
        <div className="meta-nav-items">
          <div className="meta-nav-item sign-in-out-mni">
            <img className="meta-nav-item-icon" src={signInIcon} alt="SignIn" />
            <div className="meta-nav-item-text">{auth.user ? auth.user.firstName : "Sign In"}</div>
            <SignInOutDialog />
          </div>
          <div className="meta-nav-item">
            <img className="meta-nav-item-icon" src={favouriteIcon} alt="Favourite" />
            <div className="meta-nav-item-text">Favourite</div>
          </div>
          <div className="meta-nav-item" onClick={() => navigate("/basket")}>
            <img className="meta-nav-item-basket-icon" src={basketIcon} alt="Favourite" />
            <div className="meta-nav-item-text">Basket</div>
            {cart.cartQuantity > 0 &&
              <div className="header-cart-quantity">{cart.cartQuantity}</div>
            }
          </div>
        </div>
      </section>
      <section className="header-navigation ay-padding">
        <div className="header-categories-container">
          {!isFirstCategoryInViewport() &&
            <div className="header-categories-next header-categories-previous" onClick={headerCategoriesPrev}>
              <ArrowLeftIcon className="arrow-right-icon" />
            </div>
          }
          <ul className="header-categories" ref={headerCategories}>
            <li className="header-category" ref={firstCategory}>
              <div className="header-category-label">
                Collections
              </div>
            </li>
            <li className="header-category" onMouseEnter={onClothesMouseEnter} onMouseLeave={() => setClothesMenu(false)}>
              <div className="header-category-label" ref={clothesLabel} style={{ backgroundColor: clothesMenu ? "rgb(242, 242, 242)" : undefined }}>
                Clothes
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Shoes
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Sport
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Accessories
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Premium
              </div>
            </li>
            <li className="header-category header-category-red">
              <div className="header-category-label">
                PROMOTIONS
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Top 100
              </div>
            </li>
            <li className="header-category">
              <div className="header-category-label">
                Brands
              </div>
            </li>
            <li className="header-category" ref={lastCategory}>
              <div className="header-category-label">
                Inspiration
              </div>
            </li>
          </ul>
          {!isLastCategoryInViewport() &&
            <div className="header-categories-next" onClick={headerCategoriesNext}>
              <ArrowRightIcon className="arrow-right-icon" />
            </div>
          }
        </div>
        <div className="header-searchbar">
          <div className="searchbar">
            <SearchBarIcon className="searchbar-icon" />
            <input className="searchbar-input" type="text" placeholder="Search for products, brands and more..." />
          </div>
        </div>
        {clothesMenu &&
          <ClothesMenu setClothesMenu={setClothesMenu} />
        }
      </section>
      <section className="header-delivery-banner ay-padding">
        <div className="banner__item">
          <img className="banner__item-icon" src={require("../../icons/cash_on_delivery_icon.webp")} alt="CashOnDelivery" />
          <div>CASH ON DELIVERY</div>
        </div>
        <div className="banner__item">
          <img className="banner__item-icon" src={require("../../icons/free-delivery-icon.avif")} alt="CashOnDelivery" />
          <div>FREE DELIVERY* AND RETURN</div>
        </div>
        <div className="banner__item">
          <img className="banner__item-icon" src={require("../../icons/right-of-return-icon.webp")} alt="CashOnDelivery" />
          <div>100 DAYS RIGHT OF RETURN</div>
        </div>
      </section>
    </header>
  )
}