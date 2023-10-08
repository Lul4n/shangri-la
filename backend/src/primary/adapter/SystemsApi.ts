import { Express, Request, Response } from 'express';
import { loggerFactory } from '../../ccc/Logger';
import { SystemPort } from '../port/SystemPort';
import { PlanetBuilder, System, SystemBuilder, SystemDetails, SystemDetailsBuilder } from '../../../gen-src/openapi';
import { UUID } from '../../ccc/UUID';
import { parseUUID } from '../../ccc/Utils';
import { ErrorResponseException } from '../../ccc/ErrorResponseException';
export class SystemsApi {
    private static readonly LOGGER = loggerFactory(SystemsApi);
    private port: SystemPort;
    public constructor(server: Express, urlPrefix: string, port: SystemPort) {
        this.port = port;
        server.get(urlPrefix + '/systems', (req: Request, res: Response) => {
            res.send(this.all());
        });
        server.get(urlPrefix + '/systems/:systemId', (req: Request, res: Response) => {
            const systemId: string = req.params['systemId'];
            const uuid: UUID | null = parseUUID(systemId);
            if (uuid === null) {
                throw ErrorResponseException.builder().status(400).code('INVALID_SYSTEM_ID').build();
            }
            const system: System | null = this.find(uuid);
            if (system) {
                res.send(system);
            } else {
                throw ErrorResponseException.builder().status(404).code('SYSTEM_NOT_FOUND').message('System not found').build();
            }
        });
        SystemsApi.LOGGER.info('serving system api at %s/systems', urlPrefix);
    }

    private all(): System[] {
        return this.port.all().map((system) => new SystemBuilder().id(system.uuid).label(system.label).build());
    }
    private find(systemId: UUID): SystemDetails | null {
        const system = this.port.find(systemId);
        if (system === null) {
            return null;
        } else {
            return new SystemDetailsBuilder()
                .id(system.uuid)
                .label(system.label)
                .planets(system.planets.map((p) => new PlanetBuilder().id(p.uuid).label(p.label).build()))
                .build();
        }
    }
}
