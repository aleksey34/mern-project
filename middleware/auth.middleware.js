const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req ,res , next)=>{
 if(req.method === "OPTIONS"){
     return next();
 }

 try {
     const token = req.headers.authorization.split(" ")[1]; //Bearer TOKEN  -- it views like this

     if(!token){
       return  res.status(401).json({message: "There is no authorization"})
     }
//console.log(config["jwtSecret"])   //  config.get('key')  / do not work / why??
//      const decoded = jwt.verify(token , config['jwtSecret']); // do not work / why???
     const decoded = jwt.decode(token , config['jwtSecret']);
     //console.log(decoded)
     req.user = decoded;

     next();


 }catch (e) {
     res.status(401).json({message: "There is no authorization"})
 }



}