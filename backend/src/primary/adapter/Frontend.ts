import express, { Express } from 'express';
import path from 'path';
import { loggerFactory } from '../../ccc/Logger';
export class Frontend {
    private static readonly LOGGER = loggerFactory(Frontend);
    public constructor(server: Express, urlPrefix: string, sourcePath: string) {
        server.use(urlPrefix, express.static(path.join(sourcePath)));
        server.get(urlPrefix + '/*', function (req, res) {
            res.sendFile(path.join(sourcePath, 'index.html'));
        });
        Frontend.LOGGER.info('serving frontend from %s at %s', sourcePath, urlPrefix);
    }
}
