
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const Post = require('./models/post')
const methodOverride= require('method-override')
const Comment = require('./models/comment')
const postsRoutes = require('./routes/posts')
const commentsRoutes = require('./routes/comments')
const usersRoutes = require('./routes/users')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const sessionConfig = {
    name: 'session',
    secret: 'thisistopsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        //secure:true,
        expires: Date.now() + 1000 * 60 *60 *24 *7,
        maxAge: 1000 * 60 *60*24*7
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) =>{

    res.locals.currentUser = req.user;
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error')
    next();
 })
 

app.use('/', usersRoutes)
app.use('/posts', postsRoutes)
app.use('/posts/:id/comments', commentsRoutes)

app.get('/', (req, res)=>{
    res.render('home')
})




app.all('*', (req, res, next) => {
    next(new ExpressError('PAGE NOT FOUND', 404))
})

app.use((err, req, res, next) =>{
    const {statusCode=500}=  err;
    if(!err.message) err.message="oops, something went wrong"
    res.render('error', {err})
    //.status(statusCode).
})


app.listen( 3000, () =>{
    console.log("hebrewtoenglish running on port 3000")
})