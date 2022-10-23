import { Router } from 'express';
import { Knex } from 'knex';
import { userRouterProvider } from './user.routes';
import { creditCardRouterProvider } from './credit_card.routes';

export const routerProvider = (db: Knex): Router => {
    const router: Router = Router();
    router.use(userRouterProvider(db));
    router.use(creditCardRouterProvider(db));
    return router;
};
