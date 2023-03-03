import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCartThunk } from '../../store/slices/cart.slice'
import config from '../../utils/getConfig'

export const CardProduct = ({ product }) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = () => {
        navigate(`/product/${product.id}`)
    } 

    const handleBtnClick = e => {
        const url = `https://e-commerce-api-v2.academlo.tech/api/v1/cart`
        
        const data = {
            "quantity": 1,
            "productId": product.id
        }
        
        axios.post(url, data, config)
            .then(res => {
                console.log(res.data)
                dispatch(getCartThunk())
            })
            .catch(err =>{
                console.log(err.response)
                if(err.response.data.error = 'Product already added to cart'){
                    // Add 1 to cart
                }
            })
        e.stopPropagation()
    }
    
    return (
        <article className='cardProduct__container' onClick={handleClick}>
            <header className='cardProduct__header'>
                <img src={product.images[0].url} />
            </header>
            <section className='cardProduct__section'>
                <header className='cardProduct__name'>
                    <h3>{product.brand}</h3>
                    <h2>{product.title}</h2>
                </header>
                <footer className='cardProduct__footer'>
                    <div className='cardProduct__price-container'>
                        <div className='cardProduct__price-label'>Price</div>
                        <div className='cardProduct__price'>{product.price}</div>
                    </div>
                    <button onClick={handleBtnClick}>
                        <i className="fal fa-cart-plus"></i>
                    </button>                    
                </footer>
            </section>
        </article>
    )
}
