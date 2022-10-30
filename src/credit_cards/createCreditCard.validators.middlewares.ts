import { Schema } from 'express-validator';

export const validateCreateCreditCard: Schema = {
    code: {
        notEmpty: {
            errorMessage: 'O campo "code" é obrigatório',
            bail: true,
        },
        isCreditCard: {
            errorMessage: 'O campo "code" não é um código de cartão válido',
            bail: true,
        },
    },
    current_balance: {
        notEmpty: {
            errorMessage: 'O campo "current_balance" é obrigatório',
            bail: true,
        },
        toFloat: true,
        isFloat: {
            errorMessage: 'O campo "current_balance" enviado não é um número maior ou igual a 0',
            bail: true,
            options: {
                min: 0,
            },
        },
    },
    best_by: {
        notEmpty: {
            errorMessage: 'O campo "best_by" é obrigatório',
            bail: true,
        },
        isDate: {
            errorMessage: 'O campo "best_by" deve estar no formato de data YYYY/MM/DD',
            bail: true,
            options: {
                strictMode: true,
            },
        },
    },
    purpose: {
        notEmpty: {
            errorMessage: 'O campo "purpose" é obrigatório',
            bail: true,
        },
        isIn: {
            options: [['aereo', 'hotel']],
            errorMessage: 'Campo "purpose" inválido',
        },
    },
};
