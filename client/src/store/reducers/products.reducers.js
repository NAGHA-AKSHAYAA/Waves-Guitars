import {
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_BY_DATE
} from '../types'


export default function productsReducer(state= {}, action){
    console.log(action);
    
    switch(action.type){
        case GET_PRODUCTS_BY_SOLD:
            console.log("I am inside");
            return {...state, bySold:action.payload}

        case GET_PRODUCTS_BY_DATE:
            return {...state, byDate:action.payload}
            
        default:
            return state   
    }
}