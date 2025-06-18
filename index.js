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
  'http://localhost:3000',
  'http://localhost:8080',
 
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
  
const initDbConnection = require('./config/dbConnection');
const serviceRouter = require('./Routers/service');
const bundleRouter = require("./Routers/bundle");
const authRouter = require("./Routers/auth");
const clientServiceRouter = require('./Routers/clientService');
const clientBundleRouter= require("./Routers/clientBundle");
    app.use('/service',serviceRouter);
    app.use("/bundle",bundleRouter);
    app.use("/auth",authRouter);

    app.use("/clientBundle",clientBundleRouter);
    app.use('/clientService',clientServiceRouter);


const port =process.env.PORT;
app.get("/", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});
app.listen(port,async () => {

  console.log(`Server is running on http://localhost:${port}`);
     await initDbConnection();
});
module.exports = app;
module.exports.handler = serverless(app);
// module.exports=app;