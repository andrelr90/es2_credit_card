import { BaseUser } from "./user.model";

export const validateUser = (baseUser: BaseUser): void => {
    if(baseUser.name == undefined) {
        throw Error('Nome de usuário vazio');
    }
    if(baseUser.name.length < 5) {
        throw Error('Nome de usuário menor do que 5 caractres');
    }
    if(baseUser.password == undefined) {
        throw Error('Senha vazia');
    }
    if(baseUser.password.length < 5) {
        throw Error('Senha menor do que 5 caractres');
    }
}