const contactRequestService = require('../Services/contactRequest');

module.exports.postContactRequest = async (req, res) => {
    try {
        const contactRequestData = req.body;
        const newContactRequest = await contactRequestService.postContactRequest(contactRequestData);
        if(newContactRequest){
            res.send({success:true})
        } else {
            res.send({success:false})
        }
    } catch (err) {
        console.log("error in posting contact request", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};