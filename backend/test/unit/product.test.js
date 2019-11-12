const {validator} = require('../../models/Product');
const {ObjectId} = require('bson');
describe('Product validation',()=>{
    let  validCategory;
    let validEntry;
    beforeAll(()=>{
        validCategory = {
            categoryId:ObjectId().toString(),
            name:"Cookies",
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
        };
        validEntry={
            id:ObjectId().toString(),
            price:100,
            discount:0,
        }
    })
    it('should succeed because of valid values',()=>{
        const validProduct={
            name:"Cookies",
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            codebar:"02311561A",
            description:"Tasty Cookies",
            category:validCategory,
            entries:[validEntry]
        }
        
        const result = validator(validProduct);
        
        expect(result).not.toHaveProperty('error');
    });
    it('should not succeed because of missing name',()=>{
        const invalidProduct={
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            codebar:"02311561A",
            description:"Tasty Cookies",
            category:validCategory,
            entries:[validEntry]
        }
        
        const result = validator(invalidProduct);
        
        expect(result.error.details[0].path.join('.')).toEqual('name');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing codebar',()=>{
        const invalidProduct={
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            name:"Cookies",
            description:"Tasty Cookies",
            category:validCategory,
            entries:[validEntry]
        }
        
        const result = validator(invalidProduct);
        
        expect(result.error.details[0].path.join('.')).toEqual('codebar');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing entries',()=>{
        const invalidProduct={
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            name:"Cookies",
            codebar:"02311561A",
            description:"Tasty Cookies",
            category:validCategory,
            entries:[]
        }
        
        const result = validator(invalidProduct);
        
        expect(result.error.details[0].path.join('.')).toEqual('entries');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing entries array',()=>{
        const invalidProduct={
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            name:"Cookies",
            codebar:"02311561A",
            description:"Tasty Cookies",
            category:validCategory,
            
        }
        
        const result = validator(invalidProduct);
        
        expect(result.error.details[0].path.join('.')).toEqual('entries');
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing category',()=>{
        const invalidProduct={
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            name:"Cookies",
            codebar:"02311561A",
            description:"Tasty Cookies",
            entries:[validEntry]
        }
        
        const result = validator(invalidProduct);
        
        expect(result.error.details[0].path.join('.')).toEqual('category');
        expect(result.error.details).toHaveLength(1);
    });
})