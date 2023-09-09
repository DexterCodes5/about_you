import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const CutOpener: React.FC<{
  filter: string, handleOpenerClick: Function, cutOpener: React.RefObject<HTMLDivElement>, cutOpenerBody: React.RefObject<HTMLDivElement>,
  windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [cuts, setCuts] = useState<string[]>([])

  const cutsChange = (e: React.ChangeEvent<HTMLInputElement>, cut: string) => {
    if (e.target.checked) {
      cuts.push(cut)
    }
    else {
      const idx = cuts.indexOf(cut)
      cuts.splice(idx, 1)
    }
    setCuts([...cuts])
  }

  const clearAll = () => {
    setCuts([])
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 1404) {
      return "opener-body"
    }
    return "opener-body opener-body-right"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Cut")} ref={props.cutOpener} 
        data-active={props.filter === "Cut"}>
        <div>Cut</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Cut" &&
        <div className={openerBodyClasses()} ref={props.cutOpenerBody}>
          <div className="opener-body-top opener-body-top-extra-padding">
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={cuts.includes("Regular fit")}
                onChange={e => cutsChange(e, "Regular fit")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Regular fit
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={cuts.includes("Slim fit")}
                onChange={e => cutsChange(e, "Slim fit")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Slim fit
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