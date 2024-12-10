import axios from "axios";
import cookie from 'react-cookies'
import * as actions from './index'
import { getAuthHeader, removeTokenCookie, gettokenCookie, setCartInCookies } from "utils/tool";
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const userRegister = (values) => {
    return async(dispatch) => {
        try {
            const user = await axios.post(`https://waves-theta.vercel.app/api/auth/register`,{
                email : values.email,
                password : values.password
            });

            dispatch(actions.userAuthenticate({
                data: user.data,
                auth: true
            }))
            dispatch(actions.successGlobal('Welcome!! check mail to verify account'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}


export const userSignIn = (values) => {
    return async(dispatch) => {
        try {
            const user = await axios.post(`https://waves-theta.vercel.app/api/auth/signin`,{
                email : values.email,
                password : values.password
            });

            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.successGlobal('Welcome!!'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userIsAuth = () => {
    return async(dispatch) => {
        try {

            const site = await axios.get(`https://waves-theta.vercel.app/api/site`)
            dispatch(actions.siteGetVars(site))
            if (!gettokenCookie()) {
                throw new Error();
              }
              const user = await axios.get("https://waves-theta.vercel.app/api/auth/isauth", getAuthHeader());
            dispatch(actions.userAuthenticate({data: user.data, auth:true}))
        } catch (error) {
            dispatch(actions.userAuthenticate({data:{}, auth:false}))
        }
    }
}

export const userSignOut = () => {
    return async(dispatch) => {
        removeTokenCookie();
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal('Good Bye'))
    }
}

export const userUpdateProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            
            const profile = await axios.patch(`https://waves-theta.vercel.app/api/user/profile`,{
                data: data
            }, getAuthHeader());

            console.log(profile);
            

            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname
            }

            console.log(userData);
            

            dispatch(actions.userUpdateProfile(userData))
            dispatch(actions.successGlobal('Profile Updated !'))

            
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userChangeEmail = (data) => {
    return async(dispatch) => {
        try {
            await axios.patch(`https://waves-theta.vercel.app/api/user/email`,
                {
                    email:data.email, 
                    newemail: data.newemail
                },
                getAuthHeader()
            )
            dispatch(actions.userUpdateProfile(data.newemail))
            dispatch(actions.successGlobal("Good Job"))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userAddToCart = (data) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart
            dispatch(actions.userAddToCart([
                ...cart, 
                data
            ]))
            const updatedCart = [...cart, data];
            setCartInCookies(updatedCart);
            dispatch(actions.successGlobal(`${data.model} added to cart`))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeFromCart = (position) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart
            cart.splice(position,1)
            setCartInCookies(cart);
            dispatch(actions.userAddToCart(cart))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userPurchaseSuccess = (orderId) => {
    return async (dispatch) => {
        try {
           const user = await axios.post(`https://waves-theta.vercel.app/api/transaction/`,{
            orderId
           }, getAuthHeader())

           dispatch(actions.successGlobal('Thank You !!'))
           dispatch(actions.userPurchaseSuccess(user.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}