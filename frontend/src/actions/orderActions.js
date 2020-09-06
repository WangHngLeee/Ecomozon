import Axios from 'axios';
import { ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST } from '../constants/orderConstants';

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST, payload: order});
        const {userSignin : {userInfo}} = getState();
        const {data : {data: newOrder}} = await Axios.post("/api/orders", order, {
            headers:{
                Authorization: 'HomLee' + userInfo.token
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder});
    } catch (error) {
        dispatch({type:ORDER_CREATE_FAIL, payload: error.message});
    }
}

export {createOrder};

