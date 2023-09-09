import { useRef, useState } from "react"
import "./AuthenticationModal.css"
import { UserModel } from "../../models/UserModel"
import { ReactComponent as Tick } from "../../icons/tick2.svg"
import { Turnstile } from "@marsidev/react-turnstile"
import { ReactComponent as CloseIcon } from "../../icons/close.svg"
import { AuthModalLogin } from "./components/AuthModalLogin"
import { useAuth } from "../../context/AuthContext"

export const AuthenticationModal: React.FC<{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  const auth = useAuth()

  const [login, setLogin] = useState(false)

  const [user, setUser] = useState<UserModel>(new UserModel("", "", "", "", "male", false))

  const [showPassword, setShowPassword] = useState(false)

  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const authModal = useRef<HTMLDivElement>(null)

  const firstNameInput = useRef<HTMLInputElement>(null)
  const lastNameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const submitWithErrors = useRef(false)

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "firstName" && submitWithErrors.current) {
      if (value.length === 1) {
        setFirstNameError("Invalid first name")
      }
      else {
        setFirstNameError("")
      }
    }
    else if (name === "lastName" && submitWithErrors.current) {
      if (value.length === 1) {
        setLastNameError("Invalid last name")
      }
      else {
        setLastNameError("")
      }
    }
    else if (name === "email" && submitWithErrors.current) {
      if (value.length === 1) {
        setEmailError("Invalid email address")
      }
      else {
        setEmailError("")
      }
    }
    else if (name === "password" && submitWithErrors.current) {
      if (value.length < 6) {
        setPasswordError("Password must be between 6 and 20 characters")
      }
      else {
        setPasswordError("")
      }
    }

    setUser({ ...user, [name]: value })
  }

  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    let firstNameErrorB = false
    let lastNameErrorB = false
    let emailErrorB = false
    let passwordErrorB = false

    if (!firstNameInput.current?.value) {
      inputError(firstNameInput.current!, setFirstNameError, "Please enter your first name")
      firstNameErrorB = true
    }
    if (!lastNameInput.current?.value) {
      inputError(lastNameInput.current!, setLastNameError, "Please enter your last name")
      lastNameErrorB = true
    }
    if (!emailInput.current?.value) {
      inputError(emailInput.current!, setEmailError, "Please enter your email address")
      emailErrorB = true
    }
    if (!passwordInput.current?.value) {
      inputError(passwordInput.current!, setPasswordError, "Please enter your password")
      passwordErrorB = true
    }

    if (firstNameErrorB) {
      firstNameInput.current?.focus()
      authModal.current?.scrollTo(0, 0)
      return
    }
    else if (lastNameErrorB) {
      lastNameInput.current?.focus()
      authModal.current?.scrollTo(0, 0)
      return
    }
    else if (emailErrorB) {
      emailInput.current?.focus()
      authModal.current?.scrollTo(0, 100)
      return
    }
    else if (passwordErrorB) {
      passwordInput.current?.focus()
      authModal.current?.scrollTo(0, 100)
      return
    }

    // Register user
    try {
      auth.signUp(user)
      setLogin(true)
    } catch (err) {
      console.log(err)
    }
  }

  const inputError = (input: HTMLInputElement, setError: React.Dispatch<React.SetStateAction<string>>, errMsg: string) => {
    input.classList.add("auth-modal-input-error")
    setError(errMsg)
    submitWithErrors.current = true
  }

  return (
    <div className="auth-modal-background">
      <div className="auth-modal" ref={authModal}>
        <div className="auth-modal-top">
          Sign in
          <CloseIcon className="auth-modal-top-close" onClick={() => props.setIsOpen(false)} />
        </div>
        <div className="auth-modal-sign-options">
          <button className={`auth-modal-sign-option${!login ? " auth-modal-sign-option-active" : ""}`} onClick={() => setLogin(false)}>Sign up</button>
          <button className={`auth-modal-sign-option${login ? " auth-modal-sign-option-active" : ""}`} onClick={() => setLogin(true)}>Sign in</button>
        </div>
        {login ?
          <AuthModalLogin authModal={authModal} />
          :
          <form className="auth-modal-form">
            <div className="auth-modal-sign-up-row">
              <div className="auth-modal-input-wrapper">
                <input type="text" placeholder=" " className="auth-modal-input" name="firstName" onChange={changeUser} value={user.firstName}
                  ref={firstNameInput} />
                <p className="auth-modal-input-placeholder">First name</p>
                {firstNameError &&
                  <p className="auth-modal-input-error-text">{firstNameError}</p>
                }
              </div>
              <div className="auth-modal-input-wrapper">
                <input type="text" placeholder=" " className="auth-modal-input" name="lastName" onChange={changeUser} value={user.lastName}
                  ref={lastNameInput} />
                <p className="auth-modal-input-placeholder">Last name</p>
                {lastNameError &&
                  <p className="auth-modal-input-error-text">{lastNameError}</p>
                }
              </div>
            </div>
            <div className="auth-modal-sign-up-row">
              <div className="auth-modal-input-wrapper">
                <input type="text" placeholder=" " className="auth-modal-input" name="email" onChange={changeUser} value={user.email}
                  ref={emailInput} />
                <p className="auth-modal-input-placeholder">Your email address</p>
                {emailError &&
                  <p className="auth-modal-input-error-text">{emailError}</p>
                }
              </div>
              <div className="auth-modal-input-wrapper">
                <input type={showPassword ? "text" : "password"} placeholder=" " className="auth-modal-input" name="password" onChange={changeUser} value={user.password}
                  ref={passwordInput} />
                <p className="auth-modal-input-placeholder">Password (min. 6 characters)</p>
                {user.password &&
                  <p className="auth-modal-input-show" onClick={() => setShowPassword(!showPassword)}>SHOW</p>
                }
                {passwordError &&
                  <p className="auth-modal-input-error-text">{passwordError}</p>
                }
              </div>
            </div>
            <div className="auth-modal-gender-row">
              <p className="auth-modal-gender-text">How should we address you?</p>
              <div className="auth-modal-gender-radios">
                <label className="auth-modal-radio">
                  <input type="radio" name="gender" value="female" className="auth-modal-radio-input" checked={user.gender === "female"}
                    onChange={changeUser} />
                  <div className="auth-modal-radio-mask"></div>
                  <p className="auth-modal-radio-text">Ms.</p>
                </label>
                <label className="auth-modal-radio">
                  <input type="radio" name="gender" value="male" className="auth-modal-radio-input" checked={user.gender === "male"}
                    onChange={changeUser} />
                  <div className="auth-modal-radio-mask"></div>
                  <p className="auth-modal-radio-text">Mr.</p>
                </label>
                <label className="auth-modal-radio">
                  <input type="radio" name="gender" value="other" className="auth-modal-radio-input" checked={user.gender === "other"}
                    onChange={changeUser} />
                  <div className="auth-modal-radio-mask"></div>
                  <p className="auth-modal-radio-text">Other</p>
                </label>
              </div>
            </div>
            <label className="auth-modal-subscribe-to-newsletter">
              <input type="checkbox" className="auth-modal-subscribe-to-newsletter-checkbox" checked={user.emailUpdates} name="emailUpdates"
                onChange={(e) => setUser({ ...user, emailUpdates: e.target.checked })} />
              <div className="auth-modal-subscribe-to-newsletter-mask">
                <Tick className="auth-modal-subscribe-to-newsletter-mask-tick" />
              </div>
              <p className="auth-modal-subscribe-to-newsletter-text">I would like to receive email updates from ABOUT YOU about current trends, offers and vouchers. Cancel your subscription at any time, free of charge.</p>
            </label>
            <div className="auth-modal-turnstile-container">
              {/* <Turnstile siteKey="0x4AAAAAAAJVLc6z7EqaZjRR" /> */}
            </div>
            <div className="auth-modal-sign-up-btn-wrapper">
              <button className="auth-modal-sign-up-btn" onClick={signUp}>Sign up now</button>
            </div>
            <div className="auth-modal-legal-text">
              As with any online store, you will receive all the necessary information about the order from us by email. This includes order confirmation, delivery confirmation, returns information, testimonials). You can opt out of referrals at any time for free.
              <div>
                <a href="#" className="auth-modal-legal-text-a">Privacy policy</a>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  )
}