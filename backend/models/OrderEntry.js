const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const Schema = mongoose.Schema;
const schema = new Schema({
    product: {
        type: {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required:true,
            },
            entryId:{
                type:Schema.Types.ObjectId,
                ref:"ProductEntry",
                required:true,
            },
            name:{
                type:String,
                required:true,
                minLength:2,
                maxLength:255,
            },
            price:{
                type:Number,
                required:true,
                min:0,
            },
            imageUrl:{
                type:Number,
                minLength:4,
                maxLength:255,
            },
        },
        required:true,
    },
    quantity: {
        type: Number,
        required:true,
        min:1,
    },
});
const joiSchema = Joi.object({
    product: Joi.object({
        productId:Joi.objectId()
            .required(),
        entryId:Joi.objectId()
                    .required(),
        name:Joi.string()
                .required()
                .min(2)
                .max(255)
                .regex(/^[a-z0-9\s-]+$/i),
        price:Joi.number()
                .required()
                .min(0),
        imageUrl:Joi.string()
                    .uri()
                    .min(4)
                    .max(2048)
    })
    .required(),
    quantity:Joi.number()
                .integer()
                .required()
                .min(1),
});
function validator(orderEntry) {
    return joiSchema.validate(orderEntry)
}
exports.joiOrderEntrySchema = joiSchema;
exports.validator = validator;
exports.OrderEntry = schema;