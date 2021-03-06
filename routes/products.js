const { Product, validate } = require("../models/product");
const express = require("express");
const router = express.Router();

// get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// get individual products

router.get('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

        return res.send(product);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


// post new products
router.post('/product', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const product = new Product ({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        });

      await product.save();
 
      return res.send(product);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        },
        { new: true }
    );

    if (!product)
        return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });


// delete product from shoppingCart
router.delete('/shoppingCart/:userID/:productId', async (req, res) => {
    try {
   
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
        return res.send(product);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });  




module.exports = router;