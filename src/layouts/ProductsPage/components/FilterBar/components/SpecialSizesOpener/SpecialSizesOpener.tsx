import "./SpecialSizesOpener.css"
import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const SpecialSizesOpener: React.FC<{ 
  filter: string, handleOpenerClick: Function, specialSizesOpener: React.RefObject<HTMLDivElement>,
  specialSizesOpenerBody: React.RefObject<HTMLDivElement>, moreFilters: boolean, windowDimensions: windowDimensions
}> = (props) => {
  const [largeAndTallFigure, setLargeAndTallFigure] = useState(false)

  const clearAll = () => {
    setLargeAndTallFigure(false)
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 976) {
      return "opener-body"
    }
    if (props.moreFilters && props.windowDimensions.width < 1146) {
      return "opener-body opener-body-right"
    }
    return "opener-body"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Special Sizes")} ref={props.specialSizesOpener}
        data-active={props.filter === "Special Sizes"}>
        <div>Special Sizes</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Special Sizes" &&
        <div className={openerBodyClasses()} 
          ref={props.specialSizesOpenerBody}>
          <div className="opener-body-top">
            <div className="opener-body-special-sizes">
              <label className="opener-body-label">
                <input className="opener-body-checkbox" type="checkbox" checked={largeAndTallFigure}
                  onChange={(e) => setLargeAndTallFigure(e.target.checked)} />
                <div className="opener-body-checkbox-mask">
                  <Tick className="opener-body-tick" />
                </div>
                <div>
                  Large and tall figure
                </div>
                <span className="opener-body-count">126</span>
              </label>
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