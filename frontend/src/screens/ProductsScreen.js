import React from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct, listProducts } from "../actions/productActions";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector(state => state.productSave);

  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);

  const openModal =(product) => {
    setModalVisible(true);
    setName(product.name);
    setId(product._id);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id:id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button onClick={()=>openModal({})}>Create Product</button>
      </div>
    { modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Create Product</h2>
            </li>
            <li>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                value={price}
                name="price"
                id="price "
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                value={image}
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                value={brand}
                name="brand"
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="countInStock">CountInStock</label>
              <input
                type="text"
                value={countInStock}
                name="countInStock"
                id="countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                value={category}
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={description}
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">
                {id? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">
                Back
              </button>
            </li>
          </ul>
        </form>
      </div>
      }
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModal(product)}>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
            ;
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsScreen;
