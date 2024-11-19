import {combineReducers} from 'redux'
import users from './users.reducer'
import products from './products.reducers'
import notifications from './notifications.reducers' 
import brands from './brands.reducers'

const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands
})

export default appReducers