import React from 'react';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from '../actions/cartAction';

function ShippingScreen(props) {
    const [address,setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping(address,city,postalCode,country));
    }
    return (
        <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Shipping</h2>
        </li>
        <li>
          <label htmlFor="address">
            Address
          </label>
          <input type="name" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
          </input>
        </li>

        <li>
          <label htmlFor="city">
            City
          </label>
          <input type="name" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
          </input>
        </li>

        <li>
          <label htmlFor="country">
            Country
          </label>
          <input type="name" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
          </input>
        </li>

        <li>
          <label htmlFor="postalCode">
            Zip Code
          </label>
          <input type="name" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Continue</button>
        </li>
      </ul>
    </form>
  </div>
    )
}

export default ShippingScreen;
