const mongoose = require('mongoose')
const {captions} = require('./posts/seedPosts')
//const englishSentences = require('./learn/englishSentences')
//const dictionary = require('./learn/dictionary')
//const {nouns, verbs} = require('./learn/dataparts')

const express = require('express')
const path = require('path');
const ejsMate = require('ejs-mate')

const Post = require('../models/post')

mongoose.connect('mongodb://localhost:27017/hevanti',{useNewUrlParser: true, useUnifiedTopology: true, family:4})
.then(()=> {
    console.log("database connected!!!")
})
.catch(err => {
    console.log("oh no error! ")
    console.log(err)
})

// const randomLikeCount = Math.floor(Math.random() * 1000 + 20)

const seedDB = async () => {
    await Post.deleteMany({})
    for(let i=0; i<50; i++){
        const randomNo = Math.floor(Math.random() * captions.length)
        const post = new Post({
          caption: captions[randomNo],
          likes: Math.floor(Math.random() * 1000 + 20)
        })
        await post.save()
    }
}
seedDB().then(() =>{
    mongoose.connection.close()
})