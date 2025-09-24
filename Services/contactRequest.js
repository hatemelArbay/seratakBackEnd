const contactRequestModel = require('../Models/contactRequest');

module.exports.postContactRequest = async (contactRequest) => {
    try {
        const newContactRequest = new contactRequestModel(contactRequest);
        await newContactRequest.save();
        return newContactRequest;

    }catch(err){
        console.log("error in posting contact request",err);
    }
}