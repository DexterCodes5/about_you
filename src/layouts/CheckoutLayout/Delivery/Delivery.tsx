import "./Delivery.css"
import { ReactComponent as HomeDelivery } from "../../../icons/homeDelivery.svg"
import { ReactComponent as HomeDeliveryActive } from "../../../icons/homeDeliveryActive.svg"
import { ReactComponent as CollectionPoint } from "../../../icons/collectionPoint.svg"
import { ReactComponent as CollectionPointActive } from "../../../icons/collectionPointActive.svg"
import { ReactComponent as ChevronDown } from "../../../icons/chevronDown.svg"
import { ReactComponent as BG } from "../../../icons/bg.svg"
import { useEffect, useRef, useState } from "react"
import { AddressModel } from "../../../models/AddressModel"
import axios from "axios"
import { useAuth } from "../../../context/AuthContext"

const NAME_REGEX = /^[a-zA-z .-]+$/
const CITY_REGEX = /^[a-zA-z .-]+$/
const POSTCODE_REGEX = /^\d{4,}$/
const STREET_OR_NEIGHBORHOOD_REGEX = /^[a-zA-z\d .,-]+$/
const NUMBER_REGEX = /^\d+$/
const DATE_OF_BIRTH_REGEX = /^\d{0,8}$/
const DATE_OF_BIRTH_COMPLETED_REGEX = /^\d{8}$/

