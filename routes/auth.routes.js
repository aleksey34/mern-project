const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const {check , validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('config');

const router = Router();

// /api/auth/register
router.post(
    '/register' ,
    [
        check('email', 'Email is uncorrected').isEmail(),
        check('password', 'min lenght of pass - 6 letters').isLength({min:6})
    ],
    async (req,res)=>{
      //  console.log(req.body);
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return  res.status(400).json(
                    {errors: errors.array(),
                        message: "Data of registration is uncorrected"}
                    );
            }


            const {email , password} = req.body;
            const candidate = await  User.findOne({email});
            if(candidate){
                return  res.status(400).json({message:"Such a user  already existed "});

            }else{
                const hashedPassword = await bcrypt.hash(password , 12); // 12 - this is sold
                const user = new User({email , password: hashedPassword});
                await user.save();
                res.status(201 ).json({message: "New user created"});
            }

        }catch (e) {
            res.status(400).json({message:"Something is going wrong"})
            console.log(e.message);
        }
})

// /api/auth/login
router.post(
    "/login" ,
    [
check('email' , "enter correct email").normalizeEmail().isEmail(),
check('password' , 'enter password').exists()
    ],
    async (req, res)=>{


        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return  res.status().json({errors: errors.array(), message: "Data of auth is uncorrected"});
            }

            const {email , password} = req.body;

            const user = await  User.findOne({email});
            if(!user){
                return res.status(400).json({message:'There is no such a user'})
            }
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch){
               return res.status(400).json({messsage: "Password is uncorrected"})
            }

            const token = jwt.sign({userId: user.id} ,
                config.get('jwtSecret'),
                {expiresIn: '1h'});
             return res.json({token, userId: user.id});


        }catch (e) {
            res.status(500).json({message:"Something is going wrong"})
            console.log(e.message);
        }



})




module.exports = router;

