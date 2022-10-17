import express, { Express, Request, Response, Router } from 'express';

const server: Express = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const router: Router = Router();
router.get('/', (req: Request, res: Response) => {
    console.log(req);
    return res.status(200).json({ success: true, data: 'Teste' });
});

server.use(router);

const PORT = 8001;
server
    .listen(PORT, () => {
        console.log(`Server up and running on port ${PORT}!`);
    })
    .on('error', console.log);
