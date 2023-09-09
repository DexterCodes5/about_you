import { ProductModel } from "../../../../models/ProductModel"
import "./AddToCartModal.css"
import { ReactComponent as ChevronRight } from "../../../../icons/chevronRight2.svg"
import { ReactComponent as Close } from "../../../../icons/close.svg"
import { useEffect, useRef, useState } from "react"
import useWindowDimensions from "../../../../hooks/useWindowDimensions"
import { AddToCartModalRight } from "./AddToCartModalRight/AddToCartModalRight"
import { Link } from "react-router-dom"

export const AddToCartModal: React.FC<{
  product: ProductModel,
  setProductWithoutSize: React.Dispatch<React.SetStateAction<ProductModel | undefined>>
}> = (props) => {
  const windowDimensions = useWindowDimensions()

  const [curr, setCurr] = useState(0)

  const modalBackground = useRef<HTMLDivElement>(null)
  const modal = useRef<HTMLDivElement>(null)

  const slider = useRef<HTMLDivElement>(null)

  const img = useRef<HTMLAnchorElement>(null)
  const img1 = useRef<HTMLAnchorElement>(null)
  const img2 = useRef<HTMLAnchorElement>(null)
  const img3 = useRef<HTMLAnchorElement>(null)
  const img4 = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [props.product])
  
  useEffect(() => {
    if (windowDimensions.width < 690) {
      slider.current?.scroll(0, 0)
      setCurr(0)
    }
  }, [windowDimensions.width])

  const onMouseDown = (e: any) => {
    if (modal.current?.contains(e.target)) {
      return
    }

    closeModal()
  }

  const closeModal = () => {
    modal.current!.style.animation = "300ms ease-in-out 0ms 1 normal forwards running fadeExit"
    setTimeout(() => {
      props.setProductWithoutSize(undefined)
    }, 300)
  }

  const prev = () => {
    switch (curr) {
      case 1:
        slider.current?.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        break
      case 2:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5),
          behavior: "smooth"
        })
        break
      case 3:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5) * 2,
          behavior: "smooth"
        })
        break
      case 4:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5) * 3,
          behavior: "smooth"
        })
        break
    }

    setCurr(curr - 1)
  }

  const next = () => {
    switch (curr) {
      case 0:
        slider.current?.scroll({
          top: 0,
          left: img1.current?.getBoundingClientRect().width! + 5,
          behavior: "smooth"
        })
        break
      case 1:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5) * 2,
          behavior: "smooth"
        })
        break
      case 2:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5) * 3,
          behavior: "smooth"
        })
        break
      case 3:
        slider.current?.scroll({
          top: 0,
          left: (img1.current?.getBoundingClientRect().width! + 5) * 4,
          behavior: "smooth"
        })
        break
    }
    setCurr(curr + 1)
  }

  const [isLastThumbVisible, setIsLastThumbVisible] = useState(false)

  const thumbnails = useRef<HTMLDivElement>(null)

  const firstThumbnail = useRef<HTMLDivElement>(null)
  const lastThumbnail = useRef<HTMLDivElement>(null)

  const slideToFirstThumbnail = () => {
    thumbnails.current?.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    setIsLastThumbVisible(false)
  }

  const slideToLastThumbnail = () => {
    thumbnails.current?.scroll({
      top: 0,
      left: 70,
      behavior: "smooth"
    })
    setIsLastThumbVisible(true)
  }

  const handleThumbnailClick = (imgNum: number) => {
    switch (imgNum) {
      case 0:
        slider.current?.scroll(0, 0)
        break
      case 1:
        slider.current?.scroll(img1.current?.getBoundingClientRect().width! + 5, 0)
        break
      case 2:
        slider.current?.scroll((img1.current?.getBoundingClientRect().width! + 5) * 2, 0)
        break
      case 3:
        slider.current?.scroll((img1.current?.getBoundingClientRect().width! + 5) * 3, 0)
        break
      case 4:
        slider.current?.scroll((img1.current?.getBoundingClientRect().width! + 5) * 4, 0)
        break
    }
    setCurr(imgNum)
  }

  return (
    <div className="prod-modal-background" ref={modalBackground}>
      <div className="prod-modal-background2">
        <div className="prod-modal" ref={modal}>
          <Close className="prod-modal-close" onClick={closeModal} />
          <div className="prod-modal-content">
            <div className="prod-modal-content2">
              <div className="prod-modal-side">
                <div className="prod-modal-img-slider">
                  <div className="prod-modal-img-slider-elems" ref={slider}>
                    <Link to={`/p${props.product.productUrl}`} className="prod-modal-img-link" ref={img}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img" src={props.product?.img[0]} alt="product" />
                      </div>
                    </Link>
                    <Link to={`/p${props.product.productUrl}`} className="prod-modal-img-link" ref={img1}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[1]} alt="product" />
                      </div>
                    </Link>
                    <Link to={`/p${props.product.productUrl}`} className="prod-modal-img-link" ref={img2}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[2]} alt="product" />
                      </div>
                    </Link>
                    <Link to={`/p${props.product.productUrl}`} className="prod-modal-img-link" ref={img3}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[3]} alt="product" />
                      </div>
                    </Link>
                    <Link to={`/p${props.product.productUrl}`} className="prod-modal-img-link" ref={img4}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[4]} alt="product" />
                      </div>
                    </Link>
                  </div>
                  {curr > 0 &&
                    <div className="prod-modal-img-slider-btn prod-modal-img-slider-btn-left" onClick={prev}>
                      <div className="prod-modal-img-slider-btn-wrapper">
                        <ChevronRight className="prod-modal-img-slider-btn-icon prod-modal-img-slider-btn-icon-left" />
                      </div>
                    </div>
                  }
                  {curr < 4 &&
                    <div className="prod-modal-img-slider-btn" onClick={next}>
                      <div className="prod-modal-img-slider-btn-wrapper">
                        <ChevronRight className="prod-modal-img-slider-btn-icon" />
                      </div>
                    </div>
                  }
                </div>
                <div className="prod-modal-img-slider-thumbnail-container">
                  <div className="prod-modal-img-slider-thumbnails" ref={thumbnails}>
                    <div className="prod-modal-img-slider-item" ref={firstThumbnail} onClick={() => handleThumbnailClick(0)}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img" src={props.product?.img[0]} alt="product" />
                      </div>
                    </div>
                    <div className="prod-modal-img-slider-item" onClick={() => handleThumbnailClick(1)}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[1]} alt="product" />
                      </div>
                    </div>
                    <div className="prod-modal-img-slider-item" onClick={() => handleThumbnailClick(2)}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[2]} alt="product" />
                      </div>
                    </div>
                    <div className="prod-modal-img-slider-item" onClick={() => handleThumbnailClick(3)}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[3]} alt="product" />
                      </div>
                    </div>
                    <div className="prod-modal-img-slider-item" ref={lastThumbnail} onClick={() => handleThumbnailClick(4)}>
                      <div className="prod-modal-img-container">
                        <img className="prod-modal-img2" src={props.product?.img[4]} alt="product" />
                      </div>
                    </div>
                  </div>
                  {isLastThumbVisible &&
                    <div className="prod-modal-img-slider-btn prod-modal-img-slider-btn-left" onClick={slideToFirstThumbnail}>
                      <div className="prod-modal-img-slider-btn-wrapper">
                        <ChevronRight className="prod-modal-img-slider-btn-icon prod-modal-img-slider-btn-icon-left" />
                      </div>
                    </div>
                  }
                  {!isLastThumbVisible &&
                    <div className="prod-modal-img-slider-btn" onClick={slideToLastThumbnail}>
                      <div className="prod-modal-img-slider-btn-wrapper">
                        <ChevronRight className="prod-modal-img-slider-btn-icon" />
                      </div>
                    </div>
                  }
                </div>
              </div>
              <AddToCartModalRight product={props.product} closeModal={closeModal} setProductWithoutSize={props.setProductWithoutSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}