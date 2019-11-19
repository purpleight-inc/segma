const express = require('express');
const app = express.Router();
const {Order,validator} = require('../models/Order');
const validation = require('../middleware/validation');
const _ = require('lodash');
//index
app.get('/',,async (req,res)=>{
    const orders = Order.find()
                        .exec();
    return orders;

});
//create
app.post('/',[validation(validator)],async (req,res)=>{
    let order = new Order(_.pick(req.body,['address','items','dateOfOrder','dateOfDelivery']));
    order = await order.save();
    res.status(200).json(order);

});
//show
app.get('/:id',async (req,res)=>{
    const order = await Order.findById(req.params.id).exec();
    if(!order){
        return res.status(404).send('404 - Resource Not Found');
    }
    return res.status(200).json(order);
});
//update
app.put('/:id',[validation(validator)],async (req,res)=>{
    const order = await Order.findById().exec();
    if(!order){
        return res.status(404).send('404 - Resource Not Found');
    }
    order.update(req.body);
    order = await order.save();
    return res.status(200).json(order);
});
//delete
app.delete('/:id',async (req,res)=>{
    const order = await Order.findById(req.params.id).exec();
    if(!order){
        return res.status(404).send('404 - Resource Not Found');
    }
    await order.remove();
    return res.status(200).json(order);
});

module.exports = app;