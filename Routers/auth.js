const authController = require("../Controllers/auth");
const middleware= require("../middleware/authMiddleware");

const {Router} = require("express");
const authRouter=new Router();
authRouter.post("/login",authController.login);
authRouter.get("/getUser/:id",middleware.verifyToken,authController.getUserData);
authRouter.post("/changePass",middleware.verifyToken,authController.changePass);
module.exports=authRouter;