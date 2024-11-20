import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    GET_PROD_PAGINATE,
    PRODUCT_ADD,
    CLEAR_PRODUCT_ADD,
    GET_PRODUCT_BY_ID,
    CLEAR_CURRENT_PRODUCT
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

        case GET_PRODUCT_BY_ID:
            return {...state, byId:action.payload }
        
        case CLEAR_CURRENT_PRODUCT:
            return {...state, byId:null}
        default:
            return state   
    }
}