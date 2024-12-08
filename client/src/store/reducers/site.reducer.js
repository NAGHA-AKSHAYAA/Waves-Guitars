import { GET_SITE_VARS } from "store/types"

let DEFAULT_SITE_STATE = {
    vars:{
        _id:"",
        address:"",
        hours:"",
        phone:"",
        email:""
    }
}

export default function siteReducers(state= DEFAULT_SITE_STATE, action){
    switch(action.type){
        case GET_SITE_VARS:
            return {...state, vars: action.payload}
        default:
            return state   
    }
}