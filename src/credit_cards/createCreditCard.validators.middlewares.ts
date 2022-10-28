import { Schema } from 'express-validator';

export const validateCreateCreditCard: Schema = {
    code: {
        notEmpty: {
            errorMessage: 'O campo code é obrigatório',
            bail: true,
        },
        isCreditCard: {
            errorMessage: 'O campo code não é um código de cartão válido',
            bail: true,
        },
    },
    current_balance: {
        notEmpty: {
            errorMessage: 'O campo balanço é obrigatório',
            bail: true,
        },
        toFloat: true,
        isFloat: {
            errorMessage: 'O campo balanço enviado não é um número maior ou igual a 0',
            bail: true,
            options: {
                min: 0,
            },
        },
    },
    best_by: {
        notEmpty: {
            errorMessage: 'O campo data é obrigatório',
            bail: true,
        },
    },
    purpose: {
        notEmpty: {
            errorMessage: 'O campo propósito é obrigatório',
            bail: true,
        },
        isIn: {
            options: [['aereo', 'hotel']],
            errorMessage: 'Propósito inválido',
        },
    },
};
