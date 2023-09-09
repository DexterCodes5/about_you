import "./SignInOutDialog.css"
import { ReactComponent as HeartBlack } from "../../../../icons/heart.svg"
import { useAuth } from "../../../../context/AuthContext"

export const SignInOutDialog = () => {
  const auth = useAuth()

  return (
    <div className="sign-in-out-dialog">
      <div className="sing-in-out-dialog-hvr">
      </div>
      <div className="sign-in-out-dialog-content">
        <img className="sign-in-out-triangle" src={require("../../../../icons/shadow-triangle.png")} alt="triangle" />
        {auth.user ?
          <div className="sign-in-out-dialog-content2" style={{ paddingTop: 8 }}>
            <div className="sign-in-out-dialog-row">
              <img className="sign-in-out-dialog-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="icon" width="24"
                height="24" />
              <p className="sign-in-out-dialog-p2">Your orders</p>
            </div>
            <div className="sign-in-out-dialog-row">
              <img className="sign-in-out-dialog-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="icon" width="24"
                height="24" />
              <p className="sign-in-out-dialog-p2">Profile and security</p>
            </div>
            <div className="sign-in-out-dialog-row">
              <img className="sign-in-out-dialog-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="icon" width="24"
                height="24" />
              <p className="sign-in-out-dialog-p2">Settings</p>
            </div>
            <div className="sign-in-out-dialog-row">
              <img className="sign-in-out-dialog-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="icon" width="24"
                height="24" />
              <p className="sign-in-out-dialog-p2">Help</p>
            </div>
            <div className="sign-in-out-dialog-sign-out" onClick={() => auth.signOut()}>
              Sign out
            </div>
          </div>
          :
          <div className="sign-in-out-dialog-content2">
            <div className="sign-in-out-dialog-top">
              <h1 className="sign-in-out-dialog-h1">Already not signed up</h1>
              <div className="sign-in-out-btn-container">
                <button className="sign-in-out-btn" onClick={() => auth.setIsOpen(true)}>Sign in</button>
              </div>
            </div>
            <div className="sign-in-out-dialog-top">
              <div className="siodps">
                <div className="sign-in-out-dialog-option">
                  <img className="sign-in-out-dialog-img" src={require("../../../../icons/free-delivery-icon.avif")} alt="icon" width="30"
                    height="30" />
                  <p className="sign-in-out-dialog-p">Track your<br /> order</p>
                </div>
                <div className="sign-in-out-dialog-option">
                  <HeartBlack width="30" height="30" />
                  <p className="sign-in-out-dialog-p">Like your<br /> favourites</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}