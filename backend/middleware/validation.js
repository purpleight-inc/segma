module.exports = (validator,msg)=>{
    return (req,res,next)=>{
        const {error} = validator(req.body);
        if(error){
            return res.status(400).send(msg || "400 - Bad Request Invalid Data");
        }
        next();
    }
}