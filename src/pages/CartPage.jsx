import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItem } from '../components/CartPages/CartItem'
import { getCartThunk } from '../store/slices/cart.slice'
import config from '../utils/getConfig'
import './styles/cartPage.css'

export const CartPage = () => {

    const [totalPrice, setTotalPrice] = useState(0)

    const { cart } = useSelector(state => state)

    useEffect(() => {
        const result = cart?.reduce((acc, cv) => acc + cv.quantity * Number(cv.product.price), 0)
        setTotalPrice(result)
    }, [cart])

    const dispatch = useDispatch()

    const handlePurchase = () => {
        const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases'
        axios.post(url, {}, config)
            .then(res => {
                console.log(res)
                dispatch(getCartThunk())
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='cartPage__container'>
            <div className='cartPage__items'>
                {
                    cart?.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))
                }
            </div>
            <footer className='cartPage__footer'>
                <h2><span>Total: </span><span className='cartPage__price'>{totalPrice}</span></h2>
                <button onClick={handlePurchase}>Checkout</button>
            </footer>
        </div>

        
    )
}
