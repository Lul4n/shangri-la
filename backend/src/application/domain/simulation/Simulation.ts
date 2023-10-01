import { ScheduledTask, schedule } from 'node-cron';
import { Simulatable } from './Simulatable';
import { Ticks } from './Ticks';
import assert = require('assert');
import { loggerFactory } from '../../../ccc/Logger';
import { ToStringHelper } from '../../../ccc/ToStringHelper';

export class Simulation implements Simulatable {
    private static readonly LOGGER = loggerFactory(Simulation);
    private readonly _parts: Simulatable[] = [];
    private _currentTick: Ticks = 0;
    private _scheduledTask: ScheduledTask | null = null;

    public get currentTick() {
        return this._currentTick;
    }

    public addPart(part: Simulatable): boolean {
        if (!this._parts.includes(part)) {
            this._parts.push(part);
            Simulation.LOGGER.trace('Added %s to %s', part, this);
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
        Simulation.LOGGER.info('started %s', this);
    }
    public stop() {
        this._scheduledTask?.stop();
        this._scheduledTask = null;
        Simulation.LOGGER.info('stopped %s', this);
    }

    public update() {
        const start = performance.now();
        this._currentTick++;
        this._parts.forEach((s) => s.update(1));
        const end = performance.now();
        Simulation.LOGGER.trace('%s: calculated tick %s in %sms', this, this._currentTick, end - start);
    }

    protected toStringHelper(): ToStringHelper {
        return ToStringHelper.toStringHelper(this).add('currentTick', this._currentTick).add('parts', this._parts.length);
    }
    public toString(): string {
        return this.toStringHelper().toString();
    }
}
