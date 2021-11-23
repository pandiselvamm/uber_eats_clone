import { combineReducers } from 'redux';

import cartReducer from './cartReducers'
import userReducers from './LoginReducers'

let reducers = combineReducers({
    cartReducer: cartReducer,
    userReducers: userReducers
});

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer;