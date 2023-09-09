import "./FooterBottom.css"
import { ReactComponent as AYLogo } from "../../../../icons/ay-logo.svg"

export const FooterBottom = () => {
  return (
    <>
    <div className="footer-contacts">
        <div className="footer-contacts-section">
          <a href="#">
            <AYLogo className="footer-ay-logo" />
          </a>
          <div className="footer-social-links">
            <a href="#">
              <img className="footer-social-link" src={require("../../../../icons/facebook.avif")} alt="SocialLink" />
            </a>
            <a href="#">
              <img className="footer-social-link" src={require("../../../../icons/instagram.avif")} alt="SocialLink" />
            </a>
            <a href="#">
              <img className="footer-social-link" src={require("../../../../icons/twitter.avif")} alt="SocialLink" />
            </a>
            <a href="#">
              <img className="footer-social-link" src={require("../../../../icons/youtube.avif")} alt="SocialLink" />
            </a>
            <a href="#">
              <img className="footer-social-link" src={require("../../../../icons/pinterest.avif")} alt="SocialLink" />
            </a>
          </div>
        </div>
        <div className="footer-contacts-section">
          <h4 className="footer-customer-service-h4">CUSTOMER SERVICE</h4>
          <a className="footer-customer-service-a" style={{ marginTop: "2rem" }} href="#">Help & Contact</a>
          <a className="footer-customer-service-a" href="#">Partner program</a>
          <a className="footer-customer-service-a" href="#">Collaborations with content creators</a>
          <a className="footer-customer-service-a" href="#">Zone for delivery</a>
        </div>
        <div className="footer-contacts-section">
          <h4 className="footer-customer-service-h4">SECURE SHOPPING</h4>
          <a className="footer-ssl-a" href="#">
            <img className="footer-ssl-img" src={require("../../../../icons/ssl.avif")} alt="SSL" />
            <span className="footer-ssl-span">Your data is safe with us</span>
          </a>
        </div>
        <div>
          <span className="footer-bottom-span-info">*Free delivery for orders above 29.90 BGN in all other cases the expenses for delivery are 4,90 BGN.</span>
          <span className="footer-bottom-span-info">**The lowest price during the last 30 days before the discount.</span>
          <span className="footer-bottom-span-info">****Free from all networks in Bulgaria. When calling from abroad taxes can be charged.</span>
          <span className="footer-bottom-span-info">******All prices with incl. VAT</span>
        </div>
      </div>
      <div className="footer-legal-links">
        <nav className="footer-legal-links-nav">
          <a href="#">For us</a>
          <a href="#">Media</a>
          <a href="#">Job positions</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Manage preferences (Manage consents)</a>
          <a href="#">General commercial conditions</a>
          <a href="#">Legal information</a>
        </nav>
        <span className="footer-copyright">&#169; 2023 ABOUT YOU SE & Co. KG</span>
      </div>
    </>
  )
}