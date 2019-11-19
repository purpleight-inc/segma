const express = require('express');
const app = express.Router();
const {Product,validator} = require('../models/Product');
const validation = require('../middleware/validation');
//index
app.get('/',async (req,res)=>{
   const products = await Product.find()
                            .exec();
    return res.status(200).json(products);
});
//create
app.post('/',[validation(validator)],async (req,res)=>{
    const product = new Product(req.body);
    product = await product.save();
    return res.status(200).json(product);
});
//show
app.get('/:id',async (req,res)=>{
    const product = await Product.findById(req.params.id).exec();
    if(!product){
        return res.status(404).send('404 - Resource Not Found');
    }
    return res.status(200).json(product);
});
//update
app.put('/:id',[validation(validator)],async (req,res)=>{
    let product = await Product.findById(req.params.id).exec();
    if(!product){
        return res.status(404).send('404 - Resource Not Found');
    }
    product.update(req.body);
    product = await product.save();
    return res.status(200).json(product);
});
//delete
app.delete('/:id',async (req,res)=>{
    const product = await Product.findById(req.params.id).exec();
    if(!product){
        return res.status(404).send('404 - Resource Not Found');
    }
    product.remove();
    return req.status(200).json(product);
});

module.exports = app;