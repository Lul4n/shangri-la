import { Express } from 'express';
import e = require('express');
import { loggerFactory } from './ccc/Logger';
import { Simulation } from './application/domain/simulation/Simulation';
import { devSetup } from './ccc/dev_setup';
import { SystemApi } from './adapter/primary/SystemApi';

const LOGGER = loggerFactory('INDEX');
const simulation: Simulation = new Simulation();

devSetup(simulation);

simulation.start();

const server: Express = e();
const port: number = 8000;

new SystemApi(server);
server.listen(port, () => {
    LOGGER.info('Server is running at http://localhost:%s', port);
});
