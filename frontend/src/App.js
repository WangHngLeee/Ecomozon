import React from "react";
import "./App.css";
import { BrowserRouter, Route,Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';
import SigninScreen from'./screens/SigninScreen';
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Ecomozon</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            { userInfo ? <Link to="/profile" >Hi, {userInfo.name}</Link>: <Link to="/signin">Sign In</Link>}
            
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>

            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/payment" component={PaymentScreen}/>
            <Route path="/products" component= {ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen}/>
            <Route path="/signin" component= {SigninScreen} />
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route exact={true} path="/" component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
