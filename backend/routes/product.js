const express = require('express');
const app = express.Router();
const {Product,validator} = require('../models/Product');
//index
app.get('/',async (req,res)=>{
    
});
//create
app.post('/',async (req,res)=>{
    
});
//show
app.get('/:id',async (req,res)=>{

});
//update
app.patch('/:id',async (req,res)=>{

});
//delete
app.delete('/:id',async (req,res)=>{
    
});

module.exports = app;