const mongoose = require('mongoose');
const {Address,joiAddressSchema} = require('./Address');
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const roles = ["ADMIN","TRANSPORTER","SUPPLIER","USER"];
//TODO WE MIGHT REPLACE USERNAME WITH FIRST AND LAST NAME 

const schema = new Schema({
    userName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:255,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        minlength:4,
        maxlength:255,
        unique:true,
    },
    role:{
        type:String,
        enum:roles,
        required:true,
        minlength:4,
        maxlength:255,
    },
    address:{
        type:Address,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const joiUserSchema = Joi.object({
    userName:Joi.string()
                .required()
                .min(4)
                .max(255)
                .regex(/^[a-z0-9-_]*$/i),
    email:Joi.string()
            .email()
            .required(),
    role:Joi.string()
            .required()
            .valid(...roles),
    address:joiAddressSchema.required(),
    password:Joi.string()
                .required()
                .min(8)
                .max(32)
                .regex(/^[a-z0-9A-Z]*[A-Z][a-z0-9A-Z]+$/),
});

function validator(user) {
    return joiUserSchema.validate(user);
}
exports.joiUserSchema = joiUserSchema;
exports.User = mongoose.model('User',schema);
exports.validator = validator;