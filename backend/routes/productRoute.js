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
    const newProduct = await Product.save();
    if(newProduct){
        return res.status(201).send({message: "New product created", data : newProduct});
    }
    return res.status(500).send({message:"Error in creating new product"});
});

router.put("/:id", async (req,res) => {
    const productId = req.params.id;
    const product = await Product.findById({_id: productId});
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;
        product.category = req.body.category;

        const updatedProduct = await product.save();
        if(updatedProduct){
            return res.status(200).send({message: "Product updated", data : updatedProduct});
        }
    }
    return res.status(500).send({message:"Error in updating new product"});

});
export default router;
