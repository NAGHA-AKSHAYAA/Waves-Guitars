import { getAuthHeader } from 'utils/tool'
import * as actions from './index'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'


export const updateSiteVars = (args) => {
    return async(dispatch) => {
        try {
            const site = await axios.patch(`/api/site`,args, getAuthHeader());
            dispatch(actions.updateSiteVars(site.data))
            dispatch(actions.successGlobal('Done !!'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
            
        }
    }
}