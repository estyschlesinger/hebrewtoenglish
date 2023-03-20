const mongoose = require('mongoose')
const {captions} = require('./posts/seedPosts')
//const englishSentences = require('./learn/englishSentences')
//const dictionary = require('./learn/dictionary')
//const {nouns, verbs} = require('./learn/dataparts')
const Post = require('../models/post')
const Profile = require('../models/profile')
const User = require('../models/user')

mongoose.connect('mongodb://localhost:27017/hevanti',{useNewUrlParser: true, useUnifiedTopology: true, family:4})
.then(()=> {
    console.log("database connected!!!")
})
.catch(err => {
    console.log("oh no, error! ")
    console.log(err)
})

// const randomLikeCount = Math.floor(Math.random() * 1000 + 20)

const seedDB = async () => {
    await Post.deleteMany({})
    for(let i=0; i<10; i++){
        const randomNo = Math.floor(Math.random() * captions.length)
        const post = new Post({
          caption: captions[randomNo],
          author: '6409ec679b31323f75859966',
          postedAt: Date.now(),
          likes: Math.floor(Math.random() * 100 + 20),
          images:[
            {
                url: 'https://res.cloudinary.com/deyqmo0j9/image/upload/v1678382014/hevanti/WhatsApp_Image_2023-02-26_at_14.58.15_jblx2m.jpg',
                filename: 'hevanti/WhatsApp_Image_2023-02-26_at_14.58.15_jblx2m.jpg'
            },
            {
                url: 'https://res.cloudinary.com/deyqmo0j9/image/upload/v1678382014/hevanti/WhatsApp_Image_2023-02-26_at_14.58.15_jblx2m.jpg',
                filename: 'hevanti/WhatsApp_Image_2023-02-26_at_14.58.15_jblx2m.jpg'
            }
          ]
        })
        await post.save()
    }
   const profile = new Profile({
    userFullName: 'Esty Schlesinger',
    img: {
        data: '',
        contentType: 'image/png'
    }
   })
}
seedDB().then(() =>{
    mongoose.connection.close()
})