const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const multer= require('multer')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validatePost } = require('../middleware')
const {storage}= require('../cloudinary')
const upload = multer({storage})
const posts = require('../controllers/posts')


router.route('/')
  .get(catchAsync(posts.index))
  .post(isLoggedIn, upload.array('image'), validatePost, catchAsync(posts.createPost))

router.get('/new', isLoggedIn, posts.renderNewForm)


router.route('/:id')
  .get(catchAsync(posts.showPost))
  .put(isLoggedIn, isAuthor, upload.array('image'), validatePost, catchAsync(posts.updatePost))
  .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm) )





module.exports = router;
