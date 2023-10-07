import { Express, Request, Response } from 'express';
import { loggerFactory } from '../../ccc/Logger';
import {SystemPort} from "../port/SystemPort";
export class SystemsApi {
    private static readonly LOGGER = loggerFactory(SystemsApi);
    private port : SystemPort;
    public constructor(server: Express, urlPrefix: string, port : SystemPort) {
        this.port = port;
        server.get(urlPrefix + '/systems', (req: Request, res: Response) => this.readAll(req, res));
        SystemsApi.LOGGER.info('serving system api at %s/system', urlPrefix);
    }

    private readAll(req: Request, res: Response) {
        res.send(this.port.all().map((system) => {
            return {"uuid":system.uuid}
        }));
    }
}
