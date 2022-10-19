import express, { Express, Router } from 'express';
import { routerProvider } from './src/routes/index.routes';

const server: Express = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const router: Router = routerProvider();
server.use(router);

const PORT = 8001;
server
    .listen(PORT, () => {
        console.log(`Server up and running on port ${PORT}!`);
    })
    .on('error', console.log);
