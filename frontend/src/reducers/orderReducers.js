const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL } = require("../constants/orderConstants");


function OrderCreateReducer(state = {}, action){
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function OrderDetailsReducer(state = {
    order : {
        orderItems: [],
        shipping: {},
        payment: {}
    } }, action){
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function OrderPayReducer(state = {
    order : {
        orderItems: [],
        shipping: {},
        payment: {}
    } }, action){
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true};
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


export {OrderCreateReducer,OrderDetailsReducer, OrderPayReducer}