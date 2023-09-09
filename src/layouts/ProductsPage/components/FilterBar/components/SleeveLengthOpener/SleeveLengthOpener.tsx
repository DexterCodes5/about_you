import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const SleeveLengthOpener: React.FC<{
  filter: string, handleOpenerClick: Function, sleeveLengthOpener: React.RefObject<HTMLDivElement>,
  sleeveLengthOpenerBody: React.RefObject<HTMLDivElement>
}> = (props) => {
  const [sleeveLengths, setSleeveLengths] = useState<string[]>([])

  const changeSleeveLengths = (e: React.ChangeEvent<HTMLInputElement>, sleeveLength: string) => {
    if (e.target.checked) {
      sleeveLengths.push(sleeveLength)
    }
    else {
      const idx = sleeveLengths.indexOf(sleeveLength)
      sleeveLengths.splice(idx, 1)
    }
    setSleeveLengths([...sleeveLengths])
  }

  const clearAll = () => {
    setSleeveLengths([])
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Sleeve length")} ref={props.sleeveLengthOpener}
        data-active={props.filter === "Sleeve length"}>
        <div>Sleeve length</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Sleeve length" &&
        <div className="opener-body" ref={props.sleeveLengthOpenerBody}>
          <div className="opener-body-top opener-body-top-extra-padding">
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={sleeveLengths.includes("Long sleeve")}
                onChange={e => changeSleeveLengths(e, "Long sleeve")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Long sleeve
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 16 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={sleeveLengths.includes("Short sleeve")}
                onChange={e => changeSleeveLengths(e, "Short sleeve")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Short sleeve
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