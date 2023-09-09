import "./PriceOpener.css"
import { ReactComponent as SmallTriangleDown } from "../../../../../../icons/small-triangle-down.svg"
import { ReactComponent as RestartIcon } from "../../../../../../icons/restart.svg"
import { useEffect, useRef, useState } from "react"
import { windowDimensions } from "../../../../../../hooks/useWindowDimensions"

export const PriceOpener: React.FC<{
  filter: string, handleOpenerClick: Function, priceOpener: React.RefObject<HTMLDivElement>, 
  priceOpenerBody: React.RefObject<HTMLDivElement>, windowDimensions: windowDimensions, moreFilters: boolean
}> = (props) => {
  const [priceBallLeftXOffset, setPriceBallLeftXOffset] = useState(-1)
  const [priceBallRightXOffset, setPriceBallRightXOffset] = useState(315)

  const [counterLeftBall, setCounterLeftBall] = useState(0)
  const [counterRightBall, setCounterRightBall] = useState(0)

  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const priceBallLeft = useRef<HTMLDivElement>(null)
  const priceTrack = useRef<HTMLDivElement>(null)
  const priceBallRight = useRef<HTMLDivElement>(null)

  const startCounterLeftBall = (e: any) => {
    intervalRef.current = setInterval(() => {
      setCounterLeftBall(prevCounter => prevCounter + 1)
    }, 10)
  }

  const startCounterRightBall = (e: any) => {
    intervalRef.current = setInterval(() => {
      setCounterRightBall(prevCounter => prevCounter + 1)
    }, 10)
  }

  const stopCounter = () => {
    clearInterval(intervalRef.current!)
    setCounterLeftBall(0)
    setCounterRightBall(0)
    intervalRef.current = null
  }

  const onMouseDown = (e: MouseEvent) => {
    if (priceTrack.current && priceTrack.current!.contains(e.target as Node)) {
      const diffLeftBall = e.clientX - priceBallLeft.current!.getBoundingClientRect().x
      const diffRightBall = e.clientX - priceBallRight.current!.getBoundingClientRect().x

      if (Math.abs(diffLeftBall) < Math.abs(diffRightBall)) {
        // Moving left ball
        const leftBallX = priceBallLeft.current!.getBoundingClientRect().x + diffLeftBall - 11
        if (Math.abs(leftBallX - priceBallRight.current!.getBoundingClientRect().x) < 40) {
          const move = (priceBallRight.current!.getBoundingClientRect().x - 40) - priceBallLeft.current!.getBoundingClientRect().x
          setPriceBallLeftXOffset(priceBallLeftXOffset + move)
          return
        }

        const value = (priceBallLeftXOffset + diffLeftBall) - 11
        setPriceBallLeftXOffset(value < -1 ? -1 : value)
        return
      }

      // Moving right ball
      const rightBallX = priceBallRight.current!.getBoundingClientRect().x + diffRightBall - 11
      if (Math.abs(rightBallX - priceBallLeft.current!.getBoundingClientRect().x) < 40) {
        const move = priceBallRight.current!.getBoundingClientRect().x - (priceBallLeft.current!.getBoundingClientRect().x + 40)
        setPriceBallRightXOffset(priceBallRightXOffset - move)
        return
      }
      const value = (priceBallRightXOffset + diffRightBall) - 11
      setPriceBallRightXOffset(value > 315 ? 315 : value)
    }
    else if (counterLeftBall > 0 || counterRightBall > 0) {
      stopCounter()
    }
  }

  const onMouseMove = (e: any) => {
    if (counterLeftBall > 0) {
      // Move left ball
      const diffLeftBall = e.clientX - priceBallLeft.current!.getBoundingClientRect().x

      const leftBallX = priceBallLeft.current!.getBoundingClientRect().x + diffLeftBall - 11
      if (priceBallRight.current!.getBoundingClientRect().x - leftBallX < 40) {
        const move = (priceBallRight.current!.getBoundingClientRect().x - 40) - priceBallLeft.current!.getBoundingClientRect().x
        setPriceBallLeftXOffset(priceBallLeftXOffset + move)
        return
      }

      const value = (priceBallLeftXOffset + diffLeftBall) - 11
      setPriceBallLeftXOffset(value < -1 ? -1 : value)
    }
    else if (counterRightBall > 0) {
      const diffRightBall = e.clientX - priceBallRight.current!.getBoundingClientRect().x
      const rightBallX = priceBallRight.current!.getBoundingClientRect().x + diffRightBall - 11
      if (rightBallX - priceBallLeft.current!.getBoundingClientRect().x < 40) {
        const move = priceBallRight.current!.getBoundingClientRect().x - (priceBallLeft.current!.getBoundingClientRect().x + 40)
        setPriceBallRightXOffset(priceBallRightXOffset - move)
        return
      }
      const value = (priceBallRightXOffset + diffRightBall) - 11
      setPriceBallRightXOffset(value > 315 ? 315 : value)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", stopCounter)
    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", stopCounter)
    }
  }, [priceBallLeftXOffset, priceBallRightXOffset, counterLeftBall, counterRightBall])

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [counterLeftBall, counterRightBall])

  const calculateCashLeft = (left: number) => {
    const leftOnePercent = 3.15
    const leftPercent = Math.round(left / leftOnePercent)

    const cashOnePercent = 7.58
    const result = Math.round(leftPercent * cashOnePercent) + 17
    return result
  }

  const calculateCashRight = (left: number) => {
    const leftOnePercent = 3.15
    const leftPercent = Math.round(left / leftOnePercent)

    const cashOnePercent = 7.58
    const result = Math.round(leftPercent * cashOnePercent) + 17
    return result
  }

  const clearAll = () => {
    setPriceBallLeftXOffset(-1)
    setPriceBallRightXOffset(315)
  }

  const openerBodyClasses = () => {
    if (props.moreFilters && props.windowDimensions.width < 513) {
      return "opener-body"
    }
    if (props.windowDimensions.width < 975) {
      return "opener-body opener-body-right"
    }
    return "opener-body"
  }

  return (
    <div className="opener">
      <div className="opener-content" onClick={() => props.handleOpenerClick("Price")} 
        ref={props.priceOpener} data-active={props.filter === "Price"}>
        <div>Price</div>
        <SmallTriangleDown className="small-triangle-down" />
      </div>
      {props.filter === "Price" &&
        <div className={openerBodyClasses()} ref={props.priceOpenerBody}>
          <div className="opener-body-price-top">
            <div className="opener-body-price-inputs">
              <div className="opener-body-price-input-container">
                <input className="opener-body-price-input" type="numberic" placeholder={`${calculateCashLeft(priceBallLeftXOffset)} BGN`} />
              </div>
              <div className="opener-body-price-middle">
                -
              </div>
              <div className="opener-body-price-input-container">
                <input className="opener-body-price-input" type="numberic" placeholder={`${calculateCashRight(priceBallRightXOffset)} BGN`} />
              </div>
            </div>
            <div className="opener-body-price-slider">
              <div className="opener-body-price-ball" style={{ left: priceBallLeftXOffset }} ref={priceBallLeft}
                onMouseDown={startCounterLeftBall} onMouseUp={stopCounter} ></div>
              <div className="opener-body-price-track" ref={priceTrack}>
                <div className="opener-body-price-track-inner"></div>
              </div>
              <div className="opener-body-price-ball" style={{ left: priceBallRightXOffset }} ref={priceBallRight}
                onMouseDown={startCounterRightBall} onMouseUp={stopCounter}></div>
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