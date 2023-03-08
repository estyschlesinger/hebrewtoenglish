const express = require('express')
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const Post = require('./models/post')
const methodOverride= require('method-override')

mongoose.connect('mongodb://localhost:27017/hevanti',{useNewUrlParser: true, useUnifiedTopology: true, family:4})
.then(()=> {
    console.log("database connected!!!")
})
.catch(err => {
    console.log("oh no error! ")
    console.log(err)
})

const app = express();

app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))


app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/posts', async (req, res) =>{
    const posts = await Post.find({})
    res.render('posts/index', {posts})
})

app.get('/posts/new', (req, res) =>{
    res.render('posts/new')
    })

 app.post('/posts', async(req, res)=>{
    const post = new Post(req.body.post)
    await post.save()
    res.redirect(`/posts/${post._id}`)
 })   

app.get('/posts/:id', async (req, res)=>{
    const post= await Post.findById(req.params.id)
    res.render('posts/show', {post})
})



app.get('posts/:id/edit', async(req, res)=>{
    const post= await Post.findById(req.params.id)
    res.render('posts/edit', {post})
})

app.put('posts/:id', async(req, res)=>{
    const {id} = req.params
   const post = await Post.findByIdAndUpdate(id, {...req.body.post})
   res.redirect(`/posts/${post._id}`)
})

app.delete('/posts/:id', async(req, res)=>{
    const {id} = req.params;
    await Post.findByIdAndDelete(id)
    res.redirect('/posts')
})



app.listen( 3000, () =>{
    console.log("hebrewtoenglish running on port 3000")
})