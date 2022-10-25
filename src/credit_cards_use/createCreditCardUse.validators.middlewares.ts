import { Schema } from 'express-validator';

export const validateCreateCreditCardUse: Schema = {
    card_id: {
        notEmpty: {
            errorMessage: 'O campo "card_id" é obrigatório',
            bail: true,
        },
    },
    user_id: {
        notEmpty: {
            errorMessage: 'O campo "user_id" é obrigatório',
            bail: true,
        },
    },
    value: {
        notEmpty: {
            errorMessage: 'O campo "value" é obrigatório',
            bail: true,
        },
        toFloat: true,
        isFloat: {
            errorMessage: 'O valor "value" informado não é um número',
            bail: true,
        },
    },
    description: {
        notEmpty: {
            errorMessage: 'O campo "description" é obrigatório',
            bail: true,
        },
    },
};
