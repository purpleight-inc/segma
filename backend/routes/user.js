const express = require('express');
const app = express.Router();
const {User,validator} = require('../models/User');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const validation = require('../middleware/validation');
//index
app.get('/',async (req,res)=>{
    const users = await User.find()
                            .select("-_id userName email role address -password")
                            .exec();
    return res.status(200).json(users);
});
//create
app.post('/',async (req,res)=>{
    const users = await User.find().or([{email:req.body.email},{userName:req.body.email}]);
    if(users.length){
        return res.status(400).send('400 - Bad Request');
    }
    let user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();
    const token = user.generateAuthToken();
    res.header("Authorization",token).json(_.pick(user,['_id','userName','email','address','role']));
});
//show
//TODO ADD AUTHORIZATION FOR ADMIN AND OWNER
app.get('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id).exec();
    if(!user){
        return res.status(404).send('404 - Resource Not Found');
    }
    return res.status(200).json(_.pick(user,['_id','userName','email','address','role']));
});
//update
//TODO ADD AUTHORIZATION FOR ADMIN AND OWNER
//TODO ADD EMAIL VERIFICATION FOR PASSWORD RESET
//TODO MIGHT MOVE PASSWORD RESET TO A STANDALONE ROUTE
app.put('/:id',async (req,res)=>{
    let user = await User.findById(req.params.id).exec();
    if(!user){
        return res.status(404).send('400 - Resource Not Found');
    }
    user.update(_.pick(req.body,['_id','userName','email','address','role']));
    if(user.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
    }
    user = await user.save();
    return res.status(200).json(_.pick(user,['_id','userName','email','address','role']));
});
//delete
//TODO ADD AUTHORIZATION FOR ADMIN AND OWNER
app.delete('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id).exec();
    if(!user){
        return res.status(404).send('404 - Resource Not Found');
    }
    await user.remove();
    return res.status(200).json(_.pick(user,['_id','userName','email','address','role']));
});

module.exports = app;