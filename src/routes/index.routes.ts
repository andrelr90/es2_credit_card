import { Router } from 'express';
import { Knex } from 'knex';
import { userRouterProvider } from './user.routes';

export const routerProvider = (db: Knex): Router => {
    const router: Router = Router();
    router.use(userRouterProvider(db));
    return router;
};
