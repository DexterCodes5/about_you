import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const SustainabilityOpener: React.FC<{
  filter: string, handleOpenerClick: Function, sustainabilityOpener: React.RefObject<HTMLDivElement>,
  sustainabilityOpenerBody: React.RefObject<HTMLDivElement>, windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [sustainabilities, setSustainabilities] = useState<string[]>([])

  const sustainabilitiesChange = (e: React.ChangeEvent<HTMLInputElement>, sustainabilty: string) => {
    if (e.target.checked) {
      sustainabilities.push(sustainabilty)
    }
    else {
      const idx = sustainabilities.indexOf(sustainabilty)
      sustainabilities.splice(idx, 1)
    }
    setSustainabilities([...sustainabilities])
  }

  const clearAll = () => {
    setSustainabilities([])
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 1313) {
      return "opener-body"
    }
    return "opener-body opener-body-right"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Sustainability")} ref={props.sustainabilityOpener}
        data-active={props.filter === "Sustainability"}>
        <div>Sustainability</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Sustainability" &&
        <div className={openerBodyClasses()} ref={props.sustainabilityOpenerBody}>
          <div className="opener-body-top opener-body-top-extra-padding">
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={sustainabilities.includes("Materials from bio holdings")}
                onChange={e => sustainabilitiesChange(e, "Materials from bio holdings")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Materials from bio holdings
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={sustainabilities.includes("Responsibly produced materials")}
                onChange={e => sustainabilitiesChange(e, "Responsibly produced materials")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Responsibly produced materials
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