const authService = require("../Services/auth");

module.exports.login=async(req,res)=>{
    try {
        // await authService.addUser();
        const userData={
            email : req.body.email,
            password:req.body.password
        }
        const response = await authService.login(userData);
    
        if (response.success==false){
         res.send({ success:false,message: "Invalid credentials" });
        }else {
        res.send({success:true,token:response})
        }

    }catch(err){
        console.log("Erorr in checking credentials in controller : "+err);
    }
}
module.exports.getUserData= async(req,res)=>{
    try {
        
        const id = req.params.id;
        const response = await authService.getUserData(id);
        if (response )
            res.send({user:response});

    }catch(err){
        console.log("Error in getting user data in controller layer : "+err);
    }
}
module.exports.changePass= async(req,res)=>{
    try {
        const id = req.body.id;
        const newPass = req.body.pass;
        const currentPass=req.body.currentPass;
        const response = await authService.changePass(id,newPass,currentPass);
        if (!response){
            res.send({success:false})

        }
        else {
            res.send({success:true})
        }

    }catch(err){
        console.log("Erorr in changing pass in contrller layer : "+err);
    }
}