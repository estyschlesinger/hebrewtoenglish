
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true //username and id included from passport
    },
    
    image: {
        url: String, //avatar
        filename: String
    },
    firstName: String,
    lastName: String,
    userPosts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
   
    userPostsCount: Number,
    userFollowers: Number,
    userFollowing: Number,
    profileCreated: Boolean
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
