import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { dbProvider } from '../../database/configs/knex.configs';
import { checkLoginRole } from '../auth/checkSession.middleware';
import { Knex } from 'knex';
import { CreditCardDAO, CreditCardDAOProvider } from '../credit_cards/credit_card.dao';
import { CreditCardRepository, CreditCardRepositoryProvider } from '../credit_cards/credit_card.repository';
import { CreditCardService, CreditCardServiceProvider } from '../credit_cards/credit_card.service';
import { CreditCardController, CreditCardControllerProvider } from '../credit_cards/credit_card.controller';
import { validateCreateCreditCard } from '../credit_cards/createCreditCard.validators.middlewares';

const URI_v1 = '/api/v1';
export const CREDIT_CARDS_ROUTE = URI_v1 + '/credit_cards';

export const creditCardRouterProvider = (db: Knex): Router => {
    const creditCardDAO: CreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: CreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    const creditCardService: CreditCardService = CreditCardServiceProvider.create(creditCardRepository);
    const creditCardController: CreditCardController = CreditCardControllerProvider.create(creditCardService);

    const router: Router = setupRoutes(creditCardController);

    return router;
};

function setupRoutes(creditCardController: CreditCardController) {
    const router: Router = Router();

    router.post(
        CREDIT_CARDS_ROUTE,
        checkLoginRole('admin'),
        checkSchema(validateCreateCreditCard),
        async (req: Request, res: Response) => {
            return await creditCardController.createCreditCard(req, res);
        },
    );
    router.get(CREDIT_CARDS_ROUTE, checkLoginRole('admin'), async (req: Request, res: Response) => {
        return await creditCardController.getAllCreditCards(req, res);
    });
    router.get(CREDIT_CARDS_ROUTE + '/:creditCardId', checkLoginRole('admin'), async (req: Request, res: Response) => {
        return await creditCardController.getCreditCardById(req, res);
    });
    return router;
}
