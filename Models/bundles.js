const { Schema ,model} = require("mongoose");

const bundlesSchema = new Schema({
title :{
    type : String, 
    required : true
},
icon : {
    type : String, 
    required:true
},
color : {
    type:String ,
    required: true
},
features : {
    type : [String],
    required: true
},
price : {
    type : Number,
    required : true
}

})

const bundles = model("bundles",bundlesSchema);
module.exports=bundles;