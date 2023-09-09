import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const ShirtCollarOpener: React.FC<{
  filter: string, handleOpenerClick: Function, shirtCollarOpener: React.RefObject<HTMLDivElement>,
  shirtCollarOpenerBody: React.RefObject<HTMLDivElement>, windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [shirtCollars, setShirtCollars] = useState<string[]>([])

  const changeShirtCollars = (e: React.ChangeEvent<HTMLInputElement>, shirtCollar: string) => {
    if (e.target.checked) {
      shirtCollars.push(shirtCollar)
    }
    else {
      const idx = shirtCollars.indexOf(shirtCollar)
      shirtCollars.splice(idx, 1)
    }
    setShirtCollars([...shirtCollars])
  }

  const clearAll = () => {
    setShirtCollars([])
  }

  const openerBodyClasses = () => {
    return "opener-body"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Shirt collar")} ref={props.shirtCollarOpener} 
        data-active={props.filter === "Shirt collar"}>
        <div>Shirt collar</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Shirt collar" &&
        <div className={openerBodyClasses()} ref={props.shirtCollarOpenerBody}>
          <div className="opener-body-top opener-body-top-extra-padding">
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={shirtCollars.includes("Kent collar")}
                onChange={e => changeShirtCollars(e, "Kent collar")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Kent collar
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={shirtCollars.includes("Collar with button")}
                onChange={e => changeShirtCollars(e, "Collar with button")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Collar with button
              </div>
              <span className="opener-body-count">126</span>
            </label>
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