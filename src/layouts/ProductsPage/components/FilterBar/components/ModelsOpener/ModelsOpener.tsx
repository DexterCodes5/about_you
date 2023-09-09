import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const ModelsOpener: React.FC<{
  filter: string, handleOpenerClick: Function, modelsOpener: React.RefObject<HTMLDivElement>,
  modelsOpenerBody: React.RefObject<HTMLDivElement>, windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [models, setModels] = useState<string[]>([])

  const handleModels = (e: React.ChangeEvent<HTMLInputElement>, model: string) => {
    if (e.target.checked) {
      models.push(model)
    }
    else {
      const idx = models.indexOf(model)
      models.splice(idx, 1)
    }
    setModels([...models])
  }

  const clearAll = () => {
    setModels([])
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 1123) {
      return "opener-body"
    }
    return "opener-body opener-body-right"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Models")} ref={props.modelsOpener} 
        data-active={props.filter === "Models"}>
        <div>Models</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Models" &&
        <div className={openerBodyClasses()} ref={props.modelsOpenerBody}>
          <div className="opener-body-top">
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={models.includes("One color")}
                onChange={e => handleModels(e, "One color")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                One color
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={models.includes("Plaid")}
                onChange={e => handleModels(e, "Plaid")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Plaid
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