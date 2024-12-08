import React,{useState, useEffect} from "react";
import DashboardLayout from "hoc/dashboard.layout";
import Loader from "utils/loader";
import { useCookies } from 'react-cookie'

import { useDispatch, useSelector } from "react-redux";
import CardDetail from "./cartDetail";
import { removeFromCart, userPurchaseSuccess } from "store/actions/users.actions";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { getCartFromCookies } from "utils/tool";

const UserCart = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading]= useState(false);
    const notifications = useSelector((state) => state.notifications)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getCartFromCookies();
        setCart(savedCart);
    }, []);
    
    const dispatch = useDispatch()

    const removeItem = (position) => {
        dispatch(removeFromCart(position))
    }

    const calculateTotal = () => {
        let total = 0
        cart.forEach(
            item=> {
                total += parseInt(item.price, 10)
            }
        )
        return total
    }

    const generateUnits = () => (
        [{
            description: "Guitars and accessories",
            amount:{
                currency_code:"USD",
                value:calculateTotal(),
                breakdown:{
                    item_total:{
                        currency_code:"USD",
                        value: calculateTotal()
                    }
                }
            },
            items: generateItems()
        }]
    )

    const generateItems = () => {
        let items = cart.map(
            (item)=>({
                unit_amount:{
                    currency_code:"USD",
                    value: item.price
                },
                quantity: 1,
                name: item.model
            })
        )
        return items
    }

    useEffect(()=>{
        console.log("inside useeff");
        console.log(notifications);
        
        if(notifications && notifications.success){
            console.log("onto navigate");
            
            navigate("/dashboard");
        }
        if(notifications && notifications.error){
            setLoading(false);
        }
    },[notifications, navigate])

    return (
        <DashboardLayout title="Your Cart">
        {cart && cart.length >0 ?
          <>
          {console.log(cart)}
          
          <CardDetail 
            products={cart}
            removeItem={(position)=>removeItem(position)}
          />
          <div className="user_cart_sum">
            <div>
                Total Amount: ${calculateTotal()}
            </div>
          </div>
          {loading?
          <Loader/>
            :
            <div className="pp_button">
                 <PayPalScriptProvider
                  options={{
                    clientId: 'AbZFmlrAJjTHLlLynl8k0s9B_2cMSs14HyVfZyP0oK4KKTjBXGCCaTBwVnGjSR84dIFTHTX2QL7HPkwz',
                    currency: "USD",
                    disableFunding: "credit,card",
                  }}
                >
                <PayPalButtons
                   createOrder={(data,actions)=>{
                    return actions.order.create({
                        purchase_units: generateUnits()
                    })
                   }}

                   onApprove={(details)=>{
                    console.log(details);
                    
                    dispatch(userPurchaseSuccess(details.orderID))
                    setLoading(true)
                   }}
                />
                </PayPalScriptProvider>
            </div>
        }
          </>
          : 
          <div>
            Cart is empty, add something :(
          </div>}
        </DashboardLayout>
    )

} 

export default UserCart;