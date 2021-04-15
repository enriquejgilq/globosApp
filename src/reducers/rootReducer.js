import {combineReducers} from 'redux'
import {authReducerBack} from './authReducerBack'
import {authReducer} from './authReducer'



export const rootReducer = combineReducers({
    auth : authReducer,
    auth: authReducerBack
})