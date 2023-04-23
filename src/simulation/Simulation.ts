import { ScheduledTask, schedule } from 'node-cron';
import { Simulatable } from './Simulatable';
import { Ticks } from './Ticks';
import assert = require('assert');
import { loggerFactory } from '../Logger';

const LOGGER = loggerFactory('Simulation');

export class Simulation implements Simulatable {
    private readonly _parts: Simulatable[] = [];
    private _currentTick: Ticks = 0;
    private _scheduledTask: ScheduledTask | null = null;

    public get currentTick() {
        return this._currentTick;
    }

    public addPart(part: Simulatable): boolean {
        if (!this._parts.includes(part)) {
            this._parts.push(part);
            LOGGER.trace('Added %s to %s', part, this);
            return true;
        } else {
            return false;
        }
    }

    public start() {
        assert(this._scheduledTask == null);
        this._scheduledTask = schedule('* * * * * *', () => this.update(), {
            scheduled: true,
            recoverMissedExecutions: false,
            runOnInit: false,
            timezone: 'Europe/Berlin',
        });
        LOGGER.info('started %s', this);
    }
    public stop() {
        this._scheduledTask?.stop();
        this._scheduledTask = null;
        LOGGER.info('stopped %s', this);
    }

    public update() {
        const start = performance.now();
        this._currentTick++;
        this._parts.forEach((s) => s.update(1));
        const end = performance.now();
        LOGGER.trace('%s: calculated tick %s in %sms', this, this._currentTick, end - start);
    }

    public toString(): string {
        return `Simulation{currentTick:${this._currentTick},parts:${this._parts.length}}`;
    }
}
