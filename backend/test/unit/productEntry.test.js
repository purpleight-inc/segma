const {ObjectId} = require('bson');
const {validator} = require('../../models/ProductEntry');
describe('ProductEntry validation',()=>{
    it('should succeed becauuse of valid values',()=>{
        const productEntry = {
            supplierId: ObjectId().toString(),
            price:100,
            discount:0,
            initialQuantity:1,
        };
        
        const result = validator(productEntry);

        expect(result).not.toHaveProperty('error');
    });
    it('should succeed becauuse of invalid boughtQuantity',()=>{
        const productEntry = {
            supplierId: ObjectId().toString(),
            price:100,
            discount:0,
            initialQuantity:1,
            boughtQuantity:2
        };
        
        const result = validator(productEntry);

        expect(result.error.details[0].path.join('.')).toEqual("boughtQuantity");
        expect(result.error.details).toHaveLength(1);
    });
    it('should succeed becauuse of invalid date object missing both dateFab and dateExp',()=>{
        const productEntry = {
            supplierId: ObjectId().toString(),
            price:100,
            discount:0,
            initialQuantity:1,
            date:{

            }
        };
        
        const result = validator(productEntry);

        expect(result.error.details[0].path.join('.')).toEqual("date.dateFab");
        expect(result.error.details).toHaveLength(1);
    });
    it('should succeed becauuse of invalid date object missing dateExp',()=>{
        const productEntry = {
            supplierId: ObjectId().toString(),
            price:100,
            discount:0,
            initialQuantity:1,
            date:{
                dateFab:new Date()
            }
        };
        
        const result = validator(productEntry);

        expect(result.error.details[0].path.join('.')).toEqual("date.dateExp");
        expect(result.error.details).toHaveLength(1);
    });
    it('should succeed becauuse of invalid dateExp',()=>{
        const productEntry = {
            supplierId: ObjectId().toString(),
            price:100,
            discount:0,
            initialQuantity:1,
            date:{
                dateFab:new Date(),
                dateExp:new Date(2018,1),
            }
        };
        
        const result = validator(productEntry);

        expect(result.error.details[0].path.join('.')).toEqual("date.dateExp");
        expect(result.error.details).toHaveLength(1);
    });
})