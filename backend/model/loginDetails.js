const Joi = require("joi");

class LoginDetails {

    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    static #validationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(50),
    });

    validate() {
        const result = LoginDetails.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = LoginDetails;