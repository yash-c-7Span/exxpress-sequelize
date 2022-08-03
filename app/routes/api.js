const router = require("express").Router();
const Middleware = require("../middlewares/index");
const { userController, AuthController } = require("../controllers/index");


// Auth Routes
router.use("/auth", AuthController);

router.use('/users', Middleware.checkAuthUser ,userController);

module.exports = router;


