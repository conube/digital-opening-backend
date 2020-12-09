const joi = require("@hapi/joi");
const joiMessages = require("../../config/joi-messages");

module.exports = joi
  .object({
    crc: joi.string().min(3).max(150).required().label("crc"),
    oab: joi.string().min(3).max(150).required().label("oab"),
  })
  .messages(joiMessages);
