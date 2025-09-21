const bundleService = require("../Services/bundle");
const {ObjectId} = require("mongodb");
module.exports.postBundle = async(req,res)=>{
    try {
   
        const bundleData = {
            title : req.body.title, 
            icon : req.body.icon, 
            color :req.body.color,
            features:req.body.features,
            price : req.body.price
        }
     
        const response = await bundleService.postBundle(bundleData);
        if (response){
            res.send({success:true})
        }else 
        res.send({success:false})

    }catch(err){
        console.log("erorr in adding new bundle in controller layer : "+err);
    }
}
module.exports.getBundles = async(req,res)=>{
    try {
        const response = await bundleService.getBundles();
        if (response){
            res.send({bundles:response})
        }

    }catch(err){
        console.log("Erorr in getting bundles in controller layer : "+err);
    }
}
module.exports.deleteBundle= async(req,res)=>{
    try {
        const id = new ObjectId(req.params.id);

        const response = await bundleService.deleteBundle(id);
        if (response){
            res.send({success:true})
        }else 
        res.send({success:false})

    }catch(err){
        console.log("Error in deleting bundle : "+err);
    }
}
module.exports.updateBundle = async(req,res)=>{
    try {
        const bundle = {
            id : new ObjectId(req.body.id),
            title: req.body.title,
            icon :req.body.icon,
            color:req.body.color,
            features:req.body.features,
            price : req.body.price
        }
        const response = await bundleService.updateBundle(bundle);
        if (response)
            res.send({success:true})
        else 
        res.send({success:false})

    }catch(err){
        console.log("Error in updating bundle in controller layer : "+err);
    }
}
