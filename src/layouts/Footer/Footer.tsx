import { useState } from "react"
import "./Footer.css"
import { FooterCategories } from "./components/FooterCategories/FooterCategories"
import { FooterTop } from "./components/FooterTop/FooterTop"
import { FooterBottom } from "./components/FooterBottom/FooterBottom"

export const Footer = () => {
  const [gender, setGender] = useState("man")

  return (
    <footer className="footer">
      <FooterTop />
      <div className="footer-dont-miss">
        <h1 className="footer-dont-miss-h1">Don't miss out!</h1>
        <span className="footer-dont-miss-span">Subscribe to our newsletter and we can inform you for exclusive offers</span>
        <form className="footer-form" action="POST">
          <div className="footer-gender-radios">
            <label className="footer-radio-label">
              <input className="footer-radio" type="radio" checked={gender === "man"} onChange={() => setGender("man")} />
              <div className="footer-radio-mask"></div>
              <span className="footer-radio-span">For man</span>
            </label>
            <label className="footer-radio-label">
              <input className="footer-radio" type="radio" checked={gender === "woman"} onChange={() => setGender("woman")} />
              <div className="footer-radio-mask"></div>
              <span className="footer-radio-span">For woman</span>
            </label>
          </div>
          <div className="footer-email">
            <input className="footer-email-input" type="text" placeholder="Your email address" />
            <span className="footer-email-span">Your email address</span>
          </div>
          <button className="footer-subscribe-btn">Subscribe</button>
          <span className="footer-subscribe-span" style={{ marginTop: "2rem" }}>I want to receive updates by email for current trends, offers and vouchers.</span>
          <span className="footer-subscribe-span">Unsubscribe for free and at any time.</span>
        </form>
      </div>
      <div className="footer-hr"></div>
      <FooterCategories />
      <div className="footer-hr"></div>
      <FooterBottom />
    </footer>
  )
}