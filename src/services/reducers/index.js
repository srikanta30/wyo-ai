import {combineReducers} from 'redux';
import promptReducer from './promptReducer';
import productReducer from './productReducer';


const reducers = combineReducers({
    prompt: promptReducer,
    product: productReducer,
})

export default reducers;