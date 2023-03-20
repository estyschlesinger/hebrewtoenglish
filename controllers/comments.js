const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.createComment = async(req, res)=>{
    const{id} = req.params;
   const post = await Post.findById(id)
   const comment = new Comment(req.body.comment)
   comment.author = req.user._id;
   post.comments.push(comment);
   await comment.save();
   await post.save()
   req.flash('success', 'created new comment')
   res.redirect(`/posts/${post._id}`)
}

module.exports.deleteComment = async(req, res)=>{
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull: {comments: commentId}})
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/posts/${id}`)
}
