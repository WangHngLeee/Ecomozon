import {createStore} from 'redux';
import {productListReducer} from './reducers/productReducers'

const initialState = {};
const reducer = combineReducers({
    productList : productListReducer,
})
const store = createStore(reducer, initialState);

export default store;