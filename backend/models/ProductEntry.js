const mongoose = require('mongoose');
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const Schema = mongoose.Schema;

const schema = new Schema({
    supplierId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Supplier"
    }
    ,price:{
        type:Number,
        required:true,
        min:0,
    },
    discount:{
        type:Number,
        min:0,
        max:1,
        default:0
    },
    initialQuantity:{
        type:Number,
        required:true,
        min:1,
    },
    boughtQuantity:{
        type:Number,
        default:0,
        min:0,
        validate:{
            validator:function(value) {
                return this.initialQuantity>=value;
            }
        }
    },
    dates:{
        type:{
            dateFab:{
                type:Date,
                required:true,
            },
            dateExp:{
                type:Date,
                required:true,
            },
        },
        validate:{
            validator:function(value){
                return value.dateFab<value.dateExp;
            }
        }
    },
});
const joiProductEntrySchema = Joi.object({
    supplierId:Joi.objectId()
                    .required(),
    price:Joi.number()
            .required()
            .min(0),
    discount:Joi.number()
                .min(0)
                .max(1.0),
    initialQuantity:Joi.number()
                        .integer()
                        .required()
                        .min(1),
    boughtQuantity:Joi.number()
                        .integer()
                        .min(0)
                        //TODO LESS THEN OR EQUAL NEEDED
                        .less(Joi.ref("initialQuantity"))
                        .alter({
                            create:(schema)=>schema.forbidden(),
                        }),
    date:Joi.object({
        dateFab:Joi.date()
                    .required(),
        dateExp:Joi.date()
                    .required()
                    .greater(Joi.ref("dateFab"))
    }),
});
function validator(productEntry){
    return joiProductEntrySchema.validate(productEntry);
}
exports.joiProductEntrySchema = joiProductEntrySchema;
exports.validator = validator;
exports.ProductEntry = mongoose.model('ProductEntry',schema);