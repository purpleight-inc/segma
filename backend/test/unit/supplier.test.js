const {ObjectId} = require('bson');
const {validator} = require('../../models/Supplier');

describe('Supplier validation',()=>{
    let validAddress;
    beforeAll(()=>{
        validAddress =  {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
            address:"06 Rue kada klocha pasteur",
        };
        
    })
    it('should succeed because of valid values',()=>{
        const validSupplier = {
            name:"Amine",
            adminId:ObjectId().toString(),
            address:validAddress
        }

        const result = validator(validSupplier);

        expect(result).not.toHaveProperty('error');
    });
    it('should not succeed because of missing name',()=>{
        const invalidSupplier = {
            adminId:ObjectId().toString(),
            address:validAddress
        }

        const result = validator(invalidSupplier);

        expect(result.error.details[0].path.join('.')).toEqual("name");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing address',()=>{
        const invalidSupplier = {
            name:"Amine",
            adminId:ObjectId().toString(),
        }

        const result = validator(invalidSupplier);

        expect(result.error.details[0].path.join('.')).toEqual("address");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of invalid adminId ObjectId',()=>{
        const invalidSupplier = {
            name:"Amine",
            adminId:"ObjectId().toString()",
            address:validAddress
        }

        const result = validator(invalidSupplier);

        expect(result.error.details[0].path.join('.')).toEqual("adminId");
        expect(result.error.details).toHaveLength(1);
    });
})