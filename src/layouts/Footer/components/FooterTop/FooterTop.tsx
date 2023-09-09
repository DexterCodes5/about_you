import "./FooterTop.css"

export const FooterTop = () => {
  return (
    <>
      <div className="footer-usp">
        <a className="footer-usp-a" href="#">
          <img className="footer-usp-img" src={require("../../../../icons/cash_on_delivery_icon.webp")} alt="Icon" />
          <span className="footer-usp-span">CASH ON DELIVERY</span>
        </a>
        <a className="footer-usp-a" href="#">
          <img className="footer-usp-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="Icon" />
          <span className="footer-usp-span">FREE DELIVERY* AND RETURN</span>
        </a>
        <a className="footer-usp-a" href="#">
          <img className="footer-usp-img" src={require("../../../../icons/right-of-return-icon.webp")} alt="Icon" />
          <span className="footer-usp-span">100 DAYS RIGHT TO RETURN</span>
        </a>
      </div>
      <div className="footer-payment-providers">
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/mastercard.avif")} alt="Card" />
        </a>
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/visa.avif")} alt="Card" />
        </a>
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/gpay.webp")} alt="Card" />
        </a>
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/apple_pay.avif")} alt="Card" />
        </a>
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/maestro.avif")} alt="Card" />
        </a>
        <a className="footer-payment-providers-a" href="#">
          <img className="footer-payment-providers-img" src={require("../../../../icons/cards/econt.avif")} alt="Card" />
        </a>
      </div>
    </>
  )
}