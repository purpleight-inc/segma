const express = require('express');
const app = express.Router();
const {Supplier,validator} = require('../models/Supplier');
const validation = require('../middleware/validation');
//index
app.get('/',async (req,res)=>{
    const suppliers = await Supplier.find().exec();
    return res.status(200).json(suppliers);
});
//create
app.post('/',[validation(validator)],async (req,res)=>{
    let supplier = new Supplier(req.body);
    supplier = await supplier.save();
    return res.status(200).json(supplier);
});
//show
app.get('/:id',async (req,res)=>{
    const supplier = await Supplier.findById(req.params.id);
    if(!supplier){
        return res.status(404).send("404 - Resource Not Found");
    }
    return res.status(200).json(supplier);
});
//update
app.put('/:id',async (req,res)=>{
    let supplier = await Supplier.findById(req.params.id);
    if(!supplier){
        return res.status(404).send("404 - Resource Not Found");
    }
    supplier.update(req.body);
    supplier = await supplier.save();
    return res.status(200).json(supplier);
});
//delete
app.delete('/:id',async (req,res)=>{
    const supplier = await Supplier.findById(req.params.id).exec();
    if(!supplier){
        return res.status(404).send("404 - Resource Not Found");
    }
    await supplier.remove();
    return res.status(200).json(supplier);
});

module.exports = app;