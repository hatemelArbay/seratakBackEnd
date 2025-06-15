const {Router} = require("express");
const bundleController= require("../Controllers/bundle");
const middleware= require("../middleware/authMiddleware");

const bundleRouter = new Router();

bundleRouter.post("/addBundle",middleware.verifyToken,bundleController.postBundle);
bundleRouter.get("/getBundles",middleware.verifyToken,bundleController.getBundles);
bundleRouter.delete("/deleteBundle/:id",middleware.verifyToken,bundleController.deleteBundle);
bundleRouter.post("/updateBundle",middleware.verifyToken,bundleController.updateBundle);
module.exports = bundleRouter;