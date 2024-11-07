import {combineReducers} from 'redux'
import users from './users.reducer'
import products from './products.reducers'
import notifications from './notifications.reducers' 

const appReducers = combineReducers({
    users,
    products,
    notifications
})

export default appReducers