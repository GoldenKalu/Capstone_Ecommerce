const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 200 },
    desscription: { type: String, required: true },
    category: { type: String, required: true, minlength: 5, maxlength: 50 },
    price: { type: Number, required: true },
    dateModified: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);