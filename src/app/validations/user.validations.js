const joi = require("@hapi/joi");
const joiMessages = require("../../config/joi-messages");

module.exports = joi
  .object({
    name: joi.string().min(3).max(45).required().label("name"),    
    email: joi.string().min(3).max(45).required().label("email"),    
    password: joi.string().min(3).max(45).required().label("password"),    
    password_confirmation: joi.string().min(3).max(45).required().label("password_confirmation")
})
  .messages(joiMessages);
