import express, { Express } from 'express';
import { loggerFactory } from './ccc/Logger';
import { SimulationService } from './application/simulation/SimulationService';
import { devSetup } from './ccc/dev_setup';
import { SystemsApi } from './primary/adapter/SystemsApi';
import path from 'path';
import { Frontend } from './primary/adapter/Frontend';
import { InMemoryBattleRepository } from './secondary/adapter/InMemoryBattleRepository';
import { InMemoryFleetRepository } from './secondary/adapter/InMemoryFleetRepository';
import { InMemorySystemRepository } from './secondary/adapter/InMemorySystemRepository';
import { BattleRepository } from './secondary/port/BattleRepository';
import { FleetRepository } from './secondary/port/FleetRepository';
import { SystemRepository } from './secondary/port/SystemRepository';
import { SystemService } from './application/SystemService';
import { FleetService } from './application/FleetService';
import { BattleService } from './application/BattleService';

const LOGGER = loggerFactory('INDEX');

// seondary
const battleRepository: BattleRepository = new InMemoryBattleRepository();
const fleetRepository: FleetRepository = new InMemoryFleetRepository();
const systemRepository: SystemRepository = new InMemorySystemRepository();

// application
const systemService: SystemService = new SystemService(systemRepository);
const fleetService: FleetService = new FleetService(fleetRepository);
const battleService: BattleService = new BattleService(battleRepository);

const simulation: SimulationService = new SimulationService();
simulation.addPart(systemService);
simulation.addPart(fleetService);
simulation.addPart(battleService);
simulation.start();

// primary
const server: Express = express();
const port: number = parseInt(process.env['PORT'] || '3001');
const frontendUrlPrefix = process.env['FRONTEND_PREFIX'] || '/frontend';
const backendUrlPrefix = process.env['BACKEND_PREFIX'] || '/backend';
const frontendPath: string = process.env['FRONTEND_PATH'] || path.resolve(__dirname, '../../frontend/build/');
server.use(express.static(path.resolve(__dirname, '../client/build')));
new SystemsApi(server, backendUrlPrefix, systemService);
new Frontend(server, frontendUrlPrefix, frontendPath);
server.listen(port, () => {
    LOGGER.info('Server is running at http://localhost:%s', port);
});

// dev setup
devSetup(systemRepository, fleetRepository, battleRepository);
