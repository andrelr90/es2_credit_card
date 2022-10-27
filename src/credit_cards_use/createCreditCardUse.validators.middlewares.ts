import { Schema } from 'express-validator';

export const validateCreateCreditCardUse: Schema = {
    credit_card_id: {
        notEmpty: {
            errorMessage: 'O campo "credit_card_id" é obrigatório',
            bail: true,
        },
        isInt: {
            errorMessage: 'O campo "credit_card_id" informado não é um número inteiro',
            bail: true,
        },
    },
    user_id: {
        notEmpty: {
            errorMessage: 'O campo "user_id" é obrigatório',
            bail: true,
        },
        isInt: {
            errorMessage: 'O campo "user_id" informado não é um número inteiro',
            bail: true,
        },
    },
    value: {
        notEmpty: {
            errorMessage: 'O campo "value" é obrigatório',
            bail: true,
        },
        isFloat: {
            errorMessage: 'O valor "value" informado não é um número decimal',
            bail: true,
        },
        toFloat: true,
    },
    description: {
        notEmpty: {
            errorMessage: 'O campo "description" é obrigatório',
            bail: true,
        },
        isString: {
            errorMessage: 'O campo "description" informado não é uma string',
            bail: true,
        },
    },
    authorization_code: {
        notEmpty: {
            errorMessage: 'O campo "authorization_code" é obrigatório',
            bail: true,
        },
        isString: {
            errorMessage: 'O campo "authorization_code" informado não é uma string',
            bail: true,
        },
    },
};
