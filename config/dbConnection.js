const mongoose = require('mongoose');

initDbConnection = async()=>{
    try{
        await mongoose.connect(process.env.dbConnection);
console.log("connected to db successfully");

    }catch(err){
        console.log("Error in db connection : "+err);
    }
}

module.exports=initDbConnection;