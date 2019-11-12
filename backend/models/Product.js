const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {ProductEntry,joiProductEntrySchema} = require('./ProductEntry');
Joi.objectId = require('joi-objectid')(Joi);

const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    },
    imageUrl:{
        type:String,
        minlength:4,
        maxlength:2048,
    },
    codebar:{
        type:String,
        required:true,
        minlength:4,
        maxlength:255,
        unique:true,
    },
    description:{
        type:String,
        required:true,
        minlength:4,
        maxlength:500,
    },
    category:{
        type:{
            categoryId:{
                type:Schema.Types.ObjectId,
                ref:"Category",
                required:true,
            },
            name:{
                type:String,
                required:true,
                minlength:2,
                maxlength:255,
            },
            imageUrl:{
                type:String,
                minlength:4,
                maxlength:2048,
                required:true,
            }
        },
        required:true,
    },
    entries:{
        type:[{
            id:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:"ProductEntry"
            },
            price:{
                type:Number,
                min:0,
                required:true
            },
            discount:{
                type:Number,
                min:0,
                max:1,
                default:0
            },
        }],
        required:true,
        validate:{
            validator:function(value){
                return value.length>=1;
            }
        }
    }
});
const joiProductSchema = Joi.object({
    name:Joi.string()
            .required()
            .min(2)
            .max(255)
            .regex(/^[a-z0-9\s-]+$/i),
    imageUrl:Joi.string()
                .uri()
                .min(4)
                .max(2048),
    codebar:Joi.string()
                .min(4)
                .max(255)
                .required()
                .alphanum(),
    description:Joi.string()
                    .min(4)
                    .max(500)
                    .required(),
    category:Joi.object({
        categoryId:Joi.objectId()
                    .required(),
        name:Joi.string()
                .required()
                .min(2)
                .max(255)
                .regex(/^[a-z0-9\s-]+$/i),
        imageUrl:Joi.string()
                    .uri()
                    .min(4)
                    .required()
                    .max(2048),
                }).required(),
    entries:Joi.array()
                .min(1)
                .items(
                    Joi.object({
                        id:Joi.objectId()
                                .required(),
                        price:Joi.number()
                                    .min(0)
                                    .required(),
                        discount:Joi.number()
                                    .min(0)
                                    .max(1)

                    })
                )
                .required()
        
    
})
function validator(product){
    return joiProductSchema.validate(product);
}
exports.joiProductSchema = joiProductSchema
exports.validator  = validator;
exports.Product = mongoose.model('Product',schema);