const {Router} = require("express");
const bundleController= require("../Controllers/bundle");

const bundleRouter = new Router();

bundleRouter.post("/addBundle",bundleController.postBundle);
bundleRouter.get("/getBundles",bundleController.getBundles);
bundleRouter.delete("/deleteBundle/:id",bundleController.deleteBundle);
bundleRouter.post("/updateBundle",bundleController.updateBundle);
module.exports = bundleRouter;