require('dotenv').config();
import express, { Express } from 'express';
import config from 'config';

const server: Express = express();

const port: number = config.get<number>('port');
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
