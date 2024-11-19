import axios from "axios";
import * as actions from './index'
import { getAuthHeader } from "utils/tool";
export const productsBySort = ({sortBy,limit,order,where}) => {
    return async(dispatch)=>{
        try {
            const products = await axios.get('/api/product/all', {
                params: {
                    limit,
                    sortBy,
                    order
                }
            });
            console.log(products);

            switch(where){
                case 'bySold':
                    dispatch(actions.productsBySold(products.data))
                break;
                case 'byDate':
                    dispatch(actions.productsByDate(products.data))
                break
                default:
                    return false
            }
            dispatch(actions.productsBySold(products.data))
            dispatch(actions.productsByDate(products.data))
            dispatch(actions.successGlobal("All good"))


        } catch (error) {
            console.log("something broke");
            
            dispatch(actions.errorGlobal("Sorry something broke"))
        }
    }
}

export const productsByPaginate = (args) => {
    return async (dispatch) => {
        try {
            const products = await axios.post(`/api/product/paginate/all`, args)
            dispatch(actions.productsByPaginate(products.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsRemove = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/product/product/${id}`, getAuthHeader())
            dispatch(actions.productRemove)
            dispatch(actions.successGlobal())
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productAdd = (data) => {
    return async (dispatch) => {
        try {
            const product = await axios.post(`/api/product/`, data, getAuthHeader())
            dispatch(actions.productAdd(product))
            dispatch(actions.successGlobal())
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}