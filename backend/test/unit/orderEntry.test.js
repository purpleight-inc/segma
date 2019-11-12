const {ObjectId} = require('bson');
const {validator} = require('../../models/OrderEntry');
describe('OrderEntry validation',()=>{
    it("should succeed because of valid values",()=>{
        const validOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: ObjectId().toString(),
                name:"Cookies",
                price:100.00,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
            quantity:1,
        }
        const result = validator(validOrderEntry);

        expect(result).not.toHaveProperty('error');

    });
    it('should not succeed because of missing products',()=>{
        const invalidOrderEntry={
            quantity:1,
        }
        const result = validator(invalidOrderEntry);

        expect(result.error.details[0].path.join('.')).toEqual('product');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing quantity',()=>{
        const invalidOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: ObjectId().toString(),
                name:"Cookies",
                price:100.00,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
        }
        const result = validator(invalidOrderEntry);

        expect(result.error.details[0].path.join('.')).toEqual('quantity');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of invalid ObjectId',()=>{
        const invalidOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: "ObjectId().toString()",
                name:"Cookies",
                price:100.00,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
            quantity:1,
        }
        const result = validator(invalidOrderEntry);

        expect(result.error.details[0].path.join('.')).toEqual('product.entryId');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of invalid price',()=>{
        const invalidOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: ObjectId().toString(),
                name:"Cookies",
                price:-1,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
            quantity:1,
        }
        const result = validator(invalidOrderEntry);

        expect(result.error.details[0].path.join('.')).toEqual('product.price');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of invalid quantity',()=>{
        const invalidOrderEntry={
            product:{
                productId: ObjectId().toString(),
                entryId: ObjectId().toString(),
                name:"Cookies",
                price:100,
                imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            },
            quantity:0,
        }
        const result = validator(invalidOrderEntry);

        expect(result.error.details[0].path.join('.')).toEqual('quantity');
        expect(result.error.details).toHaveLength(1);
    });
});