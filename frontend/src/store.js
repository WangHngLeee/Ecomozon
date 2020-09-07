import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers'
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/cartReducers';
import Cookie from 'js-cookie';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { OrderCreateReducer, OrderPayReducer, MyOrderListReducer} from './reducers/orderReducers';
import { OrderDetailsReducer } from './reducers/orderReducers';
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems,shipping:{}, payment:{}},userSignin: {userInfo}};

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: OrderCreateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    userUpdate : userUpdateReducer,
    myOrderList: MyOrderListReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;