import { Express, Request, Response } from 'express';
export class SystemApi {
    public constructor(server: Express) {
        server.get('/', (req: Request, res: Response) => this.readAll(req, res));
    }

    private readAll(req: Request, res: Response) {
        res.send('Express + TypeScript Server');
    }
}
