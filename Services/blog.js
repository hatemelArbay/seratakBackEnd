const blogModel = require('../Models/blog');
const cloudinary = require("cloudinary").v2;
const ObjectId = require("mongoose").Types.ObjectId;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.postBlog = async (blogData) => {
    try {
        const blog = new blogModel({
            title: blogData.title,
            body: blogData.body,
            excerpt: blogData.excerpt,
            imageUrl: blogData.imageUrl,
            imagePublicId:blogData.imagePublicId
        });
        const newBlog = await blog.save();
        return newBlog;
   

    }catch(err){
        console.log("Error in adding new blog in the service layer : " + err);
    }
}

module.exports.getBlogs = async () => {
try {
    const blogs = await blogModel.find();
    return blogs;

}catch(err){
    console.log("Error in getting blogs in the service layer : " + err);

}}

module.exports.deleteBlog= async (id)=>{
try {
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    return deletedBlog;

}catch(err){
    console.log("Error in deleting blog in the service layer : " + err);
}}

module.exports.deleteBlogImage = async (imagePublicId) => {
  try {
    if (!imagePublicId) return null;
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (err) {
    console.log("Error deleting image from Cloudinary:", err);
    throw err;
  }
};
module.exports.updateBlog = async (newBlog) => {
try{
    const updatedBlog = await blogModel.findByIdAndUpdate(newBlog.id, {newBlog}, { new: true });
    return updatedBlog;

}catch(err){
    console.log("Error in updating blog in the service layer : " + err);
}

}

module.exports.getBlogById= (id)=>{
    try {
        const objectId = new ObjectId(id);
        const blog = blogModel.findById(objectId);
        return blog;

    }catch(err){
        console.log("Error in getting blog by id in the service layer : " + err);
    }
}


