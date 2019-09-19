//Validation
const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
                .email()
                .required(),
        password: Joi.string()
                        .min(6)
                        .required()
    }
    return Joi.validate(data, schema);
}

const loginValidation = data => {
    const schema = {
        email: Joi.string()
                .email()
                .required(),
        password: Joi.string()
                        .min(6)
                        .required()
    }
    return Joi.validate(data, schema);
}

const updateAccountValidation = data => {
    const schema = {
        customerId: Joi.number().integer().required(),
        name: Joi.string()
                .min(6)
                .max(50)
                .required(),
        email: Joi.string()
                .email()
                .required(),
        password: Joi.string()
                        .min(6)
                        .required(),
        dayPhone: Joi.string()
                        .max(100)
                        .required(),
        evePhone: Joi.string()
                        .max(100)
                        .required(),
        mobPhone: Joi.string()
                        .max(100)
                        .required(),
    }
    return Joi.validate(data, schema);
}

const updateAddressValidation = data => {
    const schema = Joi.object().keys({
        customerId: Joi.number().integer().required(),
        address1: Joi.string()
                .min(6)
                .max(100)
                .required(),
        address2: Joi.string()
                .min(6)
                .max(100)
                .required(),
        city: Joi.string()
                .max(100)
                .required(),
        region: Joi.string()
                    .max(100)
                    .required(),
        postalCode: Joi.string()
                    .max(100)
                    .required(),
        country: Joi.string()
                    .max(100)
                    .required(),
        shippingRegionId: Joi.number().integer().required(),
    })
    return Joi.validate(data, schema);
}

module.exports = {
    registerValidation, loginValidation, updateAccountValidation, updateAddressValidation
}