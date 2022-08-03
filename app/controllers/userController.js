const router = require('express').Router();
const Middleware = require("../middlewares/index")
const { User, UserValidation, orders } = require('../models/user');
const { Order } = require("../models/Order");

// Get All User Data
router.get('/',async (req, res) => {
    let users = await User.findAll();
    return res.json({
        success: true,
        data: users
    });
});


// Get User Data By Id
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({
        where: {
            id: id
        },
        include:[
            "orders",
        ],
    });


    if(! user){
        return res.json({
            success:false,
            msg:"User Not Found."
        })
    }

    return res.json({
        success: true,
        data: user,
    })
});


// Method For Create New User
router.post("/", async (req, res) => {
    let body = req.body;
    let { error, value } = UserValidation.store.validate(body);

    if (error) {
        return res.json({
            success: false,
            error: error
        })
    }

    let user = await User.build({
        name: body.name,
        email: body.email,
        password: body.password,
    });

    await user.save()

    return res.json({
        success: true,
        data:user,
    })
});


// Method For Update User
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let { error, value } = UserValidation.update.validate(body);

    if(error){
        return res.json({
            success:false,
            error:error
        })
    }

    let user = await User.findOne({
        where:{
            id:id
        }
    });

    if(! user){
        return res.json({
            success:false,
            msg:"User Not Found",
        })
    }

    user.set({
        name:body.name,
        email:body.email,
        password:body.password
    });

    await user.save();

    return res.json({
        success:true,
        msg:"User Updated Successfuly.",
        data:user
    })
})


// Method For Delete User
router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    let user = await User.findOne({
        where:{
            id:id
        }
    });

    if(! user){
        return res.json({
            success:false,
            msg:"User Not Found.",
        });
    }

    await user.destroy();

    return res.json({
        success: true,
        msg:"User Deleted Successfully.",
    })
})

// Get User Orders
router.get("/orders", async (req, res) => {
    let userId = req.auth.id;

    // let orders = await User.hasOne
})

module.exports = router;