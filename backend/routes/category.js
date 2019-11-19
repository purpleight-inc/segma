const express = require('express');
const app = express.Router();
const {Category,validator} = require('../models/Category');
const validation = require('../middleware/validation');
const _ = require('lodash');
//index
app.get('/',async (req,res)=>{
    const categories = await Category.find()
                                    .exec();
    return categories;
});
//create
app.post('/',[validation(validator)],async (req,res)=>{
    let category =new Category(_.pick(req.body,['name',"imageUrl","description"]));
    category = await category.save();
    res.status(200).json(category);
});
//show
app.get('/:id',async (req,res)=>{
    let category = await Category.findById(req.params.id).exec();
    if(!category){
        return res.status(404).send('404 - Resource Not Found');
    }
    res.status(200).json(category);
});
//update
app.put('/:id',[validation(validator)],async (req,res)=>{
    let category = await Category.findById(req.params.id).exec();
    if(!category){
        return res.status(404).send('404 - Resource Not Found');
    }
    category.update(_.pick(req.body,['name','imageUrl',"description"]))
    category = await category.save();
    res.status(200).json(category);
});
//delete
app.delete('/:id',async (req,res)=>{
    const category = await Category.findById(req.params.id).exec();
    if(!category){
        return res.status(404).send('404 - Resource Not Found');
    }
    await category.remove();
    res.status(200).json(category);
});

module.exports = app;