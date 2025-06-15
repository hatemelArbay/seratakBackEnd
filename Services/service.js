const servicesModel = require('../Models/services');
const ServicesModel = require('../Models/services');

module.exports.postService= async(serviceData)=>{
    try{
        const service = new ServicesModel({
            title : serviceData.title,
            body:serviceData.body
        });
        const newService = await service.save();
        if (newService){
            return true;
        }else 
        return false;

    }catch(err){
        console.log("error in saving new service in service layer "+err);
      
    }
}
module.exports.getServices = async()=>{
    try {
    const services = await ServicesModel.find();
    return services;
    }catch(err){
        console.log("Error in retriving Services in the service layer : "+err);
    }


}
module.exports.deleteService= async(id)=>{
    try {
        const response =servicesModel.deleteOne({_id:id});
        
        return response;  

    }catch(err){
        console.log("Error in deleting service in service layer : "+err);
    }
}
module.exports.updateService= async(serviceData)=>{
    try {
        const response = await servicesModel.findOneAndUpdate(serviceData.id,serviceData);
        return response; 
        

    }catch(err){
        console.log("Error in updating service in the service layer : "+err);
    }

}