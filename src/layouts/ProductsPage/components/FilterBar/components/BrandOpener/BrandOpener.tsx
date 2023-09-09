import "./BrandOpener.css"
import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as SearchBarIcon } from "../../../../../../icons/search.svg"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const BrandOpener: React.FC<{ 
  filter: string, windowDimensions: windowDimensions, handleOpenerClick: Function, brandOpener: React.RefObject<HTMLDivElement>, 
  brandOpenerBody: React.RefObject<HTMLDivElement>
 }> = (props) => {

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Brand")} ref={props.brandOpener}
        data-active={props.filter === "Brand"}>
        <div>Brand</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Brand" &&
        <div className={`opener-body ${props.windowDimensions.width < 790 ? " opener-body-right" : ""}`} ref={props.brandOpenerBody}>
          <div className="opener-body-brand-top">
            <div className="opener-body-brand-searchbar">
              <input className="opener-body-brand-searchbar-input" type="text" placeholder="Search by brand" />
              <SearchBarIcon className="opener-body-brand-searchbar-icon" />
            </div>
          </div>
          <div className="opener-body-brand-bottom">
            <div className="opener-body-heading">Most liked brands</div>
            <ul className="opener-body-brands">
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="brands/HUGO.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="brands/jack-and-jones.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/polo.webp" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/tommy-hilfiger.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/denim-culture.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="brands/boss.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/only-and-sons.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/boss-orange.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/eton.webp" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/tom-tailor.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/selected-homme.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/dan-fox.webp" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/tommy-jeans.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <label className="opener-body-brand-label">Polo Ralph Lauren Big & Tall</label>
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/denim-tom-tailor.webp" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/marc-o-polo.avif" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/we.webp" alt="Brand" />
              </button>
              <button className="opener-body-brand-btn">
                <img className="opener-body-brand-img" src="/brands/hollister.avif" alt="Brand" />
              </button>
            </ul>
          </div>
        </div>
      }
    </div>
  )
}