const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
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
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:4,
        maxlength:500,
    },
});
const joiCategorySchema = Joi.object({
    name:Joi.string()
            .min(2)
            .max(255)
            .required()
            .regex(/^[a-z0-9\s-]+$/i),
    imageUrl:Joi.string()
                .min(4)
                .max(2048)
                .required()
                .uri(),
    description:Joi.string()
                    .min(4)
                    .max(500)
                    .required(),
});
function validator(category){
    return joiCategorySchema.validate(category);
}
exports.joiCategorySchema = joiCategorySchema;
exports.Category = mongoose.model('Category',schema);
exports.validator = validator;