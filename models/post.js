const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Comment = require('./comment')

// const CommentsSchema = new Schema({
//     comment: String
// })

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = {toJSON: {virtuals: true}}

const PostSchema = new Schema({
    images: [ImageSchema],
    caption: String,
    likes: Number,
    postedAt: Date,
    // images: [ImageSchema],
    author: {
          type: Schema.Types.ObjectId,
          ref: 'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

}, opts)

PostSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
                $in:doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', PostSchema)