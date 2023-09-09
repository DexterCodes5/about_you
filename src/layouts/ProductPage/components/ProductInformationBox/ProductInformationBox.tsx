import { useState } from "react"
import { ProductModel } from "../../../../models/ProductModel"
import "./ProductInformationBox.css"

export const ProductInformationBox: React.FC<{ product: ProductModel }> = (props) => {

  const [infoSection, setInfoSection] = useState("Item details")

  const capitalizeFirstLetters = (text: string) => {
    if (!text) return

    let result = ""
    result += text[0].toUpperCase()
    for (let i = 1; i < text.length; i++) {
      if (text[i - 1] === ' ') {
        result += text[i].toUpperCase()
        continue
      }
      result += text[i]
    }

    return result
  }

  return (
    <div className="product-information-box">
      <div className="product-details">
        <h3 className="product-details-tab" style={{ color: infoSection === "Item details" ? "black" : undefined }}
          onClick={() => setInfoSection("Item details")}>Item details</h3>
        <h3 className="product-details-tab" style={{ color: infoSection === "Delivery and return" ? "black" : undefined }}
          onClick={() => setInfoSection("Delivery and return")}>Delivery and return</h3>
      </div>
      {infoSection === "Item details" &&
        <section className="infobox-split-view">
          <div className="infobox-section-start">
            <h3 className="item-details-h3">
              {props.product?.brand}&nbsp;{props.product?.title}&nbsp;in {capitalizeFirstLetters(props.product?.color)}
            </h3>
            <h3 className="item-details-h3" style={{ marginTop: 5 }}>
              Design & Characteristics
            </h3>
            <ul className="design-and-characteristics-ul">
              {props.product?.designAndCharacteristics.map(property =>
                <li key={property}>{property}</li>
              )}
            </ul>
            <p className="item-details-p">&#8470; of item {props.product?.number}</p>
            <div className="item-details-section">
              <h3 className="item-details-h3">Size and continue</h3>
              <p className="size_and_cut_p" style={{ marginTop: 10 }}>Sleeve length: {props.product?.sleeveLength}</p>
              {props.product?.length &&
                <p className="size_and_cut_p">Length: {props.product?.length}</p>
              }
              <p className="size_and_cut_p">Cut: {props.product?.cut}</p>
              {props.product?.model &&
                <p className="size_and_cut_p" style={{ marginTop: 10 }}>{props.product?.model}</p>
              }
              <button className="table-with-sizes-btn">Table with sizes</button>
            </div>
            <div className="item-details-section">
              <h3 className="item-details-h3">Composition & Support</h3>
              <p className="size_and_cut_p" style={{ marginTop: 14 }}>Material: {props.product?.material}</p>
              {props.product?.countryOfOrigin &&
                <p className="size_and_cut_p">Country of origin: {props.product?.countryOfOrigin}</p>
              }
              <ul className="product-support">
                {props.product?.support?.includes("Hand wash") &&
                  <li>
                    <img src={require("../../../../icons/hand_wash.avif")} alt="Icon" width="25" height="25" style={{ marginRight: 8 }} />
                    <p>Hand wash</p>
                  </li>
                }
                {props.product?.support?.includes("Not suitable for tumble drying") &&
                  <li>
                    <img src={require("../../../../icons/not_suitable_for_tumble_drying.avif")} alt="Icon" width="25" height="25" style={{ marginRight: 8 }} />
                    <p>Not suitable for tumble drying</p>
                  </li>
                }
                {props.product?.support?.includes("No dry cleaning") &&
                  <li>
                    <img src={require("../../../../icons/no_dry_cleaning.avif")} alt="Icon" width="25" height="25" style={{ marginRight: 8 }} />
                    <p>No dry cleaning</p>
                  </li>
                }
                {props.product?.support?.includes("Iron on medium high temperature") &&
                  <li>
                    <img src={require("../../../../icons/iron_on_medium_high_heat.avif")} alt="Icon" width="25" height="25" style={{ marginRight: 8 }} />
                    <p>Iron on medium high temperature</p>
                  </li>
                }
                {props.product?.support?.includes("Do not use bleach") &&
                  <li>
                    <img src={require("../../../../icons/do_not_use_bleach.avif")} alt="Icon" width="25" height="25" style={{ marginRight: 8 }} />
                    <p>Do not use bleach</p>
                  </li>
                }
              </ul>
            </div>
          </div>
          <div className="infobox-section-end">
            <div className="item-details-img-container">
              <img src={props.product?.img[0]} alt="Image" className="item-details-img" />
            </div>
          </div>
        </section>
      }
      {infoSection === "Delivery and return" &&
        <section className="dr-split-view">
          <div className="dr-section-start">
            <p className="dr-p">For orders over BGN 29.90, delivery is free. If the value of the order is lower, delivery charges of BGN 4.90 including VAT per order apply. For orders containing several products, it is possible, in some cases, to be delivered in more than one package.</p>
            <h3 className="dr-h3">Delivery with Econt</h3>
            <p className="dr-p">
              All available items can be delivered with our Econt partners within 4-6 working days.
            </p>
            <p className="dr-p">
              In case the return label is not attached to your shipment, you can order a new one by contacting our customer service department. For questions, please write to us at:
            </p>
            &gt;
            <div>
              <a href="#" className="cstsrv">customerservice@aboutyou.bg</a>
            </div>
          </div>
          <div className="dr-section-end">
            <div className="dr-img-container">
              <img className="dr-img" src={require("../../../../images/delivery.avif")} alt="delivery" />
              <div className="dr-img-div">
                <div className="dr-img-div2">
                  <p className="dr-img-p">Cash on delivery</p>
                  <p className="dr-img-p">Free delivery* and return</p>
                  <p className="dr-img-p">100 days right of return</p>
                  <a href="#" className="dr-img-а">Our service gurantee</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  )
}