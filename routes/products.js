const Product = require("../models/products");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
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









module.exports = router;