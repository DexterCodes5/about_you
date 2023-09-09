import { useRef, useState } from "react"
import "./AuthModalLogin.css"
import { Turnstile } from "@marsidev/react-turnstile"
import { useAuth } from "../../../context/AuthContext"

type LoginUser = {
  email: string,
  password: string
}

export const AuthModalLogin: React.FC<{ authModal: React.RefObject<HTMLDivElement> }> = (props) => {
  const auth = useAuth()

  const [loginUser, setLoginUser] = useState<LoginUser>({ email: "", password: "" })

  const [showPassword, setShowPassword] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [loginError, setLoginError] = useState(false)

  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const submitWithErrors = useRef(false)

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "email" && submitWithErrors.current) {
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

    setLoginUser({ ...loginUser, [name]: value })
  }

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let emailErrorB = false
    let passwordErrorB = false

    if (!emailInput.current?.value) {
      inputError(emailInput.current!, setEmailError, "Please enter your email address")
      emailErrorB = true
    }
    if (!passwordInput.current?.value) {
      inputError(passwordInput.current!, setPasswordError, "Please enter your password")
      passwordErrorB = true
    }

    if (emailErrorB) {
      emailInput.current?.focus()
      props.authModal.current?.scrollTo(0, 100)
      return
    }
    else if (passwordErrorB) {
      passwordInput.current?.focus()
      props.authModal.current?.scrollTo(0, 100)
      return
    }

    // Sign in
    try {
      await auth.signIn(loginUser.email, loginUser.password)
      auth.setIsOpen(false)
    } catch (err: any) {
      setLoginError(true)
    }
  }

  const inputError = (input: HTMLInputElement, setError: React.Dispatch<React.SetStateAction<string>>, errMsg: string) => {
    input.classList.add("auth-modal-input-error")
    setError(errMsg)
    submitWithErrors.current = true
  }

  return (
    <form className="auth-modal-form" autoComplete="on" onSubmit={signUp}>
      <div className="auth-modal-sign-up-row">
        <div className="auth-modal-input-wrapper">
          <input type="email" placeholder=" " autoComplete="email" className="auth-modal-input" name="email" onChange={changeUser} value={loginUser.email}
            ref={emailInput} />
          <p className="auth-modal-input-placeholder">Your email address</p>
          {emailError &&
            <p className="auth-modal-input-error-text">{emailError}</p>
          }
        </div>
        <div className="auth-modal-input-wrapper">
          <input type={showPassword ? "text" : "password"} placeholder=" " className="auth-modal-input" name="password" onChange={changeUser}
            value={loginUser.password}
            ref={passwordInput} />
          <p className="auth-modal-input-placeholder">Password (min. 6 characters)</p>
          {loginUser.password &&
            <p className="auth-modal-input-show" onClick={() => setShowPassword(!showPassword)}>SHOW</p>
          }
          {passwordError &&
            <p className="auth-modal-input-error-text">{passwordError}</p>
          }
        </div>
      </div>
      <p className="auth-modal-forgot-password">Forgot your password?</p>
      {loginError &&
        <p className="auth-modal-login-error">Your email address or password are incorrect. Please try again.</p>
      }
      <div className="auth-modal-turnstile-container">
        {/* <Turnstile siteKey="0x4AAAAAAAJVLc6z7EqaZjRR" /> */}
      </div>
      <div className="auth-modal-sign-up-btn-wrapper">
        <button className="auth-modal-sign-up-btn">Sign in now</button>
      </div>
    </form>
  )
}