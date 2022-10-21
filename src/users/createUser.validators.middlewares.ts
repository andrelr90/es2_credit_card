import { Schema } from 'express-validator';

export const validateCreateUser: Schema = {
    name: {
        notEmpty: {
            errorMessage: 'O campo nome é obrigatório',
            bail: true,
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Nome deve ter no minimo 5 caracteres',
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'O campo senha é obrigatório',
            bail: true,
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Senha deve ter no minimo 5 caracteres',
        },
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: 'O campo confirmar senha é obrigatório',
            bail: true,
        },
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: 'Senhas não são iguais',
        },
    },
    role: {
        notEmpty: {
            errorMessage: 'O campo papel é obrigatório',
            bail: true,
        },
    },
};
