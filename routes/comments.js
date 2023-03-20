const express = require('express')
const { isLoggedIn, isCommentAuthor, validatePost, validateComment } = require('../middleware')
const router = express.Router({mergeParams: true})
const Comment = require('../models/comment')
const Post = require('../models/post')
const catchAsync = require('../utils/catchAsync')
const comments = require('../controllers/comments')


router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment) )

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment) )

module.exports = router;