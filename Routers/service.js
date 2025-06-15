const {Router} = require('express');
const serviceController = require('../Controllers/service');
const middleware= require("../middleware/authMiddleware");
const serviceRouter = Router();
serviceRouter.post('/postService',middleware.verifyToken,serviceController.postService);
serviceRouter.get("/getServices",middleware.verifyToken,serviceController.getServices);
serviceRouter.delete("/deleteService/:id",middleware.verifyToken,serviceController.deleteService);
serviceRouter.post("/updateService",middleware.verifyToken,serviceController.updateService);
module.exports=serviceRouter;