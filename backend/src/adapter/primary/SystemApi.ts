import { Express, Request, Response } from 'express';
import { loggerFactory } from '../../ccc/Logger';
export class SystemApi {
    private static readonly LOGGER = loggerFactory(SystemApi);
    public constructor(server: Express, urlPrefix: string) {
        server.get(urlPrefix + '/system', (req: Request, res: Response) => this.readAll(req, res));
        SystemApi.LOGGER.info('serving system api at %s/system', urlPrefix);
    }

    private readAll(req: Request, res: Response) {
        res.send('Express + TypeScript Server');
    }
}
