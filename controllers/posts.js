const Post = require('../models/post')
const {cloudinary} = require('../cloudinary')
const User = require('../models/user')


module.exports.index = async (req, res) =>{
    const posts = await Post.find({})
    res.render('posts/index', {posts})
}

module.exports.createPost =async(req, res)=>{
    const post = new Post(req.body.post)
    post.images = req.files.map(f=>({url: f.path, filename: f.filename}))
    post.author = req.user._id;
    await post.save()
    console.log(post)
    req.flash('success', 'Successfully posted')
    res.redirect(`/posts/${post._id}`)
 }

 module.exports.renderNewForm = (req, res) =>{
    res.render('posts/new')
    }

  module.exports.showPost= async (req, res)=>{
    const user = await User.findById(req.params.id)
    // const profile = await Profile.findById(req.params.id).populate('profilePic')
    const post= await Post.findById(req.params.id).populate({
        path: 'comments',
        populate:{
            path:'author'
        }
    }).populate('author')
    if(!post){
        req.flash('error', 'post not found')
        res.redirect('/posts')
    }
    res.render('posts/show', {post, user})
}

module.exports.renderEditForm =async(req, res)=>{
    const post= await Post.findById(req.params.id)
    res.render('posts/edit', {post})
}
  module.exports.updatePost=async(req, res)=>{
    const {id} = req.params
   const post = await Post.findByIdAndUpdate(id, {...req.body.post})
   const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
   post.images.push(...imgs)
   await post.save()
   if(req.body.deleteImages){
    for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename)
    }
    await post.updateOne({$pull: {images:{filename: {$in: req.body.deleteImages}}}})
   }
   req.flash('success', 'updated post')
   res.redirect(`/posts/${post._id}`)
}

  module.exports.deletePost = async(req, res)=>{
    const {id} = req.params;
    await Post.findByIdAndDelete(id)
    req.flash('success', 'post deleted')
    res.redirect('/posts')
}

