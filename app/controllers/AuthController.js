const router = require("express").Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const Hash = require("../helpers/hash");
const { User } = require("../models/user");
const Mail = require("../helpers/mail");

// Auth Controller Validation 
const AuthValidation = {
    signup: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),

    login:Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required(),
    })
}

router.post("/signup", async (req, res) => {
    let body = req.body;
    let { error, value } = await AuthValidation.signup.validate(body);

    if (error) {
        return res.json({
            success: false,
            error: error,
        })
    }

    let user = await User.build({
        name: body.name,
        email: body.email,
        password: Hash.encrypt(body.password),
    });

    await user.save();

    Mail.sendMail({
        to:user.email,
        subject:"Register Successfully.",
        text:`${user.name} You Are Register Successfully.`,
        html:`<h1>${user.name} You Are Register Successfully.</h1>`
    });

    let authToken = await jwt.sign({
        user:user
    },config.auth_key);

    return res.json({
        success:true,
        data:user,
        token:authToken
    });
});

router.post("/login", async (req, res) => {
    let body = req.body;

    let { error, value } = await AuthValidation.login.validate(body);
    
    if(error){
        return res.json({
            success:false,
            error:error,
        });
    }
    

    let user = await User.findOne({
        where:{
            email:body.email,
        }
    });

    if(user){
        if(body.password === Hash.decrypt(user.password)){
            let authToken = await jwt.sign({
                user:user
            }, config.auth_key);
            return res.json({
                success:true,
                data:user,
                token:authToken
            });
        }
    }


    return res.json({
        success:false,
        msg: "Invalid Email Or Password."
    });
})

module.exports = router;