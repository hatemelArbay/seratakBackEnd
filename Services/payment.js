
const axios = require("axios");
const BASE_URL = "https://secure-egypt.paytabs.com/payment";

module.exports.createPaymentPage= async(orderData)=>{
    const response = await axios.post(
        `${BASE_URL}/request`,
        orderData,
        {
            headers:{
            authorization: process.env.PAYTABS_SERVER_KEY,
         "Content-Type": "application/json",
            }
        }
    )

    // add the payment to the db after success ;
    return response.data;
    
}
module.exports.verifyPayment=async(transRef)=>{
    const response = await axios.post(
    `${BASE_URL}/query`,
    {
      profile_id: process.env.PAYTABS_PROFILE_ID,
      tran_ref: transRef,
    },
    {
      headers: {
        authorization: process.env.PAYTABS_SERVER_KEY,
        "Content-Type": "application/json",
      },
    }

    )
    return response.data;

}