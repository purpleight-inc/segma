
const {validator}= require('../../models/Order');
const {ObjectId}= require('bson');
describe('Order validation',()=>{
    let validAddress;
    let validOrderEntry;
    beforeAll(()=>{
        validAddress = {
            city:"Tlemcen",
            state:"state",
            zip:"13000",
            address:"06 Rue kada klocha pasteur",
        }
        validOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: ObjectId().toString(),
                name:"Cookies",
                price:100.00,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
            quantity:1,
        }
    });
    it("should succeed because of valid order",()=>{
        const validOrder = {
            address: validAddress,
            items:[validOrderEntry],
            dateOfOrder:new Date(),
        };
        
        const result= validator(validOrder);

        expect(result).not.toHaveProperty("error");
    });
    it("should not succeed because of missing dateOfOrder",()=>{
        const invalidOrder = {
            address: validAddress,
            items:[validOrderEntry],
        };
        
        const result= validator(invalidOrder);

        expect(result.error.details[0].path.join('.')).toEqual("dateOfOrder");
        expect(result.error.details).toHaveLength(1);
    });
    it("should not succeed because of missing items",()=>{
        const invalidOrder = {
            address: validAddress,
            items:[],
            dateOfOrder:new Date(),
        };
        
        const result= validator(invalidOrder);

        expect(result.error.details[0].path.join('.')).toEqual("items");
        expect(result.error.details).toHaveLength(1);
    });
    it("should not succeed because of missing items array",()=>{
        const invalidOrder = {
            address: validAddress,
            dateOfOrder:new Date(),
        };
        
        const result= validator(invalidOrder);

        expect(result.error.details[0].path.join('.')).toEqual("items");
        expect(result.error.details).toHaveLength(1);
    });

    it("should not succeed because of bad dateOfDelivery",()=>{
        const dateOfDelivery = new Date();
        
        dateOfDelivery.setMilliseconds(dateOfDelivery.getMilliseconds()-1000);
        const invalidOrder = {
            address: validAddress,
            items:[validOrderEntry],
            dateOfOrder:new Date(),
            dateOfDelivery
        };
        
        const result= validator(invalidOrder);

        expect(result.error.details[0].path.join('.')).toEqual("dateOfDelivery");
        expect(result.error.details).toHaveLength(1);
    });
})