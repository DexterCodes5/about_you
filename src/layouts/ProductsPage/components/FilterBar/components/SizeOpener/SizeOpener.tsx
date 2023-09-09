import "./SizeOpener.css"
import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"

export const SizeOpener: React.FC<{
  filter: string, handleOpenerClick: Function, sizeOpener: React.RefObject<HTMLDivElement>,
  sizeOpenerBody: React.RefObject<HTMLDivElement>
}> = (props) => {
  const [sizes, setSizes] = useState<string[]>([])

  const handleSizes = (size: string) => {
    if (sizes.includes(size)) {
      const idx = sizes.indexOf(size)
      sizes.splice(idx, 1)
    }
    else {
      sizes.push(size)
    }
    setSizes([...sizes])
  }

  const [collarWidths, setCollarWidths] = useState<string[]>([])

  const handleColarWidths = (collarWidth: string) => {
    if (collarWidths.includes(collarWidth)) {
      const idx = collarWidths.indexOf(collarWidth)
      collarWidths.splice(idx, 1)
    }
    else {
      collarWidths.push(collarWidth)
    }
    setCollarWidths([...collarWidths])
  }

  const clearAll = () => {
    setSizes([])
    setCollarWidths([])
  }
  
  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Size")} ref={props.sizeOpener} 
      data-active={props.filter === "Size"}>
        <div>Size</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Size" &&
        <div className="opener-body" ref={props.sizeOpenerBody}>
          <div className="opener-body-top opener-body-top-shadow">
            <div className="opener-body-heading">Clothes</div>
            <div className="opener-body-heading2">Size (INTL)</div>
            <div className="opener-body-elements">
              <button className={`opener-body-element${sizes.includes("XS") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("XS")}>XS</button>
              <button className={`opener-body-element${sizes.includes("S") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("S")}>S</button>
              <button className={`opener-body-element${sizes.includes("M") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("M")}>M</button>
              <button className={`opener-body-element${sizes.includes("L") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("L")}>L</button>
              <button className={`opener-body-element${sizes.includes("XL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("XL")}>XL</button>
              <button className={`opener-body-element${sizes.includes("XXL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("XXL")}>XXL</button>
              <button className={`opener-body-element${sizes.includes("XXXL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("XXXL")}>XXXL</button>
              <button className={`opener-body-element${sizes.includes("4XL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("4XL")}>4XL</button>
              <button className={`opener-body-element${sizes.includes("5XL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("5XL")}>5XL</button>
              <button className={`opener-body-element${sizes.includes("6XL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("6XL")}>6XL</button>
              <button className={`opener-body-element${sizes.includes("7XL") ? " opener-body-element-active" : ""}`}
                onClick={() => handleSizes("7XL")}>7XL</button>
            </div>
            <div className="opener-body-heading2">Collar width</div>
            <div className="opener-body-elements">
              <button className={`opener-body-element${collarWidths.includes("36") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("36")}>36</button>
              <button className={`opener-body-element${collarWidths.includes("37") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("37")}>37</button>
              <button className={`opener-body-element${collarWidths.includes("38") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("38")}>38</button>
              <button className={`opener-body-element${collarWidths.includes("39") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("39")}>39</button>
              <button className={`opener-body-element${collarWidths.includes("40") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("40")}>40</button>
              <button className={`opener-body-element${collarWidths.includes("41") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("41")}>41</button>
              <button className={`opener-body-element${collarWidths.includes("42") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("42")}>42</button>
              <button className={`opener-body-element${collarWidths.includes("43") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("43")}>43</button>
              <button className={`opener-body-element${collarWidths.includes("44") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("44")}>44</button>
              <button className={`opener-body-element${collarWidths.includes("45") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("45")}>45</button>
              <button className={`opener-body-element${collarWidths.includes("46") ? " opener-body-element-active" : ""}`}
                onClick={() => handleColarWidths("46")}>46</button>
            </div>
          </div>
          <div className="opener-body-clear-all">
            <div className="opener-body-clear-all-btn" onClick={clearAll}>
              <RestartIcon className="clear-all-icon" />
              <div style={{ color: "black" }}>
                Clear all
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}