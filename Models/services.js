const {Schema, model }= require("mongoose");
const servicesSchema = new Schema({
    title : {
        type:String, 
        required : true
    },
    body : {
        type:String , 
        required:true
    }
})

const servicesModel = model("services",servicesSchema);
module.exports=servicesModel;