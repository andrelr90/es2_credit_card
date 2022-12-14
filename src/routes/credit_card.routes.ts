import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Knex } from 'knex';
import { ICreditCardDAO, CreditCardDAOProvider } from '../credit_cards/credit_card.dao';
import { ICreditCardRepository, CreditCardRepositoryProvider } from '../credit_cards/credit_card.repository';
import { ICreditCardService, CreditCardServiceProvider } from '../credit_cards/credit_card.service';
import { ICreditCardController, CreditCardControllerProvider } from '../credit_cards/credit_card.controller';
import { validateCreateCreditCard } from '../credit_cards/createCreditCard.validators.middlewares';

const URI_v1 = '/api/v1';
export const CREDIT_CARDS_ROUTE = URI_v1 + '/credit_cards';

export const creditCardRouterProvider = (db: Knex): Router => {
    const creditCardDAO: ICreditCardDAO = CreditCardDAOProvider.create(db);
    const creditCardRepository: ICreditCardRepository = CreditCardRepositoryProvider.create(creditCardDAO);
    const creditCardService: ICreditCardService = CreditCardServiceProvider.create(creditCardRepository);
    const creditCardController: ICreditCardController = CreditCardControllerProvider.create(creditCardService);

    const router: Router = setupRoutes(creditCardController);

    return router;
};

function setupRoutes(creditCardController: ICreditCardController) {
    const router: Router = Router();

    router.post(CREDIT_CARDS_ROUTE, checkSchema(validateCreateCreditCard), async (req: Request, res: Response) => {
        return await creditCardController.createCreditCard(req, res);
    });
    router.get(CREDIT_CARDS_ROUTE, async (req: Request, res: Response) => {
        return await creditCardController.getAllCreditCards(req, res);
    });
    router.get(CREDIT_CARDS_ROUTE + '/:creditCardId', async (req: Request, res: Response) => {
        return await creditCardController.getCreditCardById(req, res);
    });
    return router;
}
