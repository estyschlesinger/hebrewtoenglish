const User = require('../models/user')

const {cloudinary} = require('../cloudinary')
const multer= require('multer')
const { findByIdAndUpdate } = require('../models/user')

module.exports.renderRegister = (req, res)=>{
    res.render('users/register')
    }

module.exports.register = async(req, res, next) =>{
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to hevanti!');
            res.redirect('/posts');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderCreateProfile =  (req, res) =>{
     const user = User.findById(req.params.id)
    res.render('users/createProfile', {user})
}

module.exports.submitNewProfile = async(req, res, next)=>{

   const user = await User.findById(req.params.id) //find the user
   user.image = { url: req.file.path, filename: req.file.filename}
   //why cannot find path
   user.profileCreated = true;
   await user.save()
   console.log(user)
   req.flash('success', 'Successfully created profile')
   //res.redirect(`/users/${user._id}`)
   res.redirect(`/users/${user._id}`)
}

module.exports.showAllProfiles = async (req, res) =>{
    const users = await User.find({})
    res.render('users/allProfiles', {users})
  }

module.exports.showProfile = async (req, res) =>{
    const user = await User.findById(req.params.id) //req.user._id
    res.render('users/showProfile', {user})
    } //edit this to show singular profile populate

 module.exports.editProfile = async (req, res) =>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {...req.body.user})
    const img = {url: req.file.path, filename: req.file.filename}
    // user.image.push(img)
    user.image = img
    await user.save()
    req.flash('success', 'updated profile')
    res.redirect(`/users/${user._id}`)
    }


  module.exports.renderEditForm = async (req, res) =>{
    const user = await User.findById(req.params.id)
    res.render('users/editProfile', {user})
    }
    
module.exports.renderLogin = (req, res)=>{
    res.render('users/login')
}

module.exports.login =(req, res)=>{
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/posts");
    });
  }
