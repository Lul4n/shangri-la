import express, { Express } from 'express';
import { loggerFactory } from './ccc/Logger';
import { Simulation } from './application/domain/simulation/Simulation';
import { devSetup } from './ccc/dev_setup';
import { SystemApi } from './adapter/primary/SystemApi';
import path from 'path';
import { Frontend } from './adapter/primary/Frontend';

const LOGGER = loggerFactory('INDEX');
const simulation: Simulation = new Simulation();

devSetup(simulation);

simulation.start();

const server: Express = express();
const port: number = parseInt(process.env['PORT'] || '3001');
const frontendUrlPrefix = process.env['FRONTEND_PREFIX'] || '/frontend';
const backendUrlPrefix = process.env['BACKEND_PREFIX'] || '/backend';
const frontendPath: string = process.env['FRONTEND_PATH'] || path.resolve(__dirname, '../../frontend/build/');

server.use(express.static(path.resolve(__dirname, '../client/build')));
new SystemApi(server, backendUrlPrefix);
new Frontend(server, frontendUrlPrefix, frontendPath);
server.listen(port, () => {
    LOGGER.info('Server is running at http://localhost:%s', port);
});
