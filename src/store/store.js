import { createStore, combineReducers,compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import {uiReducers} from '../reducers/uiReducers'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducers,

})

export const store =  createStore(
reducers, 
composeEnhancers(applyMiddleware(thunk))

)