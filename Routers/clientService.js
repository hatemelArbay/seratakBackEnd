const {Router} = require('express');
const serviceController = require('../Controllers/service');
const serviceRouter = Router();
serviceRouter.post('/postService',serviceController.postService);
serviceRouter.get("/getServices",serviceController.getServices);
serviceRouter.delete("/deleteService/:id",serviceController.deleteService);
serviceRouter.post("/updateService",serviceController.updateService);
module.exports=serviceRouter;