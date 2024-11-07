import axios from "axios";
import * as actions from './index'
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