export const Delivery = () => {
  const auth = useAuth()

  const [render, setRender] = useState(false)

  const [delivery, setDelivery] = useState("home")

  const [address, setAddress] = useState(new AddressModel("Mr", "", "", "", "", "", "", "", auth.user?._id!))

  const [showGenderMenu, setShowGenderMenu] = useState(false)
  const [showCountryMenu, setShowCountryMenu] = useState(false)

  const [nameInputError, setNameInputError] = useState("")
  const [surnameInputError, setSurnameInputError] = useState("")
  const [cityInputError, setCityInputError] = useState("")
  const [postcodeInputError, setPostcodeInputError] = useState("")
  const [streetOrNeighborhoodInputError, setStreetOrNeighborhoodInputError] = useState("")
  const [numberInputError, setNumberInputError] = useState("")
  const [additionalInformationInputError, setAdditionalInformationInputError] = useState("")
  const [dateOfBirthInputError, setDateOfBirthInputError] = useState("")

  const [nameInputSuccess, setNameInputSuccess] = useState(false)
  const [surnameInputSuccess, setSurnameInputSuccess] = useState(false)
  const [cityInputSuccess, setCityInputSuccess] = useState(false)
  const [postcodeInputSuccess, setPostcodeInputSuccess] = useState(false)
  const [streetOrNeighborhoodInputSuccess, setStreetOrNeighborhoodInputSuccess] = useState(false)
  const [numberInputSuccess, setNumberInputSuccess] = useState(false)
  const [additionalInformationInputSuccess, setAdditionalInformationInputSuccess] = useState(false)
  const [dateOfBirthInputSuccess, setDateOfBirthInputSuccess] = useState(false)

  const genderSelect = useRef<HTMLButtonElement>(null)
  const genderMenu = useRef<HTMLUListElement>(null)

  const countrySelect = useRef<HTMLButtonElement>(null)
  const countryMenu = useRef<HTMLUListElement>(null)

  const nameInputBlur = useRef(false)
  const surnameInputBlur = useRef(false)
  const cityInputBlur = useRef(false)
  const postcodeInputBlur = useRef(false)
  const streetOrNeighborhoodInputBlur = useRef(false)
  const numberInputBlur = useRef(false)
  const additionalInformationInputBlur = useRef(false)
  const dateOfBirthInputBlur = useRef(false)

  const dateOfBirthCursor = useRef(0)

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [showGenderMenu])

  useEffect(() => {
    const dateOfBirthInput = document.getElementById("date-of-birth-input") as HTMLInputElement
    dateOfBirthInput.setSelectionRange(dateOfBirthCursor.current, dateOfBirthCursor.current)
  }, [address.dateOfBirth, render])

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/addresses/${auth.user!._id}`)
        setAddress(res.data)
      } catch (err: any) {
        console.log(err)
      }
    }
    getAddress()
  }, [])

  const onMouseDown = (e: any) => {
    if (!genderSelect.current?.contains(e.target) && !genderMenu.current?.contains(e.target) && showGenderMenu) {
      setShowGenderMenu(false)
    }

    // console.log(!countrySelect.current?.contains(e.target) && !countryMenu.current?.contains(e.target) && showCountryMenu)
    if (!countrySelect.current?.contains(e.target) && !countryMenu.current?.contains(e.target) && showCountryMenu) {
      setShowCountryMenu(false)
    }
  }

  const genderMenuItem = (gender: string) => {
    setAddress({ ...address, gender })
    setShowGenderMenu(false)
  }

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "name" && nameInputBlur.current) {
      inputSuccessOrError(value, NAME_REGEX, e.target.placeholder, setNameInputError, setNameInputSuccess)
    }
    else if (name === "surname" && surnameInputBlur.current) {
      inputSuccessOrError(value, NAME_REGEX, e.target.placeholder, setSurnameInputError, setSurnameInputSuccess)
    }
    else if (name === "city" && cityInputBlur.current) {
      inputSuccessOrError(value, CITY_REGEX, e.target.placeholder, setCityInputError, setCityInputSuccess)
    }
    else if (name === "postcode" && postcodeInputBlur.current) {
      inputSuccessOrError(value, POSTCODE_REGEX, e.target.placeholder, setPostcodeInputError, setPostcodeInputSuccess)
    }
    else if (name === "streetOrNeighborhood" && streetOrNeighborhoodInputBlur.current) {
      inputSuccessOrError(value, STREET_OR_NEIGHBORHOOD_REGEX, e.target.placeholder, setStreetOrNeighborhoodInputError, setStreetOrNeighborhoodInputSuccess)
    }
    else if (name === "number" && numberInputBlur.current) {
      inputSuccessOrError(value, NUMBER_REGEX, e.target.placeholder, setNumberInputError, setNumberInputSuccess)
    }
    else if (name === "additionalInformation" && additionalInformationInputBlur.current) {
      additionalInformationSuccess(value)
    }

    setAddress({ ...address, [name]: value })
  }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, placeholder } = e.target

    if (e.target.name === "name") {
      inputSuccessOrError(e.target.value, NAME_REGEX, e.target.placeholder, setNameInputError, setNameInputSuccess)
      nameInputBlur.current = true
    }
    else if (e.target.name === "surname") {
      inputSuccessOrError(e.target.value, NAME_REGEX, e.target.placeholder, setSurnameInputError, setSurnameInputSuccess)
      surnameInputBlur.current = true
    }
    else if (name === "city") {
      inputSuccessOrError(value, CITY_REGEX, placeholder, setCityInputError, setCityInputSuccess)
      cityInputBlur.current = true
    }
    else if (name === "postcode") {
      inputSuccessOrError(value, POSTCODE_REGEX, placeholder, setPostcodeInputError, setPostcodeInputSuccess)
      postcodeInputBlur.current = true
    }
    else if (name === "streetOrNeighborhood") {
      inputSuccessOrError(value, STREET_OR_NEIGHBORHOOD_REGEX, placeholder, setStreetOrNeighborhoodInputError, setStreetOrNeighborhoodInputSuccess)
      streetOrNeighborhoodInputBlur.current = true
    }
    else if (name === "number") {
      inputSuccessOrError(value, NUMBER_REGEX, placeholder, setNumberInputError, setNumberInputSuccess)
      numberInputBlur.current = true
    }
    else if (name === "additionalInformation") {
      additionalInformationSuccess(value)
      additionalInformationInputBlur.current = true
    }
    else if (name === "dateOfBirth") {
      inputSuccessOrError(value.replaceAll("_", "").replaceAll(".", ""), DATE_OF_BIRTH_COMPLETED_REGEX, placeholder, setDateOfBirthInputError, setDateOfBirthInputSuccess)
      dateOfBirthInputBlur.current = true
    }
  }

  const inputSuccessOrError = (value: string, regex: RegExp, placeholder: string, setInputError: React.Dispatch<React.SetStateAction<string>>,
    setInputSuccess: React.Dispatch<React.SetStateAction<boolean>>) => {

    if (!value) {
      setInputError(`${placeholder} is mandatory`)
      setInputSuccess(false)
    }
    else if (!regex.test(value)) {
      setInputError(`${placeholder} is invalid`)
      setInputSuccess(false)
    }
    else {
      setInputError("")
      setInputSuccess(true)
    }
  }

  const additionalInformationSuccess = (value: string) => {
    if (value) {
      setAdditionalInformationInputSuccess(true)
    }
    else {
      setAdditionalInformationInputSuccess(false)
    }
  }

  const dateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, placeholder } = e.target
    
    // check to see if user input is only numbers
    let data = value.replaceAll("_", "").replaceAll(".", "")
    if (!DATE_OF_BIRTH_REGEX.test(data)) {
      const input = (e.target as HTMLInputElement)
      dateOfBirthCursor.current = input.selectionStart!-1
      setRender(!render)
      return
    }

    adjustDateOfBirthCursor(data, e.target)

    if (dateOfBirthInputBlur.current && data.length === 8) {
      dateOfBirthError(data, placeholder)
    }

    value = addFormatToData(data, e)

    setAddress({ ...address, dateOfBirth: value })
  }

  const addFormatToData = (data: string, e: React.ChangeEvent) => {
    const format = "__.__.____"
    let formatLeft = ""

    if (data.length <= 2) {
      formatLeft = format.slice(data.length)
    }
    else if (data.length <= 4) {
      data = data.slice(0, 2) + "." + data.slice(2)
      formatLeft = format.slice(data.length)
    }
    else {
      data = data.slice(0, 2) + "." + data.slice(2, 4) + "." + data.slice(4)
      formatLeft = format.slice(data.length)
    }

    return data.concat(formatLeft)
  }

  const adjustDateOfBirthCursor = (data: string, input: HTMLInputElement) => {
    let selectionStart = input.selectionStart!

    if (data.length < address.dateOfBirth.replaceAll("_", "").replaceAll(".", "").length) {   
      if (selectionStart === 3) {
        selectionStart--
      }
      else if (selectionStart === 6) {
        selectionStart--
      }
      dateOfBirthCursor.current = selectionStart
      return
    }
    if (selectionStart === 3) {
      selectionStart++
    }
    else if (selectionStart === 6) {
      selectionStart++
    }
    dateOfBirthCursor.current = selectionStart
  }

  const dateOfBirthError = (data: string, placeholder: string) => {
    const ddS = data.slice(0, 2)
    const mmS = data.slice(2, 4)
    const yyyyS = data.slice(4)
    const dd = Number(ddS)
    const mm = Number(mmS)
    const yyyy = Number(yyyyS)
    const currYear = new Date().getFullYear()

    if (yyyy > currYear || yyyy < currYear - 100) {
      setDateOfBirthInputError(`${placeholder} is invalid`)
      setDateOfBirthInputSuccess(false)
      return
    }

    if (mm > 12) {
      setDateOfBirthInputError(`${placeholder} is invalid`)
      setDateOfBirthInputSuccess(false)
      return
    }

    if ((mm === 1 || mm === 3 || mm === 5 || mm === 7 || mm === 8 || mm === 10 || mm === 12) && dd <= 31) {
      setDateOfBirthInputError("")
      setDateOfBirthInputSuccess(true)
    }
    else if ((mm === 4 || mm === 6 || mm === 9 || mm === 11) && dd <= 30) {
      setDateOfBirthInputError("")
      setDateOfBirthInputSuccess(true)
    }
    else if (mm === 2 && ((yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0) && dd <= 29) {
      // Leap year
      setDateOfBirthInputError("")
      setDateOfBirthInputSuccess(true)
    }
    else if (mm === 2 && !((yyyy % 4 === 0 && yyyy % 100 === 0) || yyyy % 400 === 0) && dd <= 28) {
      setDateOfBirthInputError("")
      setDateOfBirthInputSuccess(true)
    }
    else {
      setDateOfBirthInputError(`${placeholder} is invalid`)
      setDateOfBirthInputSuccess(false)
    }
  }

  const dateOfBirthOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = (e.target as HTMLInputElement)

    let dataLength = address.dateOfBirth.replaceAll("_", "").replaceAll(".", "").length
    if (dataLength > 2) dataLength++
    if (dataLength > 4) dataLength++
    if (input.selectionStart! > dataLength) {
      input.setSelectionRange(dataLength, dataLength)
    }
  }

  const dateOfBirthOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowRight") {
      return
    }
    
    const input = (e.target as HTMLInputElement)
    const selectionStart = input.selectionStart!
    let dataLength = address.dateOfBirth.replaceAll("_", "").replaceAll(".", "").length
    if (dataLength > 2) dataLength++
    if (dataLength > 4) dataLength++

    if (selectionStart >= dataLength) {
      input.setSelectionRange(dataLength-1, dataLength-1)
    }
  }

  const submitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nameInputError || surnameInputError || cityInputError || postcodeInputError || streetOrNeighborhoodInputError || numberInputError
      || additionalInformationInputError || dateOfBirthInputError) {
      return
    }
    
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/addresses`, address)
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div className="delivery">
      <h2 className="checkout-main-headline">Delivery details</h2>
      <h3 className="checkout-sub-headline">Where to deliver?</h3>
      <div className="delivery-options">
        <button className={`delivery-option${delivery === "home" ? " delivery-option-active" : ""}`}
          onClick={() => setDelivery("home")}>
          {delivery === "home" ?
            <HomeDeliveryActive className="delivery-option-icon" />
            :
            <HomeDelivery className="delivery-option-icon" />
          }
          <p className={`delivery-option-text${delivery === "home" ? " delivery-option-text-active" : ""}`}>Delivery to home</p>
        </button>
        <button className={`delivery-option${delivery === "econt" ? " delivery-option-active" : ""}`}
          onClick={() => setDelivery("econt")}>
          {delivery === "econt" ?
            <CollectionPointActive className="delivery-option-icon" />
            :
            <CollectionPoint className="delivery-option-icon" />
          }
          <p className={`delivery-option-text${delivery === "econt" ? " delivery-option-text-active" : ""}`}>Econt office</p>
        </button>
      </div>
      <h3 className="checkout-sub-headline" style={{ marginBottom: 10 }}>Delivery address</h3>
      <form className="delivery-address-form" onSubmit={submitAddress}>
        <button className="address-book-btn">Address book</button>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container delivery-select-container">
            <button className="delivery-select" onClick={() => setShowGenderMenu(!showGenderMenu)} ref={genderSelect}>
              <p className="delivery-select-text">{address.gender}</p>
              <ChevronDown className="delivery-select-icon" />
            </button>
            {showGenderMenu &&
              <ul className="delivery-select-gender-menu" ref={genderMenu}>
                <li className={address.gender === "Mss" ? "delivery-select-gender-item-active" : undefined}
                  onClick={() => genderMenuItem("Mss")}>Mss</li>
                <li className={address.gender === "Mr" ? "delivery-select-gender-item-active" : undefined}
                  onClick={() => genderMenuItem("Mr")}>Mr</li>
                <li className={address.gender === "Other" ? "delivery-select-gender-item-active" : undefined}
                  onClick={() => genderMenuItem("Other")}>Other</li>
              </ul>
            }
          </div>
          <div className="delivery-form-field-container delivery-select-container">
            <button className="delivery-select" onClick={() => setShowCountryMenu(!showCountryMenu)} ref={countrySelect}>
              <div className="delivery-select-label">
                <BG className="delivery-select-cntr" />
                <p className="delivery-select-text">BG</p>
              </div>
              <ChevronDown className="delivery-select-icon" />
            </button>
            {showCountryMenu &&
              <ul className="delivery-select-gender-menu" ref={countryMenu}>
                <li className="delivery-select-label delivery-select-gender-item-active">
                  <BG className="delivery-select-cntr" />
                  <p className="delivery-select-text">BG</p>
                </li>
              </ul>
            }
          </div>
        </div>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container">
            <input type="text" placeholder="Name" className={`delivery-form-input${nameInputError ? " delivery-form-input-error" : ""}
            ${nameInputSuccess ? " delivery-form-input-success" : ""}`}
              name="name" value={address.name} onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Name</label>
            {nameInputError &&
              <p className="delivery-from-input-error-text">{nameInputError}</p>
            }
          </div>
          <div className="delivery-form-field-container">
            <input type="text" placeholder="Surname"
              className={`delivery-form-input${surnameInputError ? " delivery-form-input-error" : ""} 
              ${surnameInputSuccess ? " delivery-form-input-success" : ""}`} name="surname" value={address.surname}
              onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Surname</label>
            {surnameInputError &&
              <p className="delivery-from-input-error-text">{surnameInputError}</p>
            }
          </div>
        </div>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container" style={{ flex: "2 1 0%" }}>
            <input type="text" placeholder="City"
              className={`delivery-form-input${cityInputError ? " delivery-form-input-error" : ""}
              ${cityInputSuccess ? " delivery-form-input-success" : ""}`}
              name="city" value={address.city} onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">City</label>
            {cityInputError &&
              <p className="delivery-from-input-error-text">{cityInputError}</p>
            }
          </div>
          <div className="delivery-form-field-container">
            <input type="text" placeholder="Postcode"
              className={`delivery-form-input${postcodeInputError ? " delivery-form-input-error" : ""}
              ${postcodeInputSuccess ? " delivery-form-input-success" : ""}`}
              name="postcode" value={address.postcode}
              onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Postcode</label>
            {postcodeInputError &&
              <p className="delivery-from-input-error-text">{postcodeInputError}</p>
            }
          </div>
        </div>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container" style={{ flex: "3 1 0%" }}>
            <input type="text" placeholder="Street or neighborhood"
              className={`delivery-form-input${streetOrNeighborhoodInputError ? " delivery-form-input-error" : ""}
              ${streetOrNeighborhoodInputSuccess ? " delivery-form-input-success" : ""}`} name="streetOrNeighborhood"
              value={address.streetOrNeighborhood} onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Street or neighborhood</label>
            {streetOrNeighborhoodInputError &&
              <p className="delivery-from-input-error-text">{streetOrNeighborhoodInputError}</p>
            }
          </div>
          <div className="delivery-form-field-container">
            <input type="text" placeholder="Number"
              className={`delivery-form-input${numberInputError ? " delivery-form-input-error" : ""}
              ${numberInputSuccess ? " delivery-form-input-success" : ""}`}
              name="number" value={address.number}
              onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Number</label>
            {numberInputError &&
              <p className="delivery-from-input-error-text">{numberInputError}</p>
            }
          </div>
        </div>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container">
            <input type="text" placeholder="Additional information (Optional)"
              className={`delivery-form-input${additionalInformationInputError ? " delivery-form-input-error" : ""}
              ${additionalInformationInputSuccess ? " delivery-form-input-success" : ""}`} name="additionalInformation"
              value={address.additionalInfo} onChange={changeAddress} onBlur={onInputBlur} />
            <label className="delivery-form-label">Additional information (Optional)</label>
            {additionalInformationInputError &&
              <p className="delivery-from-input-error-text">{additionalInformationInputError}</p>
            }
          </div>
        </div>
        <div className="delivery-form-row">
          <div className="delivery-form-field-container">
            <input id="date-of-birth-input" type="text" placeholder="Date of birth (DD.MM.YYYY)"
              className={`delivery-form-input${dateOfBirthInputError ? " delivery-form-input-error" : ""}
              ${dateOfBirthInputSuccess ? " delivery-form-input-success" : ""}`} name="dateOfBirth"
              value={address.dateOfBirth} onChange={dateOfBirthChange} onBlur={onInputBlur} onClick={dateOfBirthOnClick}
              onKeyDown={dateOfBirthOnKeyDown} />
            <label className="delivery-form-label">Date of birth (DD.MM.YYYY)</label>
            {dateOfBirthInputError &&
              <p className="delivery-from-input-error-text">{dateOfBirthInputError}</p>
            }
          </div>
        </div>
        <div className="delivery-form-row delivery-form-row-btns">
          <button className="delivery-prev-step" type="button">Previous step</button>
          <button className="delivery-next-step">Continue to payment</button>
        </div>
      </form>
    </div>
  )
}