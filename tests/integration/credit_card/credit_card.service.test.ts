import { createTestDatabase } from '../createTestDatabase';
import dbConfig from '../../../db.configs';
import { dbProvider } from '../../../database/database.providers';
import { CreditCardDAOProvider, ICreditCardDAO } from '../../../src/credit_cards/credit_card.dao';
import { CreditCardRepositoryProvider, ICreditCardRepository } from '../../../src/credit_cards/credit_card.repository';
import { CreditCardServiceProvider, ICreditCardService } from '../../../src/credit_cards/credit_card.service';
import { Knex } from 'knex';

let db: Knex<any, any[]>;
let creditCardService: ICreditCardService;

function getCreditCardService(db: Knex) {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: ICreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    return CreditCardServiceProvider.create(creditCardRepository);
}

beforeEach(async () => {
    db = dbProvider(dbConfig['test']);
    creditCardService = getCreditCardService(db);
    await createTestDatabase(db);
});

afterEach(async () => {
    await db.destroy();
});

describe('Credit card creation', () => {
    it('should create Credit card', async () => {
        const creditCard = {
            code: '347314141546082',
            best_by: new Date('2023/05/12'),
            current_balance: 5600,
            purpose: 'aereo',
        };

        expect(await creditCardService.createCreditCard(creditCard)).toEqual({ id: 1 });
    });

    it('should be able to get all credit cards created', async () => {
        const creditCard1 = {
            code: '347314141546082',
            best_by: new Date('2023/05/12'),
            current_balance: 5600,
            purpose: 'aereo',
        };
        const creditCard2 = {
            code: '377286155577547',
            best_by: new Date('2023/07/12'),
            current_balance: 6400,
            purpose: 'aereo',
        };
        await creditCardService.createCreditCard(creditCard1);
        await creditCardService.createCreditCard(creditCard2);
        const creditCardIdsObtainedThroughGetAll = (await creditCardService.getAllCreditCards()).map(
            (creditCard) => creditCard.code,
        );

        expect(creditCardIdsObtainedThroughGetAll.sort()).toEqual(['347314141546082', '377286155577547'].sort());
    });
});
