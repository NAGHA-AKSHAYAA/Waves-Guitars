import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    GET_PROD_PAGINATE,
    PRODUCT_ADD,
    CLEAR_PRODUCT_ADD
} from '../types'


export default function productsReducer(state= {}, action){
    console.log(action);
    
    switch(action.type){

        case PRODUCT_ADD:
            return {...state, lastAdded: action.payload}
        case GET_PROD_PAGINATE:
            return {...state, byPaginate: action.payload}
    
        case GET_PRODUCTS_BY_SOLD:
            console.log("I am inside");
            return {...state, bySold:action.payload}

        case GET_PRODUCTS_BY_DATE:
            return {...state, byDate:action.payload}

        case CLEAR_PRODUCT_ADD:
            return {...state, removeArticle: true, lastAdded: null}
            
        default:
            return state   
    }
}