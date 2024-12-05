import React,{useState, useEffect} from "react";
import DashboardLayout from "hoc/dashboard.layout";
import Loader from "utils/loader";

import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./cartDetail";
import { removeFromCart } from "store/actions/users.actions";

const UserCart = (props) => {
    const [loading, setLoading]= useState(false);
    const notifications = useSelector(state => state.notification)
    
    const dispatch = useDispatch()

    const removeItem = (position) => {
        dispatch(removeFromCart(position))
    }

    const calculateTotal = () => {
        let total = 0
        props.users.cart.forEach(
            item=> {
                total += parseInt(item.price, 10)
            }
        )
        return total
    }

    return (
        <DashboardLayout title="Your Cart">
        {props.users.cart && props.users.cart.length >0 ?
          <>
          <CardDetail 
            products={props.users.cart}
            removeItem={(position)=>removeItem(position)}
          />
          <div className="user_cart_sum">
            <div>
                Total Amount: ${calculateTotal()}
            </div>
          </div>
          </>
          : 
          <div>
            Cart is empty, add something :(
          </div>}
        </DashboardLayout>
    )

} 

export default UserCart;