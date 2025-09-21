const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    excerpt: {
    type : String,
    required:true
    },
    imageUrl: {
        type:String,
        required:true

    },
    imagePublicId:{
        type:String,
        required:true
    }

});
const blog = model('blog', blogSchema);
module.exports = blog;