const serviceServiceLayer = require('../Services/service');
const {ObjectId} = require("mongodb");
module.exports.postService = async(req,res)=>{
    console.log("triggered");
    console.log(req.body);
    try{
        const serviceData ={
            title : req.body.title,
            body:req.body.body
        }
       const response =await serviceServiceLayer.postService(serviceData)
        if (response)
            res.send({success:true})
        else 
        res.send({success:false})
    }catch(err){
        console.log("Error in saving new service in controller layer : "+err);
    
    }
}
module.exports.getServices = async(req,res)=>{
    try {
         const response = await serviceServiceLayer.getServices();
         if (response)
            res.send({success : true , services : response});
        else 
        res.send({success : false , services : "Error in retriving services "})
        
    }catch(err){
        console.log("Error in retriving services in controller layer  : "+err);
    }
}

module.exports.deleteService = async(req,res)=>{
    try {
        const id =new ObjectId (req.params.id);
        console.log("OBject id : ");
        console.log(id);
        const response = await serviceServiceLayer.deleteService(id);
        if (response){
            res.send({success:true})
        }else 
        res.send({success:false})

    }catch(err){
        console.log("error in deleteing service in controller layer : "+err);
    }

}
module.exports.updateService = async(req,res)=>{
    try {
        const serviceData = {
            id:new ObjectId(req.body.id),
            title : req.body.title ,
            body:req.body.body

        }
        console.log(serviceData);
        const response= await serviceServiceLayer.updateService(serviceData);
        if (response){
            res.send({success: true})
        }else 
        res.send({success:false})

    }catch(err){
        console.log("Error in updating service in controller layer ; "+err);
    }
}