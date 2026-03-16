const {Router}=require("express")
const authController=require("../controllers/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")

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

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */

authRouter.get("/logout",authController.Logout)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

module.exports=authRouter