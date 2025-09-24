const {Schema,model}= require('mongoose');

const contactRequestSchema = new Schema({
    requestType:{
        type:String,
        required:true
    },
    pdfUrl : {
        type:String,
        required:false
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false
    },
});
const contactRequest = model('contactRequest',contactRequestSchema);
module.exports = contactRequest;