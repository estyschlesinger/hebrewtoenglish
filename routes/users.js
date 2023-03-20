const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const users = require('../controllers/users')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, isUser} = require('../middleware')
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})



router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))



router.route('/login')
  .get(users.renderLogin)
  .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)


router.get('/logout', users.logout )

router.get('/users', catchAsync(users.showAllProfiles ))

router.get('/users/new', isLoggedIn, users.renderCreateProfile)

router.post('/users/new',isLoggedIn, upload.single('image'), catchAsync(users.submitNewProfile))

router.route('/users/:id')
  .get( catchAsync(users.showProfile))
  .put( isLoggedIn, isUser, upload.single('image'), catchAsync(users.editProfile))


router.get('/users/:id/edit', isLoggedIn, isUser, catchAsync(users.renderEditForm))


module.exports = router;