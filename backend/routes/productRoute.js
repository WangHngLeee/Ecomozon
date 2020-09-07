import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth} from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: -1 }
        : { price: 1 }
      : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
    res.send(products);
  });

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  });

router.post("/", isAuth, isAdmin, async (req,res) => {
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
});

router.put("/:id",isAuth, isAdmin, async (req,res) => {
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

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});


export default router;
