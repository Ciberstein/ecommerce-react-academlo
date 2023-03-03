import React, { useState } from 'react'
import './styles/sliderImgs.css'

export const SliderImgs = ({ product }) => {
  
  const [imgSelected, setImgSelected] = useState(0)
  
  const styleMovement = {
    transform: `translateX(calc(-${imgSelected} / 3 * 100%))`,
    width: `${product?.images.length * 100}%`
  }

  const handlePrevious = () => {
    if(imgSelected -1 < 0){
      setImgSelected(product?.images.length - 1)
    }
    else {
      setImgSelected(imgSelected - 1)
    }
  }
  const handleNext = () => {
    if(imgSelected + 1 > product?.images.length - 1){
      setImgSelected(0)
    }
    else {
      setImgSelected(imgSelected + 1)
    }
  }

  return (
    <div className='carousel'>
      <div className='slider'>
        <button onClick={handlePrevious} className='slider__btn slider__btn-left'><i className="far fa-chevron-left"></i></button>
        <div style={styleMovement} className='slider__movement'>
          {
            product?.images.map(image => (
              <div key={image.id} className='slider__container-img'>
                <img src={image.url} className='slider__img' />
              </div>
            )) 
          }
        </div>
        <button onClick={handleNext} className='slider__btn slider__btn-right'><i className="far fa-chevron-right"></i></button>
      </div>
      <div className='carousel__footer'>
        {
            product?.images.map((image, index) => (
              <div 
                key={image.id}
                className={`carousel__container-img ${index === imgSelected && 'active-img'}`}
                onClick={() => setImgSelected(index)}
              >
                <img src={image.url} className='carousel__img' />
              </div>
            )) 
          }
      </div>
    </div>
  )
}
