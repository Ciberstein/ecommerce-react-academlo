import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: 'product',
    initialState: null,
    reducers: {
        setProduct: (state, action) => action.payload
    }
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer

export const getAllProductsThunk = () => dispatch => {
    const url = `https://e-commerce-api-v2.academlo.tech/api/v1/products`
    axios.get(url)
        .then(res => dispatch(setProduct(res.data)))
        .catch(err => console.log(err))
}

export const getProductsByName = (text = '', isCategory=false) => dispatch => {
    let url
    
    if(isCategory){
        url = `https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${ text }`
    }
    else {
        url = `https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${ text }`
    }
    
    axios.get(url)
        .then(res => dispatch(setProduct(res.data)))
        .catch(err => console.log(err.response))
}