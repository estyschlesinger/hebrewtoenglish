const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CommentsSchema = new Schema({
    comment: String
})

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const PostSchema = new Schema({
    // comments: [CommentsSchema],
    caption: String,
    likes: Number,
    // images: [ImageSchema],
    posttext: String

})

module.exports = mongoose.model('Post', PostSchema)