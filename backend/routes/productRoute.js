import express from 'express';
import Product from '../models/productModel';
import {getToken} from '../util';

const router = express.Router();

router.get("/", async (req,res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", async (req,res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        description: req.body.description,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,
        category: req.body.category,
        rating: req.body.rating,
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: "New product created", data : newProduct});
    }
    return res.status(500).send({message:"Error in creating new product"});
})
export default router;
