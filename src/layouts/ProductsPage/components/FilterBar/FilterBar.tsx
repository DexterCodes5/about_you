import { useEffect, useRef, useState } from "react"
import "./FilterBar.css"
import { ReactComponent as BreadcrumbArrow } from "../../../../icons/arrow-right.svg"
import { ReactComponent as RestartIcon } from "../../../../icons/restart.svg"
import { SizeOpener } from "./components/SizeOpener/SizeOpener"
import { ColorOpener } from "./components/ColorOpener/ColorOpener"
import { BrandOpener } from "./components/BrandOpener/BrandOpener"
import { PriceOpener } from "./components/PriceOpener/PriceOpener"
import { SpecialSizesOpener } from "./components/SpecialSizesOpener/SpecialSizesOpener"
import useWindowDimensions from "../../../../hooks/useWindowDimensions"
import { MaterialOpener } from "./components/MaterialOpener/MaterialOpener"
import { ModelsOpener } from "./components/ModelsOpener/ModelsOpener"
import { SustainabilityOpener } from "./components/SustainabilityOpener/SustainabilityOpener"
import { CutOpener } from "./components/CutOpener/CutOpener"
import { ShirtCollarOpener } from "./components/ShirtCollarOpener/ShirtCollarOpener"
import { SleeveLengthOpener } from "./components/SleeveLengthOpener/SleeveLengthOpener"

