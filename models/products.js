const Joi = require('joi');
const mongoose = require('mongoose');
const joi = require('joi');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 200 },
    description: { type: String, required: true },
    category: { type: String, required: true, minlength: 5, maxlength: 50 },
    price: { type: Number, required: true },
    dateModified: { type: Date, default: Date.now },
});

const Products = mongoose.model('Products', productsSchema);

function validateProducts(products) {
    const schema = joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(5).max(50).required(),
        price: Joi.number().required(),
    });
    return schema.validate(products);
}







exports.Products = Products;
exports.validate = validateProducts;
exports.productsSchema = productsSchema;