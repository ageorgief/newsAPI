const joi = require('joi');

const newsValidationSchema = joi.object({
    title: joi.string().trim().max(150).required(),
    description: joi.string().trim().optional(),
    text: joi.string().trim().required()
}).unknown(false);
    
module.exports = newsValidationSchema;