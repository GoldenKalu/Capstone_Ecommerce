const { Products, validate } = require("../models/products");
const express = require("express");
const router = express.Router();





router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const products = new Products ({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        });

      await products.save();
 
      return res.send(products);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});




module.exports = router;