const mongoose = require('mongoose');
const {Address,joiAddressSchema} = require('./Address');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    },
    adminId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    address:{
        type:Address,
        required:true,
    }
});
const joiSupplierSchema = Joi.object({
    name:Joi.string()
            .required()
            .min(2)
            .max(255)
            .regex(/^[a-z0-9\s-]+$/i),
    adminId:Joi.objectId()
                .required(),
    address:joiAddressSchema.required()
});
function validator(supplier){
    return joiSupplierSchema.validate(supplier);
}
exports.joiSupplierSchema = joiSupplierSchema;
exports.validator = validator;
exports.Supplier = mongoose.model('Supplier',schema);

