const express = require('express');
const app = express.Router();
const {ProductEntry,validator} = require('../models/ProductEntry');
const {Product} = require('../models/Product');
const validation = require('../middleware/validation');
const Fawn = require('fawn');
const mongoose = require('mongoose')
Fawn.init(mongoose);
//index
app.get('/',async (req,res)=>{
    const productEntries = await ProductEntry.find().exec();
    return res.status(200).json(productEntries);
});
//create
app.post('/',[validation(validator)],async (req,res)=>{
    const productEntry = new ProductEntry(req.body);
    try{
        await Fawn.Task()
            .save(ProductEntry,productEntry)
            .update(Product,{_id:req.body.productId},{
                $push:{
                    entries:productEntry,
                }
            }).run();

    }catch(e){
       return res.status(400).send('400 - Bad Request'); 
    }
    return res.status(200).json(productEntry);
});
//show
app.get('/:id',async (req,res)=>{
    const productEntry = await ProductEntry.findById(req.params.id).exec();
    if(!productEntry){
        return res.status(404).send('404 - Resource Not Found');
    }
    return res.status(200).json(productEntry);
});
//update
app.put('/:id',async (req,res)=>{
    let productEntry = await ProductEntry.findById(req.params.id).exec();
    if(!productEntry){
        return res.status(404).send('404 - Resource Not Found');
    }
    productEntry.update(req.body);
    productEntry = await productEntry.save();
    return res.status(200).json(productEntry);
});
//delete
app.delete('/:id',async (req,res)=>{
    const productEntry = await ProductEntry.findById(req.params.id).exec();
    if(!productEntry){
        return res.status(404).send('404 - Resource Not Found');
    }
    productEntry.remove();
    return res.status(200).json(productEntry);
});

module.exports = app;