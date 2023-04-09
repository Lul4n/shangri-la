import { Express, Request, Response } from 'express';
import e = require('express');
import { Simulation } from './simulation/Simulation';
import { devSetup } from './dev_setup';
import { loggerFactory } from './Logger';

const LOGGER = loggerFactory('INDEX');
const simulation: Simulation = new Simulation();

devSetup(simulation);

simulation.start();

const server: Express = e();
const port: number = 8000;

server.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
server.listen(port, () => {
    LOGGER.info(`Server is running at http://localhost:${port}`);
});
