
import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    AUTH_USER,
    CLEAR_NOTIFICATION,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    GET_PROD_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    PRODUCT_ADD,
    CLEAR_PRODUCT_TYPE,
    CLEAR_PRODUCT_ADD,
    GET_PRODUCT_BY_ID,
    CLEAR_CURRENT_PRODUCT,
    USER_ADD_TO_CART
} from '../types'

export const productsBySold = (data) => ({    
    type: GET_PRODUCTS_BY_SOLD,
    payload: data
})

export const productsByDate = (data) => ({    
    type: GET_PRODUCTS_BY_DATE,
    payload: data
})

export const productsByPaginate = (products)=>({
    type: GET_PROD_PAGINATE,
    payload: products
})

export const productRemove = () => ({
    type: REMOVE_PRODUCT
})

///NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type:ERROR_GLOBAL,
    payload:msg
})


export const successGlobal = (msg) => (
    {type:SUCCESS_GLOBAL,
    payload:msg}
)

export const userSignOut = () => (
    {
        type: SIGN_OUT
    }
)

export const clearNotification = () => {
    console.log("inside clear notifs");
    
    return (dispatch)=> {

        dispatch({
            type:CLEAR_NOTIFICATION
        })
    }
}

//PRODUCT

export const getAllBrands = (brands) => ({
    type: GET_ALL_BRANDS,
    payload: brands
})

export const productAdd = (product)=> ({
    type: PRODUCT_ADD,
    payload:product
})

export const clearProductAdd = ()=> {
    return {
        type: CLEAR_PRODUCT_ADD
    }
}

export const clearCurrentProduct = () => ({
    type: CLEAR_CURRENT_PRODUCT
})

//USER
 export const userAuthenticate =  (user) => ({
    type:AUTH_USER,
    payload: user
 })

 export const userUpdateProfile = (userdata) => ({
    type: UPDATE_USER_PROFILE,
    payload: userdata
 })

 export const userChangeEmail = (data) => ({
    type: USER_CHANGE_EMAIL,
    payload:  data
 })

 export const productsById= (product) => ({
    type: GET_PRODUCT_BY_ID,
    payload: product
 })

 export const userAddToCart = (data) => ({
    type: USER_ADD_TO_CART,
    payload: data
 })