export const FilterBar = () => {
  const windowDimensions = useWindowDimensions();

  const [filter, setFilter] = useState("")

  const [promotions, setPromotions] = useState(false)

  const [moreFilters, setMoreFilters] = useState(false)

  const sizeOpener = useRef<HTMLDivElement>(null)
  const sizeOpenerBody = useRef<HTMLDivElement>(null)

  const colorOpener = useRef<HTMLDivElement>(null)
  const colorOpenerBody = useRef<HTMLDivElement>(null)

  const brandOpener = useRef<HTMLDivElement>(null)
  const brandOpenerBody = useRef<HTMLDivElement>(null)

  const priceOpener = useRef<HTMLDivElement>(null)
  const priceOpenerBody = useRef<HTMLDivElement>(null)

  const specialSizesOpener = useRef<HTMLDivElement>(null)
  const specialSizesOpenerBody = useRef<HTMLDivElement>(null)

  const materialOpener = useRef<HTMLDivElement>(null)
  const materialOpenerBody = useRef<HTMLDivElement>(null)

  const modelsOpener = useRef<HTMLDivElement>(null)
  const modelsOpenerBody = useRef<HTMLDivElement>(null)

  const sustainabilityOpener = useRef<HTMLDivElement>(null)
  const sustainabilityOpenerBody = useRef<HTMLDivElement>(null)

  const cutOpener = useRef<HTMLDivElement>(null)
  const cutOpenerBody = useRef<HTMLDivElement>(null)

  const shirtCollarOpener = useRef<HTMLDivElement>(null)
  const shirtCollarOpenerBody = useRef<HTMLDivElement>(null)

  const sleeveLengthOpener = useRef<HTMLDivElement>(null)
  const sleeveLengthOpenerBody = useRef<HTMLDivElement>(null)

  const handleOpenerClick = (name: string) => {
    if (filter === name) {
      closeOpenerBody(name)
      return
    }
    setFilter(name)
  }

  const onMouseDown = (e: any) => {
    // If the user clicked in one of the openers return
    if ((sizeOpener.current?.contains(e.target) || sizeOpenerBody.current?.contains(e.target))
        || (colorOpener.current?.contains(e.target) || colorOpenerBody.current?.contains(e.target))
        || (brandOpener.current?.contains(e.target) || brandOpenerBody.current?.contains(e.target))
        || (priceOpener.current?.contains(e.target) || priceOpenerBody.current?.contains(e.target))
        || (specialSizesOpener.current?.contains(e.target) || specialSizesOpenerBody.current?.contains(e.target))
        || (materialOpener.current?.contains(e.target) || materialOpenerBody.current?.contains(e.target))
        || (modelsOpener.current?.contains(e.target) || modelsOpenerBody.current?.contains(e.target))
        || (sustainabilityOpener.current?.contains(e.target) || sustainabilityOpenerBody.current?.contains(e.target))
        || (cutOpener.current?.contains(e.target) || cutOpenerBody.current?.contains(e.target))
        || (shirtCollarOpener.current?.contains(e.target) || shirtCollarOpenerBody.current?.contains(e.target))
        || (sleeveLengthOpener.current?.contains(e.target) || sleeveLengthOpenerBody.current?.contains(e.target))) {
      return
    }
    // Else close the opener
    if (filter) {
      closeOpenerBody(filter)
    }
  }

  const closeOpenerBody = (name: string) => {
    const animation = "200ms ease-in 0s 1 normal none running fadeExit"
    if (name === "Size") {
      sizeOpenerBody.current!.style.animation = animation
    }
    else if (name === "Color") {
      colorOpenerBody.current!.style.animation = animation
    }
    else if (name === "Brand") {
      brandOpenerBody.current!.style.animation = animation
    }
    else if (name === "Price") {
      priceOpenerBody.current!.style.animation = animation
    }
    else if (name === "Special Sizes") {
      specialSizesOpenerBody.current!.style.animation = animation
    }
    else if (name === "Material") {
      materialOpenerBody.current!.style.animation = animation
    }
    else if (name === "Models") {
      modelsOpenerBody.current!.style.animation = animation
    }
    else if (name === "Sustainability") {
      sustainabilityOpenerBody.current!.style.animation = animation
    }
    else if (name === "Cut") {
      cutOpenerBody.current!.style.animation = animation
    }
    else if (name === "Shirt collar") {
      shirtCollarOpenerBody.current!.style.animation = animation
    }
    else if (name === "Sleeve Length") {
      sleeveLengthOpenerBody.current!.style.animation = animation
    }
    setTimeout(() => setFilter(""), 180)
  }

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [filter])

  return (
    <div className="filterbar-wrapper">
      <div className="filterbar" style={{ flexWrap: moreFilters ? "wrap" : undefined }}>
        <SizeOpener filter={filter} handleOpenerClick={handleOpenerClick} sizeOpener={sizeOpener}
          sizeOpenerBody={sizeOpenerBody} />
        <ColorOpener filter={filter} handleOpenerClick={handleOpenerClick} colorOpener={colorOpener} colorOpenerBody={colorOpenerBody} />
        <BrandOpener filter={filter} windowDimensions={windowDimensions} handleOpenerClick={handleOpenerClick} brandOpener={brandOpener} brandOpenerBody={brandOpenerBody} />
        <PriceOpener filter={filter} handleOpenerClick={handleOpenerClick} priceOpener={priceOpener} priceOpenerBody={priceOpenerBody}
          windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <div className="opener-content" onClick={() => setPromotions(!promotions)}>
          <div style={{ color: "rgb(155, 155, 155)" }}>Promotions</div>
          <div className="toggle-wrapper" data-checked={promotions}>
            <input type="checkbox" className="toggle-wrapper-toggle" checked={promotions} readOnly />
            <div className="toggle__track"></div>
          </div>
        </div>
        <SpecialSizesOpener filter={filter} handleOpenerClick={handleOpenerClick} specialSizesOpener={specialSizesOpener}
          specialSizesOpenerBody={specialSizesOpenerBody} moreFilters={moreFilters} windowDimensions={windowDimensions}/>
        <MaterialOpener filter={filter} handleOpenerClick={handleOpenerClick} materialOpener={materialOpener} 
          materialOpenerBody={materialOpenerBody} windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <ModelsOpener filter={filter} handleOpenerClick={handleOpenerClick} modelsOpener={modelsOpener} modelsOpenerBody={modelsOpenerBody}
          windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <SustainabilityOpener filter={filter} handleOpenerClick={handleOpenerClick} sustainabilityOpener={sustainabilityOpener}
          sustainabilityOpenerBody={sustainabilityOpenerBody} windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <CutOpener filter={filter} handleOpenerClick={handleOpenerClick} cutOpener={cutOpener} cutOpenerBody={cutOpenerBody}
          windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <ShirtCollarOpener filter={filter} handleOpenerClick={handleOpenerClick} shirtCollarOpener={shirtCollarOpener} 
          shirtCollarOpenerBody={shirtCollarOpenerBody} windowDimensions={windowDimensions} moreFilters={moreFilters} />
        <SleeveLengthOpener filter={filter} handleOpenerClick={handleOpenerClick} sleeveLengthOpener={sleeveLengthOpener}
          sleeveLengthOpenerBody={sleeveLengthOpenerBody} />
        <aside className={moreFilters ? "filterbar-aside-more-filters" : "filterbar-aside"}>
          <div className="more-filters-btn" onClick={() => setMoreFilters(!moreFilters)}>
            <div>
              More filters
            </div>
            <BreadcrumbArrow className="breadcrumb-icon more-filters-arrow" />
          </div>
          <div className="clear-all-btn" style={{ marginLeft: "1rem" }}>
            <RestartIcon className="clear-all-icon" />
            <div style={{ flexShrink: 0 }}>
              Clear all
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}