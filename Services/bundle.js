const bundleModle = require("../Models/bundles");

module.exports.postBundle= async(bundleData)=>{
    try {
        console.log("reacieved bundle");
        console.log(bundleData);
        const bundle = new bundleModle({
            title:bundleData.title, 
            icon : bundleData.icon,
            color:bundleData.color,
            features:bundleData.features,
            price:bundleData.price,
        })
       const newBundle = await bundle.save();
       return newBundle;

    }catch(err){
        console.log("Erorr in adding new bundle in the service layer : "+err);
    }

}
module.exports.getBundles=async()=>{
    try {
        const bundles = await bundleModle.find();
        return bundles; 

    }catch(err){
        console.log("Error in fetching bundles in service layer : "+err);
    }
}
module.exports.deleteBundle= async(id)=>{
    try {
        const response = await bundleModle.deleteOne({_id:id});
        return response;

    }catch(err){
        console.log("Error in deleting bundle in service layer : "+err);
    }
}
module.exports.updateBundle= async(bundle)=>{
    try {
        const response = await bundleModle.findOneAndUpdate(bundle.id,bundle);
        return response;
    }catch(err){
        console.log("Error in updating bundle in service layer : "+err);
    }
}
