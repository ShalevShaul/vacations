const Joi = require("joi");

class RegisterDetails {

    constructor(regDetails) {
        this.first_name = regDetails.first_name;
        this.last_name = regDetails.last_name;
        this.email = regDetails.email;
        this.password = regDetails.password;
    }

    static #validationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(50),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    });

    validate() {
        const result = RegisterDetails.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = RegisterDetails;