const blogService = require('../Services/blog');

module.exports.postBlog = async (req, res) => {
    try {
        const blogData = req.body;
        const newBlog = await blogService.postBlog(blogData);
if (newBlog){
    res.send({success : true })
}else 
    res.send({success : false})
    }catch(err){
        console.log("error in posting blog in controller layer : "+err);
    }
}
module.exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
        res.json(blogs);
    }catch(err){
        console.log("error in getting blogs in controller layer : "+err);
    }}

module.exports.deleteBlog = async (req, res) => {
    try {
        const blogId=req.params.id;
        console.log("Deleting blog with ID:", blogId);
        const deletedBlog = await blogService.deleteBlog(blogId);
        if (deletedBlog)
        {
            res.send({success : true});
        }else {
            res.send({success : false});
        }
        // if (deletedBlog){
        //     await blogService.deleteBlogImage(deletedBlog.imagePublicId);
        //     res.send({success : true})
        // }else 
        //     res.send({success : false})

    }catch(err){
        console.log("error in deleting blog in controller layer : "+err);
    }
}
module.exports.updateBlog = async (req, res) => {
    try {
        const blogData = req.body;
        const updatedBlog = await blogService.updateBlog(blogData);
        if (updatedBlog){
            res.send({success : true})
        }else 
            res.send({success : false})

    }catch(err){
        console.log("error in updating blog in controller layer : "+err);
    }
}

module.exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.getBlogById(blogId);
        res.json({blog : blog});
    } catch (err) {
        console.log("error in getting blog by ID in controller layer : " + err);
    }
}
