const joi = require("@hapi/joi");
const joiMessages = require("../../config/joi-messages");

module.exports = joi
  .object({
    number: joi.string().min(3).max(45).required().label("name")    
})
  .messages(joiMessages);
