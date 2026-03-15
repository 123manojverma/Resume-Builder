const {Router}=require("express")
const authController=require("../controllers/auth.controller")

const authRouter=Router()

/**
 * @route POST  /api/auth/signup
 * @description Register a new user
 * @access Public
 */

authRouter.post("/signup",authController.SignUp)

/**
 * @route POST /api/auth/signin
 * @description login user with email and password
 * @access Public
 */

authRouter.post("/signin",authController.SignIn)

module.exports=authRouter