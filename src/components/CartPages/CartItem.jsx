import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getCartThunk } from '../../store/slices/cart.slice'
import config from '../../utils/getConfig'
import './styles/cartItem.css'

export const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    const handleDelete = () => {

        const url = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${item.id}`
        axios.delete(url, config)
            .then(res => {
                console.log(res.data)
                dispatch(getCartThunk())
            })
            .catch(err => console.log(err.response))

    }

    return (
        <article className='cartItem__container'>
            <header className='cartItem__header'>
                <img src={item.product.images[0].url} alt='' />
            </header>
            <div className='cartItem__body'>
                <h3>{item.product.title}</h3>
                <ul>
                    <li>
                        <span>Unit price: </span>
                        <span className='cartItem__price'>{item.product.price}</span>
                    </li>
                    <li>
                        <span>Quantity: </span>
                        <span>{item.quantity}</span>
                    </li>
                </ul>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </article>
    )
}
