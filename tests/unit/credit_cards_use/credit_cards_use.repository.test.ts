import {
    CreditCardUseRepositoryProvider,
    ICreditCardUseRepository,
} from '../../../src/credit_cards_use/credit_card_use.repository';
import { CreditCardUseDAOMock } from './mocks/credit_cards_use.repository.mock';

let repo: ICreditCardUseRepository;
beforeEach(() => {
    repo = CreditCardUseRepositoryProvider.create(new CreditCardUseDAOMock());
});

describe('Credit card use creation', () => {
    it('should return id of credit card use when credit card use is created successfully', async () => {
        const toAdd = {
            credit_card_id: '2',
            user_id: '1',
            value: 50.2,
            description: 'Teste 1',
            authorization_code: 'Teste 1',
        };
        const id_created = await repo.add(toAdd);
        const isIdANumber = !isNaN(Number(id_created));
        expect(isIdANumber).toBe(true);
    });
});

describe('Get all credit card uses', () => {
    it('should return all credit card uses', async () => {
        const expectedUses = [
            {
                credit_card_id: '1',
                user_id: '1',
                value: 10.2,
                description: 'Teste',
                authorization_code: 'Teste',
            },
        ];
        expect(await repo.getAll()).toEqual(expectedUses);
    });
});
