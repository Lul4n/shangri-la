import { Express, Request, Response } from 'express';
import { loggerFactory } from '../../ccc/Logger';
import { SystemPort } from '../port/SystemPort';
import { SystemBuilder } from '../../../gen-src/openapi';
export class SystemsApi {
    private static readonly LOGGER = loggerFactory(SystemsApi);
    private port: SystemPort;
    public constructor(server: Express, urlPrefix: string, port: SystemPort) {
        this.port = port;
        server.get(urlPrefix + '/systems', (req: Request, res: Response) => this.all(req, res));
        SystemsApi.LOGGER.info('serving system api at %s/systems', urlPrefix);
    }

    private all(req: Request, res: Response) {
        res.send(
            this.port.all().map((system) => {
                return new SystemBuilder().id(system.uuid).label(system.label).build();
            })
        );
    }
}
