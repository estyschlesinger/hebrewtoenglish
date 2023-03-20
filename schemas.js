const Joi = require('joi')




module.exports.postSchema = Joi.object({
    post: Joi.object({
     caption: Joi.string().required()
    
}).required(),
  deleteImages: Joi.array()
})


module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required()
    }).required()
})
