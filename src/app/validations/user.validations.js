const joi = require("@hapi/joi");
const joiMessages = require("../../config/joi-messages");

module.exports = joi
  .object({
    id: joi.number().integer().positive().label("id"),

    chapterId: joi.number().integer().positive().required().label("chapterId"),

    name: joi.string().min(3).max(45).required().label("name"),

    placementHash: joi.string().min(3).max(150).required().label("placementHash"),
  })
  .messages(joiMessages);
