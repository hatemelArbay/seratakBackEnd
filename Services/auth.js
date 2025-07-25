const userModel= require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login=async(userData)=>{
    try {
        console.log("user data in service : ");
        console.log(userData);
      
        const user = await userModel.findOne({email:userData.email});
        console.log("found user :");
        console.log(user);
        if(!user|| !await bcrypt.compare(userData.password,user.password)){
            return {success:false,token:null}
        }else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
            });
            return token
                
        }

    }catch(err){
        console.log("Error in checking credentials in service layer : "+err);
    }
}
module.exports.addUser=async()=>{
    try {
        const pass = await bcrypt.hash("admin",10);
        const email ="admin@seratak.com";
        const user = await new userModel({
            email:email,
            password:pass
        }).save();
        

        
    }catch(err){
        console.log("error in adding user : "+err);
    }
}
module.exports.getUserData= async(id)=>{
    try{
        const user = await userModel.findOne({_id:id});
        return user ; 

    }catch(err){
        console.log("Erorr in getting user data in service : "+err);
    }
}

module.exports.changePass= async(id,newPass,currentPass)=>{
    try {
        const user = await userModel.findOne({_id:id});
        console.log(user);
        if (!await bcrypt.compare(currentPass,user.password)){
            return false;
        }
        const hasshedPass = await bcrypt.hash(newPass,10);

        const response = userModel.findOneAndUpdate({_id:id},{password:hasshedPass}) 
        return response;
    }catch(err){
console.log("Error in changing pass in service "+err );
    }
}
