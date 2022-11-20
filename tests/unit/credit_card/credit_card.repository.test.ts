import { CreditCardRepositoryProvider, ICreditCardRepository } from '../../../src/credit_cards/credit_card.repository';
import { CreditCardDAOMock } from './mocks/credit_card.repository.mock';

let repo: ICreditCardRepository;
beforeEach(() => {
    repo = CreditCardRepositoryProvider.create(new CreditCardDAOMock());
});

describe('Credit card creation', () => {
    it('should return id of credit card when credit card is created successfully', async () => {
        const toAdd = {
            code: '123457',
            best_by: new Date('2023/05/12'),
            current_balance: 5650,
            purpose: 'aereo',
        };
        const id_created = await repo.add(toAdd);
        const isIdANumber = !isNaN(Number(id_created));
        expect(isIdANumber).toBe(true);
    });
});

describe('Get credit card by code', () => {
    it('should return credit card when the code is registered', async () => {
        const expectedCreditCard = {
            code: '123456',
            best_by: new Date('2023/05/12'),
            current_balance: 56,
            purpose: 'aereo',
        };
        expect(await repo.getByCode('123456')).toEqual(expectedCreditCard);
    });

    it('should return an exception error when the code is not registered', async () => {
        expect(async () => await repo.getByCode('123457')).rejects.toThrow('Nao ha cartao de credito com esse codigo');
    });
});

describe('Get credit card by id', () => {
    it('should return credit card when the id is registered', async () => {
        const expectedCreditCard = {
            code: '123456',
            best_by: new Date('2023/05/12'),
            current_balance: 56,
            purpose: 'aereo',
        };
        expect(await repo.getById('1')).toEqual(expectedCreditCard);
    });
});

describe('Get all credit cards', () => {
    it('should return all credit cards', async () => {
        const expectedCreditCards = [
            {
                code: '123456',
                best_by: new Date('2023/05/12'),
                current_balance: 56,
                purpose: 'aereo',
            },
        ];
        expect(await repo.getAll()).toEqual(expectedCreditCards);
    });
});
