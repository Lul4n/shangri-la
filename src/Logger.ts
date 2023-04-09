import * as pino from 'pino';
/* eslint-disable */
const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            level: 'trace',
            options: {
                destination: `${__dirname}/app.log`,
                append: false,
                mkdir: true,
            },
        },
        {
            target: 'pino-pretty',
            level: 'info',
            options: {
                levelFirst: true,
            },
        },
    ],
});

const loggersByName: Record<string, pino.Logger<pino.LoggerOptions>> = {};
const systemLogger = pino.pino(
    {
        level: 'trace',
        name: 'SYSTEM',
    },
    transport
);
export function loggerFactory(name: string): pino.Logger<pino.LoggerOptions> {
    if (!loggersByName[name]) {
        loggersByName[name] = pino.pino(
            {
                level: 'trace',
                name: name,
            },
            transport
        );
        systemLogger.info('created logger: %s', name);
    }
    return loggersByName[name]!;
}
