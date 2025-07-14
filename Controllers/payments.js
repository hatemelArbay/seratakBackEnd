const paymentService = require("../Services/payment");

module.exports.initiatePayment= async(req , res )=>{
    try
    {
    const customer =req.body.customer;
    const service= req.body.service;
    const orderData = {
      profile_id: process.env.PAYTABS_PROFILE_ID,
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: `ORDER-${Date.now()}`,
      cart_currency: "EGP",
      cart_amount: service.price,
      cart_description: service.serviceTitle,
      customer_details: customer,
      return: `${process.env.BASE_URL}/payment-result`,
    };
    const data = await paymentService.createPaymentPage(orderData);
        if (data.redirect_url) {
      return res.json({ redirect_url: data.redirect_url });
    } else {
      return res.status(500).json({ error: "Failed to create payment page" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error while creating payment page" });
  }
};

module.exports.confirmPayment=async (req, res)=> {
  try {
    const { tranRef } = req.query;

    if (!tranRef) {
      return res.status(400).json({ error: "tranRef is required" });
    }

    const data = await verifyPayment(tranRef);

    // Optional: Save/update order in your database with payment status here
    // await Order.updateOne({ cart_id: data.cart_id }, { status: data.payment_result.response_status });

    return res.json({ payment_status: data.payment_result.response_status, details: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error while verifying payment" });
  }
}
