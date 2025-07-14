const {Router} = require('express');
const paymentController = require("../Controllers/payments");

const router = Router();

router.post("/create-payment-page", paymentController.initiatePayment);
router.get("/verify-payment", paymentController.confirmPayment);

module.exports=router;
