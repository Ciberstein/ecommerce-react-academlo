import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardProduct } from '../components/Home/CardProduct';
import { getAllProductsThunk, getProductsByName } from '../store/slices/products.slice';
import './styles/home.css'

export const Home = () => {

    const [categories, setCategories] = useState()
    const [fromTo, setFromTo] = useState({
        from: 0,
        to: Infinity
    })
    const { products } = useSelector(state => state)

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        const input = e.target.inputSearch.value.trim().toLowerCase()
        dispatch(getProductsByName(input))
    }

    useEffect(() => {
        const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/categories'
        axios.get(url)
            .then(res => setCategories(res.data))
            .catch(err => console.log(err.response))
    }, [])

    const handleClickCategory = id => {
        dispatch(getProductsByName(id, true))
    }

    const handleSubmitPrice = e => {
        e.preventDefault()
        const from = +e.target.from.value.trim()
        const to = +e.target.to.value.trim()

        if(from && to){
            setFromTo({from, to})
        } else if(from && !to){
            setFromTo({from, to: Infinity})
        } else if(!from && to){
            setFromTo({from: 0, to})
        } else {
            setFromTo({from: 0, to: Infinity})
        }
    }
    
    return (
        <div className='app__productsMain'>
            <form onSubmit={handleSubmit} className='app__search-form'>
                <input className='app__search-input' placeholder='Search for products' type='text' id='inputSearch' />
                <button className='app__search-btn'>
                    <i className="fal fa-search"></i>
                </button>
            </form>
            <div className='app__products-container'>
                <article>
                    <section className='app__price-filter'>
                        <header className='app__price-header'>
                            <h3>Price</h3>
                        </header>
                        <form onSubmit={handleSubmitPrice} className='app__price-filterForm'>
                            <div>
                                <label htmlFor='from'>From</label>
                                <input id='from' type='number' />                            
                            </div>
                            <div>
                                <label htmlFor='to'>To</label>
                                <input id='to' type='number' />                            
                            </div>
                            <button>Filter price</button>
                        </form>
                    </section>
                    <section className='app__category-filter'>
                        <header className='app__category-header'>
                            <h3>Category</h3>
                        </header>
                        <ul>
                            <li onClick={() => dispatch(getAllProductsThunk())}>All products</li>
                            {
                                categories?.map(category => (
                                    <li 
                                        onClick={() => handleClickCategory(category.id)} 
                                        key={category.id}>
                                        {category.name}
                                    </li>
                                ))
                            }
                        </ul>                    
                    </section>
                </article>
                <article className='app__products'>
                    {
                        products?.length === 0 || products === null ? 
                            <h1>This product not exist</h1>
                        :
                            products?.filter(product => Number(product.price) >= fromTo.from && Number(product.price) <= fromTo.to).map(product => (
                                <CardProduct key={product.id} product={product} />
                            ))
                    }
                </article>
            </div>
        </div>
    )
}
