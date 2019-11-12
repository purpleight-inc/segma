const {validator} = require('../../models/Address');
describe("Address validation",()=>{
    it("should succeed because of valid values",()=>{
        const someValidAddress = {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
            address:"06 Rue kada klocha pasteur",
        }
        
        const result = validator(someValidAddress);

        expect(result).not.toHaveProperty("error");
    });
    
    it("should not succeed because of special symbol",()=>{
        const anInvalidAddress = {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
            address:"$",
        }
        
        const result = validator(anInvalidAddress);

        expect(result.error.details[0].path.join('.')).toEqual("address");
        expect(result.error.details).toHaveLength(1);
    });

    it("should not succeed because of min length 4",()=>{
        const anInvalidAddress = {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
            address:"0",
        }
        
        const result = validator(anInvalidAddress);

        expect(result.error.details[0].path.join('.')).toEqual("address");
        expect(result.error.details).toHaveLength(1);
    });
    it("should not succeed because of missing required values",()=>{
        const anInvalidAddress = {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
        }
        
        const result = validator(anInvalidAddress);

        expect(result.error.details[0].path.join('.')).toEqual("address");
        expect(result.error.details).toHaveLength(1);
    });
    
})