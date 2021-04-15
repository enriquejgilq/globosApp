import { createStore, combineReducers,compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import {uiReducers} from '../reducers/uiReducers'
import {authReducerBack} from '../reducers/authReducerBack'
import {categoryReducer} from '../reducers/categoryReducer'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducers,
    authBack: authReducerBack,
    categories: categoryReducer


})

export const store =  createStore(
reducers, 
composeEnhancers(applyMiddleware(thunk))

)