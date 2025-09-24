const express = require('express');
const dotenv= require("dotenv"); 
const app = express();
const cors = require('cors');
const serverless = require("serverless-http");
app.use(express.json()); 

dotenv.config({
    path:'./.env'
});

const allowedOrigins = [
  // 'http://localhost:3000',
  // 'http://localhost:8080',https://seretak.com/
  'https://seretak.com',
  'https://admin.seretak.com',
  'https://seratak.netlify.app',
  'https://seratakadmin.netlify.app',
  'http://localhost:3000',
  "http://localhost:8080"
 
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if you're sending cookies or auth headers
}));

//  app.use(cors({
//   // origin: 'http://localhost:3000' 
//   origin:"http://localhost:8080"
// }));
  
const initDbConnection = require('../config/dbConnection');
// const serviceRouter = require('../Routers/service');
// const bundleRouter = require("../Routers/bundle");
// const authRouter = require("../Routers/auth");
// const clientServiceRouter = require('../Routers/clientService');
// const clientBundleRouter= require("../Routers/clientBundle");
const bundleController= require("../Controllers/bundle");
const serviceController = require('../Controllers/service');
const authController = require("../Controllers/auth");
const paymentController = require("../Controllers/payments");
const middleware= require("../middleware/authMiddleware");
const blogController = require('../Controllers/blog');
const contactRequestController = require('../Controllers/contactRequest');

(async () => {
  await initDbConnection();
})();   

// app.use('/service',serviceRouter);
//     app.use("/bundle",bundleRouter);
//     app.use("/auth",authRouter);

//     app.use("/clientBundle",clientBundleRouter);
//     app.use('/clientService',clientServiceRouter);
    
    
    const port =process.env.PORT;
app.get("/", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});

// client bundle 
app.post("/clientBundle/addBundle",bundleController.postBundle);
app.get("/clientBundle/getBundles",bundleController.getBundles);
app.delete("/clientBundle/deleteBundle/:id",bundleController.deleteBundle);
app.post("/clientBundle/updateBundle",bundleController.updateBundle);

// bundle 
app.post("/bundle/addBundle",middleware.verifyToken,bundleController.postBundle);
app.get("/bundle/getBundles",middleware.verifyToken,bundleController.getBundles);
app.delete("/bundle/deleteBundle/:id",middleware.verifyToken,bundleController.deleteBundle);
app.post("/bundle/updateBundle",middleware.verifyToken,bundleController.updateBundle);
// client service 
app.post('/clientService/postService',serviceController.postService);
app.get("/clientService/getServices",serviceController.getServices);
app.delete("/clientService/deleteService/:id",serviceController.deleteService);
app.post("/clientService/updateService",serviceController.updateService);

// service 
app.post('/service/postService',middleware.verifyToken,serviceController.postService);
app.get("/service/getServices",middleware.verifyToken,serviceController.getServices);
app.delete("/service/deleteService/:id",middleware.verifyToken,serviceController.deleteService);
app.post("/service/updateService",middleware.verifyToken,serviceController.updateService);

// auth 
app.post("/auth/login",authController.login);
app.get("/auth/getUser/:id",middleware.verifyToken,authController.getUserData);
app.post("/auth/changePass",middleware.verifyToken,authController.changePass);
// validate token
app.get('/auth/validateToken', middleware.verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});
// payment 
app.post('/payment/create-payment-page',paymentController.initiatePayment);


// blog , middleware.verifyToken, 
app.post('/blog/postBlog',blogController.postBlog);
app.get('/blog/getBlogs',middleware.verifyToken, blogController.getBlogs);
app.delete('/blog/deleteBlog/:id',middleware.verifyToken, blogController.deleteBlog);
app.post('/blog/updateBlog',middleware.verifyToken, blogController.updateBlog);
// client blogs 
app.get('/clientBlog/getBlogs', blogController.getBlogs);
app.get('/clientBlog/getBlogById/:id', blogController.getBlogById);

// client contact request 
app.post('/contactRequest/postContactRequest',contactRequestController.postContactRequest);

app.listen(port,async () => {

  console.log(`Server is running on http://localhost:${port}`);
     await initDbConnection();
});
module.exports = app;
// module.exports.handler = serverless(app);
// module.exports=app;