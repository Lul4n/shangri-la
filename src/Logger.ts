import * as pino from "pino";
/* eslint-disable */
const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            level: "trace",
            options: { destination: `${__dirname}/app.log` }
        },
        {
            target: 'pino-pretty',
            level: "info",
            options: {}
        }
    ]
});
export const LOGGER = pino.pino({
    level: 'trace',
}, transport);