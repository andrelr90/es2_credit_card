import { Request, Response, Router } from 'express';

export const routerProvider = (): Router => {
    const router: Router = Router();
    router.get('/', (req: Request, res: Response) => {
        console.log(req);
        return res.status(200).json({ success: true, data: 'Teste' });
    });
    return router;
};
