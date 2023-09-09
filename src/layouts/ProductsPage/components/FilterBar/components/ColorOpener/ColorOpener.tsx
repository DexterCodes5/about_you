import "./ColorOpener.css"
import { useState } from "react"
import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"

export const ColorOpener: React.FC<{
  filter: string, handleOpenerClick: Function, colorOpener: React.RefObject<HTMLDivElement>, colorOpenerBody: React.RefObject<HTMLDivElement>
}> = (props) => {
  const [colors, setColors] = useState<string[]>([])
  
  const handleColorClick = (color: string) => {
    if (colors.includes(color)) {
      const idx = colors.indexOf(color)
      colors.splice(idx, 1)
    }
    else {
      colors.push(color)
    }
    setColors([...colors])
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Color")} ref={props.colorOpener} 
      data-active={props.filter === "Color"}>
        <div>Color</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Color" &&
        <div className="opener-body" ref={props.colorOpenerBody}>
          <div className="opener-body-top">
            <div className="opener-body-colors">
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "blue" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Blue")} />
                  {colors.includes("Blue") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Blue") ? "black" : undefined }}>Blue</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color opener-body-light-color"
                  style={{ backgroundColor: "white", borderColor: colors.includes("White") ? "black" : undefined }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("White")} />
                  {colors.includes("White") &&
                    <Tick className="opener-body-color-tick" style={{ fill: "black" }} />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("White") ? "black" : undefined }}>White</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "green" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Green")} />
                  {colors.includes("Green") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Green") ? "black" : undefined }}>Green</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "black" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Black")} />
                  {colors.includes("Black") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Black") ? "black" : undefined }}>Black</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "rgb(225, 209, 178)" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Beige")} />
                  {colors.includes("Beige") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Beige") ? "black" : undefined }}>Beige</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "rgb(183, 183, 183)" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Gray")} />
                  {colors.includes("Gray") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Gray") ? "black" : undefined }}>Gray</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "rgb(102, 51, 0)" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Brown")} />
                  {colors.includes("Brown") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Brown") ? "black" : undefined }}>Brown</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "red" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Red")} />
                  {colors.includes("Red") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Red") ? "black" : undefined }}>Red</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "rgb(255, 20, 147)" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Pink")} />
                  {colors.includes("Pink") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Pink") ? "black" : undefined }}>Pink</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color opener-body-color-colorful">
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Colorful")} />
                  {colors.includes("Colorful") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Colorful") ? "black" : undefined }}>Colorful</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color opener-body-light-color"
                  style={{ backgroundColor: "yellow", borderColor: colors.includes("Yellow") ? "black" : undefined }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Yellow")} />
                  {colors.includes("Yellow") &&
                    <Tick className="opener-body-color-tick" style={{ fill: "black" }} />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Yellow") ? "black" : undefined }}>Yellow</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "orange" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Orange")} />
                  {colors.includes("Orange") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Orange") ? "black" : undefined }}>Orange</span>
              </label>
              <label className="opener-body-color-label">
                <div className="opener-body-color" style={{ backgroundColor: "purple" }}>
                  <input className="opener-body-color-checkbox" type="checkbox" onClick={() => handleColorClick("Purple")} />
                  {colors.includes("Purple") &&
                    <Tick className="opener-body-color-tick" />
                  }
                </div>
                <span className="opener-body-color-span" style={{ color: colors.includes("Purple") ? "black" : undefined }}>Purple</span>
              </label>
            </div>
          </div>
          <div className="opener-body-clear-all">
            <div className="opener-body-clear-all-btn" onClick={() => setColors([])}>
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