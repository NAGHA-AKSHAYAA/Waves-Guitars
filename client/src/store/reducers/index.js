import {combineReducers} from 'redux'
import users from './users.reducer'
import products from './products.reducers'
import notifications from './notifications.reducers' 
import brands from './brands.reducers'
import site from './site.reducer'

const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands,
    site
})

export default appReducers