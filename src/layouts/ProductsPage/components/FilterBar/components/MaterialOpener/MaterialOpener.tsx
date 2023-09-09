import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as Tick } from "../../../../../../icons/tick.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const MaterialOpener: React.FC<{
  filter: string, handleOpenerClick: Function, materialOpener: React.RefObject<HTMLDivElement>,
  materialOpenerBody: React.RefObject<HTMLDivElement>, windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [materials, setMaterials] = useState<string[]>([])

  const handleMaterialClick = (e: React.ChangeEvent<HTMLInputElement>, material: string) => {
    if (e.target.checked) {
      materials.push(material)
    }
    else {
      const idx = materials.indexOf(material)
      materials.splice(idx, 1)
    }
    setMaterials([...materials])
  }

  const clearAll = () => {
    setMaterials([])
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 1024) {
      return "opener-body"
    }
    return "opener-body opener-body-right"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Material")} ref={props.materialOpener} 
        data-active={props.filter === "Material"}>
        <div>Material</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Material" &&
        <div className={openerBodyClasses()} ref={props.materialOpenerBody}>
          <div className="opener-body-top">
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={materials.includes("Cotton")}
                onChange={e => handleMaterialClick(e, "Cotton")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Cotton
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={materials.includes("Flax")}
                onChange={e => handleMaterialClick(e, "Flax")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Flax
              </div>
              <span className="opener-body-count">126</span>
            </label>
            <label className="opener-body-label" style={{ marginBottom: 10 }}>
              <input className="opener-body-checkbox" type="checkbox" checked={materials.includes("Viscose")}
                onChange={e => handleMaterialClick(e, "Viscose")} />
              <div className="opener-body-checkbox-mask">
                <Tick className="opener-body-tick" />
              </div>
              <div>
                Viscose
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