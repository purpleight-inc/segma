const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;
const schema = new Schema({
    city:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    },
    state:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    },
    zip:{
        type:String,
        required:true,
        minlength:1,
        maxlength:255,
    },
    address:{
        type:String,
        required:true,
        minlength:4,
        maxlength:255,
    },
});

const joiAddressSchema = Joi.object({
    city:Joi.string()
            .required()
            .min(2)
            .max(255)
            .regex(/^[a-z0-9\s-]+$/i),
    state:Joi.string()
            .required()
            .min(2)
            .max(255)
            .regex(/^[a-z0-9\s-]+$/i),
    zip:Joi.string()
            .required()
            .min(1)
            .max(255)
            .regex(/^[a-z0-9\s-]+$/i),
    address:Joi.string()
                .required()
                .min(4)
                .max(255)
                .regex(/^[a-z0-9\s-]+$/i),
});

function validator(address){ 
    return joiAddressSchema.validate(address);
}
exports.joiAddressSchema = joiAddressSchema;
exports.validator = validator;
exports.Address = schema;