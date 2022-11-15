import { createTestDatabase } from '../createTestDatabase';
import dbConfig from '../../../db.configs';
import { dbProvider } from '../../../database/database.providers';
import { CreditCardUseDAOProvider, ICreditCardUseDAO } from '../../../src/credit_cards_use/credit_card_use.dao';
import {
    CreditCardUseRepositoryProvider,
    ICreditCardUseRepository,
} from '../../../src/credit_cards_use/credit_card_use.repository';
import {
    CreditCardUseServiceProvider,
    ICreditCardUseService,
} from '../../../src/credit_cards_use/credit_card_use.service';

import { CreditCardDAOProvider, ICreditCardDAO } from '../../../src/credit_cards/credit_card.dao';
import { Knex } from 'knex';
import { IUserDAO, UserDAOProvider } from '../../../src/users/user.dao';
import { UserServiceProvider } from '../../../src/users/user.service';
import { IUserRepository, UserRepositoryProvider } from '../../../src/users/user.repository';
import { CreditCardRepositoryProvider, ICreditCardRepository } from '../../../src/credit_cards/credit_card.repository';
import { CreditCardServiceProvider } from '../../../src/credit_cards/credit_card.service';

const db = dbProvider(dbConfig['test']);

let creditCardUseService: ICreditCardUseService;

function getCreditCardService(db: Knex) {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: ICreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    return CreditCardServiceProvider.create(creditCardRepository);
}

function getUserService(db: Knex) {
    const userDAO: IUserDAO = UserDAOProvider.create(db);
    const userRepository: IUserRepository = UserRepositoryProvider.create(userDAO);
    return UserServiceProvider.create(userRepository);
}

function getCreditCardUseService(db: Knex) {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCarUsedDAO: ICreditCardUseDAO = CreditCardUseDAOProvider.create(db, creditCardDAO);
    const creditCardUseRepository: ICreditCardUseRepository = CreditCardUseRepositoryProvider.create(creditCarUsedDAO);
    return CreditCardUseServiceProvider.create(creditCardUseRepository, getCreditCardService(db), getUserService(db));
}

beforeEach(async () => {
    creditCardUseService = getCreditCardUseService(db);
    await createTestDatabase(db);
});

afterEach(async () => {
    await db.destroy();
});

describe('Credit card use creation', () => {
    it('should return error when creating credit card use if credit card doesnt exist', async () => {
        const creditCardUse = {
            credit_card_id: '1',
            user_id: '1',
            value: 10.2,
            description: 'Teste',
            authorization_code: 'Teste',
        };
        expect(async () => await creditCardUseService.createCreditCardUse(creditCardUse)).rejects.toThrow(
            'Nao ha cartao de credito com esse id',
        );
    });
});
