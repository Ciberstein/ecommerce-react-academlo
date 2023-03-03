import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CardProduct } from '../Home/CardProduct'
import './styles/similarProducts.css'

export const SimilarProducts = ({ category, productId }) => {

    const [filterProducts, setFilterProducts] = useState()

    const { products } = useSelector(state => state)

    useEffect(() => {
        if(category && products){
            setFilterProducts( products?.filter(product => product.category.id === category.id && product.id !== productId ))
        }
    }, [category, products])

    return (
        <div className='app__similarProducts-container'>
            <h2>Discover similar producs</h2>
            <div className='app__similarProducts-products'>
                {
                    filterProducts?.map(prod => (
                        <CardProduct 
                            key={prod.id} 
                            product={prod} 
                        />                            
                    ))
                }
            </div>
        </div>
    )
}
