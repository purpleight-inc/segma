const {validator}=require('../../models/Category');

describe("Category validation",()=>{
    it("should succeed because of valid values",()=>{
        const validCategory = {
            name:"Cookies",
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            description:"tasty cookies"
        }

        const result = validator(validCategory);

        expect(result).not.toHaveProperty('error');
    });
    it("should not succeed because of missing values",()=>{
        const validCategory = {
            name:"Cookies",
            description:"tasty cookies"
        }

        const result = validator(validCategory);

        expect(result.error.details[0].path.join('.')).toEqual('imageUrl');
        expect(result.error.details).toHaveLength(1);
    });
    it("should not succeed because of min length",()=>{
        const validCategory = {
            name:"Cookies",
            imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi5i-GbjN_lAhXK4IUKHUP2ASEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fen.wikipedia.org%252Fwiki%252FCookie%26psig%3DAOvVaw3a657NVrUZC44EJUuN0pIW%26ust%3D1573456456897070&psig=AOvVaw3a657NVrUZC44EJUuN0pIW&ust=1573456456897070",
            description:"tas"
        }

        const result = validator(validCategory);

        expect(result.error.details[0].path.join('.')).toEqual('description');
        expect(result.error.details).toHaveLength(1);
    });
    it("should not succeed because imageUrl is not uri",()=>{
        const validCategory = {
            name:"Cookies",
            imageUrl:"Hello World",
            description:"tast"
        }

        const result = validator(validCategory);

        expect(result.error.details[0].path.join('.')).toEqual('imageUrl');
        expect(result.error.details).toHaveLength(1);
    });
})