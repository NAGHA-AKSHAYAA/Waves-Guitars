import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE,
    GET_PROD_PAGINATE
} from '../types'


export default function productsReducer(state= {}, action){
    console.log(action);
    
    switch(action.type){

        case GET_PROD_PAGINATE:
            return {...state, byPaginate: action.payload}
    
        case GET_PRODUCTS_BY_SOLD:
            console.log("I am inside");
            return {...state, bySold:action.payload}

        case GET_PRODUCTS_BY_DATE:
            return {...state, byDate:action.payload}
            
        default:
            return state   
    }
}