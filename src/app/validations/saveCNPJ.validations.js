const joi = require("@hapi/joi");
const joiMessages = require("../../config/joi-messages");

module.exports = joi
  .object({
  cnpj: joi.string().min(3).max(45).required().label("cnpj"),
 })
  .messages(joiMessages);
