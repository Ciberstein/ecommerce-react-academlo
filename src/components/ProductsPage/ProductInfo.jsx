import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartThunk } from '../../store/slices/cart.slice'
import config from '../../utils/getConfig'
import './styles/productInfo.css'

export const ProductInfo = ({ product }) => {

    const [counter, setCounter] = useState(1)

    const handleAdd = () => {
        setCounter(counter + 1)
    }

    const handleMinus = () => {
        if(counter - 1 >= 1)
            setCounter(counter - 1)
    }

    const dispatch = useDispatch()

    const handleAddCart = () => {
        const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart'
        const data = {
            quantity: counter,
            productId: product.id
        }
        axios.post(url, data, config)
            .then(res => {
                console.log(res.data)
                dispatch(getCartThunk())
                setCounter(1)
            })
            .catch(err => console.log(err))
    }

    return (
        <article className='productInfo__container'>
            <h3 className='productInfo__brand'>{product?.brand}</h3>
            <h2>{product?.title}</h2>
            <p>{product?.description}</p>
            <footer className='productInfo__footer'>
                <div className='productInfo__controls'>
                    <section className='productInfo__price-conatiner'>
                        <h4>Price</h4>
                        <span className='productInfo__price'>{product?.price}</span>
                    </section>
                    <section className='productInfo__quantity-conatiner'>
                        <h4>Quantity</h4>
                        <div className='productInfo__quantity-controls' >
                            <div className='productInfo__quantity-counter'>{counter}</div>
                            <button className='productInfo__quantity-btn' onClick={handleMinus}>-</button>
                            <button className='productInfo__quantity-btn' onClick={handleAdd}>+</button>
                        </div>
                    </section>                    
                </div>
                <button className='productInfo__btn' onClick={handleAddCart}>Add to cart <i className="fal fa-cart-plus"></i></button>
            </footer>
        </article>
    )
}
