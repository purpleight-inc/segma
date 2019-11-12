const {validator} = require('../../models/User');
describe('User validation',()=>{
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

        const validUser = {
            userName:"Amine",
            email:"amine@gmail.com",
            role:"ADMIN",
            address:validAddress,
            password:'Demon131thed'
        }

        const result = validator(validUser);

        expect(result).not.toHaveProperty('error');
    });
    it('should not succeed because of invalid password',()=>{

        const invalidUser = {
            userName:"Amine",
            email:"amine@gmail.com",
            role:"ADMIN",
            address:validAddress,
            password:'emon131thed'
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("password");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing password',()=>{

        const invalidUser = {
            userName:"Amine",
            email:"amine@gmail.com",
            role:"ADMIN",
            address:validAddress,
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("password");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of min length of password',()=>{

        const invalidUser = {
            userName:"Amine",
            email:"amine@gmail.com",
            role:"ADMIN",
            address:validAddress,
            password:'1234567'
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("password");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing userName',()=>{

        const invalidUser = {
            email:"amine@gmail.com",
            role:"ADMIN",
            address:validAddress,
            password:"Demon131thed"
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("userName");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing email',()=>{

        const invalidUser = {
            userName:"amine",
            role:"ADMIN",
            address:validAddress,
            password:"Demon131thed"
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("email");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of missing role',()=>{

        const invalidUser = {
            userName:"amine",
            email:"amine@gmail.com",
            address:validAddress,
            password:"Demon131thed"
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("role");
        expect(result.error.details).toHaveLength(1);
    });
    it('should not succeed because of invalid role',()=>{

        const invalidUser = {
            userName:"amine",
            email:"amine@gmail.com",
            role:"SOMETHING",
            address:validAddress,
            password:"Demon131thed"
        }

        const result = validator(invalidUser);

        expect(result.error.details[0].path.join('.')).toEqual("role");
        expect(result.error.details).toHaveLength(1);
    });
})