const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {Address,joiAddressSchema} = require('./Address');
const {OrderEntry,joiOrderEntrySchema} = require('./OrderEntry');
const Schema = mongoose.Schema;
const schema = new Schema({
    address:{
        type:Address,
        required:true,
    },
    items:{
        type:[OrderEntry],
        required:true,
        validate:{
            validator:function(value){
                return value.length>=1;
            }
        }
    },
    dateOfOrder:{
        type:Date,
        required:true,
    },
    dateOfDelivery:{
        type:Date,
        validator:function(value) {
            return value>=this.dateOfOrder;
        }
    },
});
const joiOrderSchema = Joi.object({
    address:joiAddressSchema.required(),
    items:Joi.array()
            .items(joiOrderEntrySchema)
            .min(1)
            .required(),
    dateOfOrder:Joi.date()
                    .required(),
    dateOfDelivery:Joi.date().alter({
        create:(schema)=>schema.forbidden(),
    })
                        .greater(Joi.ref('dateOfOrder')),
});
function validator(order){ 
    return joiOrderSchema.validate(order);
}
exports.joiOrderSchema = joiOrderSchema;
exports.validator = validator;
exports.Order = mongoose.model('Order',schema);